package com.example.backend.marketplace.repository;

import com.example.backend.marketplace.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findBySellerEmail(String sellerEmail);

    List<Product> findByCategory(String category);

    List<Product> findByStatus(String status);

    @Query("SELECT p FROM Product p WHERE p.status = 'available' AND " +
           "(6371 * acos(cos(radians(:lat)) * cos(radians(p.latitude)) * " +
           "cos(radians(p.longitude) - radians(:lng)) + " +
           "sin(radians(:lat)) * sin(radians(p.latitude)))) <= :radius")
    List<Product> findNearby(@Param("lat") double lat,
                              @Param("lng") double lng,
                              @Param("radius") double radiusKm);

    @Query("SELECT p FROM Product p WHERE p.status = 'available' AND p.category = :category AND " +
           "(6371 * acos(cos(radians(:lat)) * cos(radians(p.latitude)) * " +
           "cos(radians(p.longitude) - radians(:lng)) + " +
           "sin(radians(:lat)) * sin(radians(p.latitude)))) <= :radius")
    List<Product> findNearbyByCategory(@Param("lat") double lat,
                                        @Param("lng") double lng,
                                        @Param("radius") double radiusKm,
                                        @Param("category") String category);
}
