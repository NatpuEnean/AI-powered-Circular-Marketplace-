package com.example.backend.marketplace.service;

import com.example.backend.auth.model.User;
import com.example.backend.auth.repository.UserRepository;
import com.example.backend.marketplace.model.Product;
import com.example.backend.marketplace.model.Shop;
import com.example.backend.marketplace.repository.ProductRepository;
import com.example.backend.marketplace.repository.ShopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class MarketplaceService {

    private final ProductRepository productRepository;
    private final ShopRepository shopRepository;
    private final UserRepository userRepository;

    // ─── Shop Methods ──────────────────────────────────────────────────────────

    public List<Map<String, Object>> getNearbyShops(double lat, double lng, double radiusKm) {
        List<Shop> shops = shopRepository.findNearby(lat, lng, radiusKm);
        List<Map<String, Object>> result = new ArrayList<>();
        for (Shop s : shops) {
            Map<String, Object> m = new HashMap<>();
            m.put("id", s.getId());
            m.put("name", s.getName());
            m.put("sellerEmail", s.getSellerEmail());
            m.put("latitude", s.getLatitude());
            m.put("longitude", s.getLongitude());
            m.put("address", s.getAddress());
            m.put("category", s.getCategory());
            m.put("distanceKm", haversine(lat, lng, s.getLatitude(), s.getLongitude()));
            result.add(m);
        }
        result.sort(Comparator.comparingDouble(m -> (Double) m.get("distanceKm")));
        return result;
    }

    public Shop createOrUpdateShop(String sellerEmail, String name, double lat,
                                    double lng, String address, String category) {
        Shop shop = shopRepository.findBySellerEmail(sellerEmail).orElse(new Shop());
        shop.setSellerEmail(sellerEmail);
        shop.setName(name);
        shop.setLatitude(lat);
        shop.setLongitude(lng);
        shop.setAddress(address);
        shop.setCategory(category);
        return shopRepository.save(shop);
    }

    // ─── Product Methods ───────────────────────────────────────────────────────

    public List<Map<String, Object>> getNearbyProducts(double lat, double lng, double radiusKm) {
        List<Product> products = productRepository.findNearby(lat, lng, radiusKm);
        return products.stream().map(p -> productToMap(p, lat, lng)).toList();
    }

    public List<Map<String, Object>> getSellerProducts(String sellerEmail) {
        return productRepository.findBySellerEmail(sellerEmail)
                .stream().map(p -> productToMap(p, 0, 0)).toList();
    }

    public Map<String, Object> addProduct(String sellerEmail, String name, String category,
                                           String shopName, String address,
                                           double latitude, double longitude,
                                           String imageBase64, double price, double originalPrice,
                                           String description, Integer quantity, String condition) {

        // Auto-create or update shop for seller
        Shop shop = createOrUpdateShop(sellerEmail, shopName, latitude, longitude, address, category);

        Product product = Product.builder()
                .sellerEmail(sellerEmail)
                .name(name)
                .category(category)
                .shopName(shopName)
                .address(address)
                .latitude(latitude)
                .longitude(longitude)
                .imageBase64(imageBase64)
                .price(price)
                .originalPrice(originalPrice)
                .description(description)
                .quantity(quantity != null ? quantity : 1)
                .condition(condition)
                .shop(shop)
                .status("available")
                .build();

        Product saved = productRepository.save(product);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("product", productToMap(saved, 0, 0));
        return response;
    }

    public boolean deleteProduct(Long productId, String sellerEmail) {
        Optional<Product> opt = productRepository.findById(productId);
        if (opt.isEmpty()) return false;
        Product p = opt.get();
        if (!p.getSellerEmail().equals(sellerEmail)) return false;
        productRepository.delete(p);
        return true;
    }

    // ─── AI Search ────────────────────────────────────────────────────────────

    /**
     * Smart category-matching AI search using uploaded image.
     * Detects category from image filename/MIME type, then returns nearby products
     * in that category sorted by relevance.
     */
    public List<Map<String, Object>> aiSearch(MultipartFile image, double lat, double lng,
                                               double radiusKm) throws IOException {
        String guessedCategory = guessCategoryFromImage(image);

        List<Product> candidates;
        if (guessedCategory != null) {
            candidates = productRepository.findNearbyByCategory(lat, lng, radiusKm, guessedCategory);
            if (candidates.isEmpty()) {
                candidates = productRepository.findNearby(lat, lng, radiusKm);
            }
        } else {
            candidates = productRepository.findNearby(lat, lng, radiusKm);
        }

        return candidates.stream()
                .map(p -> {
                    Map<String, Object> m = productToMap(p, lat, lng);
                    m.put("aiMatch", guessedCategory != null && guessedCategory.equals(p.getCategory()));
                    return m;
                })
                .sorted((a, b) -> Boolean.compare(!(Boolean) b.get("aiMatch"), !(Boolean) a.get("aiMatch")))
                .toList();
    }

    /**
     * Guess product category from image metadata (filename keywords).
     * In a real implementation, this would call Google Vision or a local ML model.
     */
    private String guessCategoryFromImage(MultipartFile image) {
        String filename = Optional.ofNullable(image.getOriginalFilename())
                .orElse("").toLowerCase();

        Map<String, List<String>> categoryKeywords = Map.of(
            "electronics", List.of("phone", "laptop", "computer", "tablet", "camera", "tv", "electronic"),
            "clothing", List.of("shirt", "dress", "clothes", "fashion", "jacket", "jeans", "top"),
            "furniture", List.of("chair", "table", "sofa", "desk", "bed", "shelf", "furniture"),
            "books", List.of("book", "novel", "textbook", "read"),
            "food", List.of("food", "snack", "fruit", "vegetable", "organic"),
            "toys", List.of("toy", "game", "play", "kids", "child"),
            "sports", List.of("sport", "gym", "fitness", "bike", "cycle", "ball")
        );

        for (Map.Entry<String, List<String>> entry : categoryKeywords.entrySet()) {
            for (String kw : entry.getValue()) {
                if (filename.contains(kw)) return entry.getKey();
            }
        }

        // Return random category for demo when no match
        List<String> cats = List.of("electronics", "clothing", "furniture", "books", "food", "toys");
        return cats.get(new Random().nextInt(cats.size()));
    }

    // ─── Utilities ────────────────────────────────────────────────────────────

    private Map<String, Object> productToMap(Product p, double userLat, double userLng) {
        Map<String, Object> m = new HashMap<>();
        m.put("id", p.getId());
        m.put("name", p.getName());
        m.put("category", p.getCategory());
        m.put("price", p.getPrice());
        m.put("originalPrice", p.getOriginalPrice());
        m.put("imageBase64", p.getImageBase64());
        m.put("imageUrl", p.getImageUrl());
        m.put("description", p.getDescription());
        m.put("status", p.getStatus());
        m.put("sellerEmail", p.getSellerEmail());
        m.put("shopName", p.getShopName());
        m.put("address", p.getAddress());
        m.put("latitude", p.getLatitude());
        m.put("longitude", p.getLongitude());
        m.put("quantity", p.getQuantity());
        m.put("condition", p.getCondition());
        m.put("createdAt", p.getCreatedAt());
        if (userLat != 0 || userLng != 0) {
            m.put("distanceKm", Math.round(haversine(userLat, userLng,
                    p.getLatitude(), p.getLongitude()) * 10.0) / 10.0);
        }
        return m;
    }

    private double haversine(double lat1, double lng1, double lat2, double lng2) {
        double R = 6371;
        double dLat = Math.toRadians(lat2 - lat1);
        double dLng = Math.toRadians(lng2 - lng1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                 + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                 * Math.sin(dLng / 2) * Math.sin(dLng / 2);
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }
}
