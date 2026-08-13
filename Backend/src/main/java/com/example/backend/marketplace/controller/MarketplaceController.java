package com.example.backend.marketplace.controller;

import com.example.backend.marketplace.service.MarketplaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RequiredArgsConstructor
public class MarketplaceController {

    private final MarketplaceService marketplaceService;

    // ─── Public ────────────────────────────────────────────────────────────────

    @GetMapping("/shops/nearby")
    public ResponseEntity<List<Map<String, Object>>> getNearbyShops(
            @RequestParam double latitude,
            @RequestParam double longitude,
            @RequestParam(defaultValue = "10") double radiusKm) {
        return ResponseEntity.ok(marketplaceService.getNearbyShops(latitude, longitude, radiusKm));
    }

    @GetMapping("/products/nearby")
    public ResponseEntity<List<Map<String, Object>>> getNearbyProducts(
            @RequestParam double latitude,
            @RequestParam double longitude,
            @RequestParam(defaultValue = "10") double radiusKm) {
        return ResponseEntity.ok(marketplaceService.getNearbyProducts(latitude, longitude, radiusKm));
    }

    @PostMapping("/products/ai-search")
    public ResponseEntity<List<Map<String, Object>>> aiSearch(
            @RequestParam("image") MultipartFile image,
            @RequestParam(defaultValue = "0") double latitude,
            @RequestParam(defaultValue = "0") double longitude,
            @RequestParam(defaultValue = "20") double radiusKm) throws IOException {
        return ResponseEntity.ok(marketplaceService.aiSearch(image, latitude, longitude, radiusKm));
    }

    // ─── Seller – Protected ────────────────────────────────────────────────────

    @GetMapping("/products/my")
    public ResponseEntity<List<Map<String, Object>>> getMyProducts(Authentication auth) {
        String email = (String) auth.getPrincipal();
        return ResponseEntity.ok(marketplaceService.getSellerProducts(email));
    }

    @PostMapping("/products")
    public ResponseEntity<Map<String, Object>> addProduct(
            @RequestBody Map<String, Object> payload,
            Authentication auth) {
        String sellerEmail = (String) auth.getPrincipal();

        String name     = String.valueOf(payload.get("name"));
        String category = String.valueOf(payload.get("category"));
        String shopName = String.valueOf(payload.getOrDefault("shopName", "My Shop"));
        String address  = String.valueOf(payload.getOrDefault("address", ""));
        String imageB64 = String.valueOf(payload.getOrDefault("imageBase64", ""));
        String desc     = String.valueOf(payload.getOrDefault("description", ""));
        String condition = String.valueOf(payload.getOrDefault("condition", "good"));

        double lat  = Double.parseDouble(String.valueOf(payload.getOrDefault("latitude", 0.0)));
        double lng  = Double.parseDouble(String.valueOf(payload.getOrDefault("longitude", 0.0)));
        double price = Double.parseDouble(String.valueOf(payload.getOrDefault("price", 0.0)));
        double originalPrice = Double.parseDouble(String.valueOf(payload.getOrDefault("originalPrice", price)));
        int quantity = Integer.parseInt(String.valueOf(payload.getOrDefault("quantity", 1)));

        return ResponseEntity.ok(marketplaceService.addProduct(
                sellerEmail, name, category, shopName, address,
                lat, lng, imageB64, price, originalPrice, desc, quantity, condition));
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Map<String, Object>> deleteProduct(
            @PathVariable Long id,
            Authentication auth) {
        String email = (String) auth.getPrincipal();
        boolean deleted = marketplaceService.deleteProduct(id, email);
        if (deleted) {
            return ResponseEntity.ok(Map.of("success", true));
        } else {
            return ResponseEntity.status(403).body(Map.of("error", "Not authorized or product not found"));
        }
    }
}
