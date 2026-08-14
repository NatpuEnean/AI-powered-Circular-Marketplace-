package com.example.backend.marketplace.model;
import jakarta.persistence.Column;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private Double price;

    private Double originalPrice;

    @Column(columnDefinition = "LONGTEXT")
    private String imageBase64;

    private String imageUrl;

    @Column(length = 2000)
    private String description;

    @Column(nullable = false)
    @Builder.Default
    private String status = "available";

    @Column(nullable = false)
    private String sellerEmail;

    @Column(nullable = false)
    private String shopName;

    @Column(length = 500)
    private String address;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @Builder.Default
    private Integer quantity = 1;

    // Optional condition field: new, like-new, good, fair
    @Column(name = "product_condition")
    private String condition;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id")
    private Shop shop;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
