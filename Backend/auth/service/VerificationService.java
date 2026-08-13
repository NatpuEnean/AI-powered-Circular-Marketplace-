package com.example.backend.service;

import com.example.backend.model.VerificationToken;
import com.example.backend.model.User;
import com.example.backend.repository.VerificationTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class VerificationService {

    private final VerificationTokenRepository verificationTokenRepository;
    private final EmailService emailService;

    @Transactional
    public String generateAndSendVerificationEmail(User user) {
        try {
            // Delete any existing unused tokens
            verificationTokenRepository.deleteByUser(user);

            // Generate new token
            String token = UUID.randomUUID().toString();
            
            VerificationToken verificationToken = VerificationToken.builder()
                    .token(token)
                    .user(user)
                    .isUsed(false)
                    .build();

            verificationTokenRepository.save(verificationToken);

            // Send verification email
            emailService.sendVerificationEmail(user.getEmail(), user.getFullName(), token);
            
            log.info("Verification email sent for user: {}", user.getEmail());
            return token;
        } catch (Exception e) {
            log.error("Failed to generate and send verification email for user: {}", user.getEmail(), e);
            throw new RuntimeException("Failed to send verification email: " + e.getMessage());
        }
    }

    @Transactional
    public VerificationToken verifyEmail(String token) {
        VerificationToken verificationToken = verificationTokenRepository.findByToken(token)
                .orElse(null);

        if (verificationToken == null) {
            throw new RuntimeException("Invalid verification token");
        }

        if (verificationToken.isUsed()) {
            throw new RuntimeException("This token has already been used");
        }

        if (verificationToken.isExpired()) {
            throw new RuntimeException("This verification token has expired");
        }

        return verificationToken;
    }

    @Transactional
    public String resendVerificationEmail(String email) {
        try {
            VerificationToken token = verificationTokenRepository.findByToken(email)
                    .orElse(null);

            if (token == null) {
                throw new RuntimeException("User not found");
            }

            User user = token.getUser();

            if (user.isEmailVerified()) {
                throw new RuntimeException("Email is already verified");
            }

            return generateAndSendVerificationEmail(user);
        } catch (Exception e) {
            log.error("Failed to resend verification email for: {}", email, e);
            throw new RuntimeException("Failed to resend verification email: " + e.getMessage());
        }
    }
}
