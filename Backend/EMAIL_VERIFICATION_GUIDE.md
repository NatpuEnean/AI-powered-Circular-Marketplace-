# Email Verification Setup Guide

## Overview
Email verification has been integrated into the authentication system. Users must verify their email before they can log in to the application.

## What Was Added

### 1. **Backend Dependencies**
- Spring Boot Mail Starter for email functionality

### 2. **Database Changes**
- Added `email_verified` field to `users` table (default: false)
- Created `verification_tokens` table to store verification tokens
- Tokens expire after 24 hours

### 3. **New Entities & Repositories**
- `VerificationToken` JPA entity
- `VerificationTokenRepository` for database operations

### 4. **New Services**
- **EmailService**: Sends verification, resend, and welcome emails
- **VerificationService**: Manages token generation and validation

### 5. **Updated AuthService**
- Registration now sets `emailVerified = false`
- Sends verification email automatically after registration
- Login checks if email is verified before allowing access
- New methods: `verifyEmail()`, `resendVerificationEmail()`

### 6. **New API Endpoints**

#### Verify Email
```
POST /api/auth/verify-email?token=<verification-token>
Response: AuthResponse
{
  "success": true,
  "message": "Email verified successfully. You can now log in."
}
```

#### Resend Verification Email
```
POST /api/auth/resend-verification?email=<user-email>
Response: AuthResponse
{
  "success": true,
  "message": "Verification email sent. Please check your email."
}
```

## Email Configuration

### Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account Security: https://myaccount.google.com/security
   - Navigate to "App passwords"
   - Select "Mail" and "Windows Computer"
   - Google will generate a 16-character password

3. **Update `application.properties`**:
```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.starttls.required=true
spring.mail.from=noreply@circularmarketplace.com
```

### Other Email Providers

#### Outlook/Office365
```properties
spring.mail.host=smtp.office365.com
spring.mail.port=587
spring.mail.username=your-email@outlook.com
spring.mail.password=your-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

#### SendGrid
```properties
spring.mail.host=smtp.sendgrid.net
spring.mail.port=587
spring.mail.username=apikey
spring.mail.password=your-sendgrid-api-key
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

## Email Verification Flow

1. **User Registration**:
   - User submits registration form
   - User account created with `emailVerified = false`
   - Verification token generated and saved to database
   - Verification email sent with token

2. **Email Verification**:
   - User receives email with verification link
   - Link contains token: `http://localhost:5173/verify-email?token=<token>`
   - User clicks link → Frontend sends POST to `/api/auth/verify-email?token=<token>`
   - Token validated:
     - Token exists and not used
     - Token not expired (24 hours)
   - User marked as verified
   - Welcome email sent
   - User can now login

3. **Resend Verification**:
   - If user loses verification email
   - Frontend sends POST to `/api/auth/resend-verification?email=<email>`
   - New token generated, old one invalidated
   - New verification email sent

## Frontend Integration

### Environment Variables
Update your `.env` file:
```
VITE_API_URL=http://localhost:8080
```

### Components Needed

1. **Verify Email Page**: `/verify-email`
   - Extract token from URL query parameter
   - Send POST request to verify endpoint
   - Show success/error message
   - Redirect to login after verification

2. **Resend Email Component**:
   - Email input field
   - Send button
   - Integration with resend endpoint

### Example React Code

**Verify Email Page**:
```jsx
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      return;
    }

    authService.verifyEmail(token)
      .then(() => {
        setStatus('success');
        setTimeout(() => navigate('/login'), 3000);
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <div>
      {status === 'verifying' && <p>Verifying your email...</p>}
      {status === 'success' && <p>Email verified! Redirecting to login...</p>}
      {status === 'error' && <p>Verification failed. Please try again.</p>}
    </div>
  );
}
```

**Auth Service Update**:
```javascript
export const authService = {
  // ... existing methods
  
  verifyEmail: async (token) => {
    const response = await fetch(`${API_URL}/api/auth/verify-email?token=${token}`, {
      method: 'POST',
    });
    return response.json();
  },

  resendVerification: async (email) => {
    const response = await fetch(`${API_URL}/api/auth/resend-verification?email=${email}`, {
      method: 'POST',
    });
    return response.json();
  }
};
```

## Testing Email Verification

### Using Mailtrap (Recommended for Development)
1. Sign up at https://mailtrap.io
2. Create an inbox
3. Use SMTP credentials in `application.properties`:
   ```properties
   spring.mail.host=send.mailtrap.io
   spring.mail.port=2525
   spring.mail.username=<mailtrap-username>
   spring.mail.password=<mailtrap-password>
   ```

### Manual Testing
1. Start backend: `mvn spring-boot:run`
2. Register a test user via API
3. Check console logs for verification link
4. Use the token in `/api/auth/verify-email?token=<token>` endpoint
5. Try login after verification

## Database Updates Required

If you have existing users in the database:
```sql
-- Add email_verified column if not present
ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT false;

-- Verify existing users
UPDATE users SET email_verified = true WHERE id > 0;

-- Create verification_tokens table
CREATE TABLE verification_tokens (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    token VARCHAR(255) NOT NULL UNIQUE,
    user_id BIGINT NOT NULL,
    expiry_date TIMESTAMP NOT NULL,
    is_used BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_token (token),
    INDEX idx_user_id (user_id)
);
```

## Security Considerations

1. **Token Security**:
   - Tokens are randomly generated UUIDs
   - Tokens stored in database and tied to users
   - Tokens automatically expire after 24 hours
   - Used tokens cannot be reused

2. **Email Validation**:
   - Email is unique in database
   - Users must have valid email to register
   - Email verification prevents account takeover

3. **Rate Limiting** (Future Enhancement):
   - Consider adding rate limiting to resend endpoint
   - Prevent email bombing attacks

## Troubleshooting

### Emails Not Sending
1. Check `application.properties` email configuration
2. Verify credentials are correct
3. Check firewall/network allows outgoing SMTP
4. Look at console logs for errors
5. For Gmail: ensure app password is correct (not regular password)

### Token Expired
- Token validity: 24 hours
- Users can request resend verification

### User Can't Login After Verification
- Verify `emailVerified` flag is true in database
- Check user `isActive` flag is true
- Review login endpoint logs

## Future Enhancements

1. Add email verification reminder emails
2. Implement rate limiting on resend endpoint
3. Add admin panel to manually verify emails
4. Support for custom email templates (HTML)
5. Integration with email verification providers (e.g., AWS SES)
