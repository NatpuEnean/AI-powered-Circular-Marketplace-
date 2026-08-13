package com.example.backend.service;

import com.example.backend.dto.AuthRequest;
import com.example.backend.dto.AuthResponse;
import com.example.backend.dto.RegisterRequest;
import com.example.backend.dto.UserDto;
import com.example.backend.model.Role;
import com.example.backend.model.User;
import com.example.backend.model.VerificationToken;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.VerificationTokenRepository;
import com.example.backend.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final VerificationService verificationService;
    private final EmailService emailService;
    private final VerificationTokenRepository verificationTokenRepository;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            return AuthResponse.builder()
                    .success(false)
                    .message("User already exists with this email")
                    .build();
        }

        try {
            // Validate role
            Role role;
            try {
                role = Role.valueOf(request.getRole().toUpperCase());
            } catch (IllegalArgumentException e) {
                return AuthResponse.builder()
                        .success(false)
                        .message("Invalid role. Please choose USER, SELLER, or NGO")
                        .build();
            }

            // Create new user
            User user = User.builder()
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .fullName(request.getFullName())
                    .phoneNumber(request.getPhoneNumber())
                    .role(role)
                    .isActive(true)
                    .emailVerified(false)
                    .build();

            // Set role-specific fields
            if (role == Role.SELLER) {
                user.setSellerShopName(request.getSellerShopName());
                user.setSellerCategory(request.getSellerCategory());
            } else if (role == Role.NGO) {
                user.setNgoName(request.getNgoName());
                user.setNgoRegistrationNumber(request.getNgoRegistrationNumber());
            }

            // Save user to database
            User savedUser = userRepository.save(user);

            // Generate and send verification email
            verificationService.generateAndSendVerificationEmail(savedUser);

            return AuthResponse.builder()
                    .success(false)
                    .message("Registration successful. Please verify your email to complete signup.")
                    .user(mapUserToDto(savedUser))
                    .build();

        } catch (Exception e) {
            return AuthResponse.builder()
                    .success(false)
                    .message("Registration failed: " + e.getMessage())
                    .build();
        }
    }

    @Transactional
    public AuthResponse login(AuthRequest request) {
        try {
            // Find user by email
            User user = userRepository.findByEmail(request.getEmail())
                    .orElse(null);

            if (user == null) {
                return AuthResponse.builder()
                        .success(false)
                        .message("Invalid email or password")
                        .build();
            }

            // Check if user is active
            if (!user.isActive()) {
                return AuthResponse.builder()
                        .success(false)
                        .message("User account is inactive")
                        .build();
            }

            // Check if email is verified
            if (!user.isEmailVerified()) {
                return AuthResponse.builder()
                        .success(false)
                        .message("Email not verified. Please check your email for verification link.")
                        .build();
            }

            // Verify password
            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                return AuthResponse.builder()
                        .success(false)
                        .message("Invalid email or password")
                        .build();
            }

            // Generate tokens
            String token = jwtTokenProvider.generateToken(user.getEmail(), user.getRole().getAuthority());
            String refreshToken = jwtTokenProvider.generateRefreshToken(user.getEmail());

            return AuthResponse.builder()
                    .success(true)
                    .message("Login successful")
                    .token(token)
                    .refreshToken(refreshToken)
                    .user(mapUserToDto(user))
                    .build();

        } catch (Exception e) {
            return AuthResponse.builder()
                    .success(false)
                    .message("Login failed: " + e.getMessage())
                    .build();
        }
    }

    @Transactional
    public AuthResponse verifyEmail(String token) {
        try {
            VerificationToken verificationToken = verificationService.verifyEmail(token);
            
            User user = verificationToken.getUser();
            user.setEmailVerified(true);
            userRepository.save(user);

            // Mark token as used
            verificationToken.setUsed(true);
            verificationTokenRepository.save(verificationToken);

            // Send welcome email
            emailService.sendWelcomeEmail(user.getEmail(), user.getFullName());

            // Generate tokens for auto-login
            String jwtToken = jwtTokenProvider.generateToken(user.getEmail(), user.getRole().getAuthority());
            String refreshToken = jwtTokenProvider.generateRefreshToken(user.getEmail());

            return AuthResponse.builder()
                    .success(true)
                    .message("Signup completed! Email verified successfully. You are now logged in.")
                    .token(jwtToken)
                    .refreshToken(refreshToken)
                    .user(mapUserToDto(user))
                    .build();
        } catch (Exception e) {
            return AuthResponse.builder()
                    .success(false)
                    .message(e.getMessage())
                    .build();
        }
    }

    @Transactional
    public AuthResponse resendVerificationEmail(String email) {
        try {
            User user = userRepository.findByEmail(email)
                    .orElse(null);

            if (user == null) {
                return AuthResponse.builder()
                        .success(false)
                        .message("User not found")
                        .build();
            }

            if (user.isEmailVerified()) {
                return AuthResponse.builder()
                        .success(false)
                        .message("Email is already verified")
                        .build();
            }

            verificationService.generateAndSendVerificationEmail(user);

            return AuthResponse.builder()
                    .success(true)
                    .message("Verification email sent. Please check your email.")
                    .build();
        } catch (Exception e) {
            return AuthResponse.builder()
                    .success(false)
                    .message("Failed to resend verification email: " + e.getMessage())
                    .build();
        }
    }

    private UserDto mapUserToDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phoneNumber(user.getPhoneNumber())
                .role(user.getRole().name())
                .sellerShopName(user.getSellerShopName())
                .sellerCategory(user.getSellerCategory())
                .ngoName(user.getNgoName())
                .ngoRegistrationNumber(user.getNgoRegistrationNumber())
                .build();
    }
}
