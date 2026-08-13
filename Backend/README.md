# Circular Marketplace - Backend Authentication System

This is the backend authentication service for the AI-powered Circular Marketplace supporting three user roles: **User**, **Seller**, and **NGO**.

## Features

✅ Role-based authentication (USER, SELLER, NGO)
✅ JWT token-based security
✅ Single login/signup page with role selection
✅ MySQL database integration
✅ Password encryption with BCrypt
✅ CORS support for frontend integration
✅ Input validation
✅ Global exception handling

## Prerequisites

- Java 17+
- Maven 3.8+
- MySQL 8.0+
- Node.js (for frontend)

## Setup Instructions

### 1. Database Setup

```bash
# Connect to MySQL
mysql -u root -p

# Run the SQL script
source Backend/setup/database.sql
```

### 2. Configure Application Properties

Update `Backend/src/main/resources/application.properties`:

```properties
# Database credentials
spring.datasource.username=root
spring.datasource.password=your_password

# JWT Secret (keep it secure in production)
app.jwt.secret=your-secret-key-min-64-chars-long
```

### 3. Build and Run

```bash
cd Backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## API Endpoints

### 1. Register User

**POST** `/api/auth/register`

Register a new user with their role.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "phoneNumber": "+1234567890",
  "role": "USER",
  
  // For SELLER role
  "sellerShopName": "John's Shop",
  "sellerCategory": "Electronics",
  
  // For NGO role
  "ngoName": "Help Foundation",
  "ngoRegistrationNumber": "NGO123456"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "refreshToken": "eyJhbGciOiJIUzUxMiJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "phoneNumber": "+1234567890",
    "role": "USER",
    "sellerShopName": null,
    "sellerCategory": null,
    "ngoName": null,
    "ngoRegistrationNumber": null
  }
}
```

### 2. Login User

**POST** `/api/auth/login`

Login with email and password. Role is determined from database.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "refreshToken": "eyJhbGciOiJIUzUxMiJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "phoneNumber": "+1234567890",
    "role": "USER",
    "sellerShopName": null,
    "sellerCategory": null,
    "ngoName": null,
    "ngoRegistrationNumber": null
  }
}
```

### 3. Health Check

**GET** `/api/auth/health`

Check if the authentication service is running.

**Response:**

```
Authentication service is running
```

## Project Structure

```
Backend/
├── auth/
│   ├── AuthController.java          # Main auth endpoints
│   ├── model/
│   │   ├── Role.java                # User roles enum
│   │   └── User.java                # User entity model
│   ├── dto/
│   │   ├── RegisterRequest.java     # Registration request DTO
│   │   ├── AuthRequest.java         # Login request DTO
│   │   ├── AuthResponse.java        # Auth response DTO
│   │   └── UserDto.java             # User response DTO
│   ├── service/
│   │   └── AuthService.java         # Business logic
│   ├── repository/
│   │   └── UserRepository.java      # Database queries
│   ├── security/
│   │   └── JwtTokenProvider.java    # JWT token handling
│   ├── config/
│   │   ├── SecurityConfig.java      # Security configuration
│   │   └── WebConfig.java           # Web configuration
│   └── exception/
│       └── GlobalExceptionHandler.java  # Exception handling
├── src/main/
│   ├── java/com/example/backend/
│   │   └── CircularMarketplaceApplication.java  # Main app class
│   └── resources/
│       └── application.properties   # Configuration file
├── setup/
│   └── database.sql                 # Database initialization script
└── pom.xml                          # Maven dependencies

ml/                                 # (For ML models)
ngo/                                # (For NGO-specific logic)
seller/                             # (For Seller-specific logic)
user/                               # (For User-specific logic)
```

## User Roles

### 1. USER
- Regular marketplace user
- Can browse and purchase products
- Basic profile fields

### 2. SELLER
- Can list and sell products
- Additional fields: `sellerShopName`, `sellerCategory`

### 3. NGO
- Non-governmental organization
- Can manage circular initiatives
- Additional fields: `ngoName`, `ngoRegistrationNumber`

## Token Information

JWT Token contains:
- **email**: User email (subject)
- **role**: User role (ROLE_USER, ROLE_SELLER, ROLE_NGO)
- **iat**: Issue time
- **exp**: Expiration time (24 hours by default)

Refresh Token:
- **Expiration**: 7 days by default
- Use to obtain a new access token

## Error Handling

All errors return appropriate HTTP status codes:

- `400 Bad Request`: Validation errors or invalid input
- `401 Unauthorized`: Invalid credentials
- `500 Internal Server Error`: Server errors

## Database Configuration

The system uses MySQL with the following table structure:

```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    role ENUM('USER', 'SELLER', 'NGO') NOT NULL,
    is_active BOOLEAN DEFAULT true,
    seller_shop_name VARCHAR(255),
    seller_category VARCHAR(255),
    ngo_name VARCHAR(255),
    ngo_registration_number VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Frontend Integration

For your React/Vite frontend:

1. **Store the JWT token** from login/register response in localStorage or sessionStorage
2. **Include token in API headers** for protected routes:
   ```javascript
   const headers = {
     'Authorization': `Bearer ${token}`,
     'Content-Type': 'application/json'
   };
   ```
3. **Handle token expiration** - refresh token on 401 responses
4. **Route-based access control** based on user role

## Security Considerations

⚠️ **For Production:**
- Change the JWT secret to a strong, random key
- Use environment variables for sensitive data
- Enable HTTPS
- Implement rate limiting
- Add CSRF protection
- Implement refresh token rotation
- Add logging and monitoring
- Use secure password policies

## Next Steps

1. ✅ Setup and run the backend
2. ⬜ Create frontend authentication pages
3. ⬜ Implement role-based dashboard views
4. ⬜ Add seller/NGO specific features
5. ⬜ Integrate with ML models for recommendations

## Troubleshooting

### Issue: Connection refused to MySQL
- Ensure MySQL is running
- Check database credentials in application.properties
- Verify database exists: `show databases;`

### Issue: JWT validation failed
- Ensure token is included correctly in headers
- Check token hasn't expired
- Verify JWT secret matches between generation and validation

### Issue: CORS errors
- Ensure frontend URL is in allowed origins in WebConfig.java
- Check that credentials are included in frontend fetch requests

## Support

For issues or questions, refer to:
- Backend documentation in this file
- JWT configuration in `SecurityConfig.java`
- Database schema in `database.sql`
