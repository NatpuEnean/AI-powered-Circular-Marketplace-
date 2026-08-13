package com.example.backend.marketplace.repository;

import com.example.backend.marketplace.model.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShopRepository extends JpaRepository<Shop, Long> {

    Optional<Shop> findBySellerEmail(String sellerEmail);

    @Query("SELECT s FROM Shop s WHERE " +
           "(6371 * acos(cos(radians(:lat)) * cos(radians(s.latitude)) * " +
           "cos(radians(s.longitude) - radians(:lng)) + " +
           "sin(radians(:lat)) * sin(radians(s.latitude)))) <= :radius")
    List<Shop> findNearby(@Param("lat") double lat,
                           @Param("lng") double lng,
                           @Param("radius") double radiusKm);
}
