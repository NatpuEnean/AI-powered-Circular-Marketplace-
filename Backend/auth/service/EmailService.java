package com.example.backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.from:noreply@circulmarketplace.com}")
    private String fromEmail;

    @Value("${app.frontend.url:http://localhost:5173}")
    private String frontendUrl;

    public void sendVerificationEmail(String toEmail, String userName, String verificationToken) {
        try {
            String verificationLink = frontendUrl + "/verify-email?token=" + verificationToken;
            
            String subject = "Email Verification - Circular Marketplace";
            String body = "Dear " + userName + ",\n\n" +
                    "Thank you for registering with Circular Marketplace!\n\n" +
                    "Please verify your email by clicking the link below:\n" +
                    verificationLink + "\n\n" +
                    "This link will expire in 24 hours.\n\n" +
                    "If you did not register, please ignore this email.\n\n" +
                    "Best regards,\n" +
                    "Circular Marketplace Team";

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject(subject);
            message.setText(body);

            mailSender.send(message);
            log.info("Verification email sent to: {}", toEmail);
        } catch (Exception e) {
            log.error("Failed to send verification email to: {}", toEmail, e);
            throw new RuntimeException("Failed to send verification email: " + e.getMessage());
        }
    }

    public void sendResendVerificationEmail(String toEmail, String userName, String verificationToken) {
        try {
            String verificationLink = frontendUrl + "/verify-email?token=" + verificationToken;
            
            String subject = "Resend: Email Verification - Circular Marketplace";
            String body = "Dear " + userName + ",\n\n" +
                    "Here is your new verification link:\n" +
                    verificationLink + "\n\n" +
                    "This link will expire in 24 hours.\n\n" +
                    "Best regards,\n" +
                    "Circular Marketplace Team";

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject(subject);
            message.setText(body);

            mailSender.send(message);
            log.info("Resend verification email sent to: {}", toEmail);
        } catch (Exception e) {
            log.error("Failed to send resend verification email to: {}", toEmail, e);
            throw new RuntimeException("Failed to send resend verification email: " + e.getMessage());
        }
    }

    public void sendWelcomeEmail(String toEmail, String userName) {
        try {
            String subject = "Welcome to Circular Marketplace!";
            String body = "Dear " + userName + ",\n\n" +
                    "Your email has been verified successfully!\n\n" +
                    "Welcome to Circular Marketplace. You can now log in and start using the platform.\n\n" +
                    "Best regards,\n" +
                    "Circular Marketplace Team";

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject(subject);
            message.setText(body);

            mailSender.send(message);
            log.info("Welcome email sent to: {}", toEmail);
        } catch (Exception e) {
            log.error("Failed to send welcome email to: {}", toEmail, e);
            throw new RuntimeException("Failed to send welcome email: " + e.getMessage());
        }
    }
}
