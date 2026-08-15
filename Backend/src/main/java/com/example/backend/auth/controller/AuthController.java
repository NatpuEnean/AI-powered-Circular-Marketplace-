package com.example.backend.auth.controller;

import com.example.backend.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:5175", "https://energetic-harmony-production-160f.up.railway.app"})
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody Map<String, Object> payload) {
        String name = String.valueOf(payload.get("name"));
        String email = String.valueOf(payload.get("email"));
        String password = String.valueOf(payload.get("password"));
        String role = String.valueOf(payload.getOrDefault("role", "CUSTOMER"));
        String address = String.valueOf(payload.getOrDefault("address", ""));
        String shopName = String.valueOf(payload.getOrDefault("shopName", ""));

        Double latitude = null;
        Double longitude = null;
        if (payload.get("latitude") != null) {
            latitude = Double.parseDouble(String.valueOf(payload.get("latitude")));
        }
        if (payload.get("longitude") != null) {
            longitude = Double.parseDouble(String.valueOf(payload.get("longitude")));
        }

        try {
            Map<String, Object> result = authService.register(name, email, password, role,
                    latitude, longitude, address, shopName);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, Object> payload) {
        String email = String.valueOf(payload.get("email"));
        String password = String.valueOf(payload.get("password"));

        try {
            Map<String, Object> result = authService.login(email, password);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getMe(Authentication authentication) {
        try {
            String email = (String) authentication.getPrincipal();
            return ResponseEntity.ok(authService.getMe(email));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<Map<String, Object>> updateProfile(
            Authentication authentication,
            @RequestBody Map<String, Object> payload) {
        // For future: update user profile
        return ResponseEntity.ok(Map.of("message", "Profile update coming soon"));
    }
}
