# Quick Start Guide - Circular Marketplace Authentication

## 🚀 Getting Started in 5 Minutes

### Step 1: Setup MySQL Database

```bash
# Open MySQL command line
mysql -u root -p

# Execute the setup script
source Backend/setup/database.sql

# Verify database created
SHOW DATABASES;
USE circular_marketplace;
SHOW TABLES;
```

### Step 2: Configure Backend

Edit `Backend/src/main/resources/application.properties`:

```properties
# Database connection
spring.datasource.username=root
spring.datasource.password=your_mysql_password

# JWT Secret (change for production)
app.jwt.secret=9a0e7e3c2b1d4f6a8c5e2b0d1a3f7c9e6b2d4a1f8e5c2b9a7d0f3e6c9b2e5a
```

### Step 3: Build and Run Backend

```bash
cd Backend

# Install dependencies
mvn clean install

# Run the application
mvn spring-boot:run
```

Server starts at: `http://localhost:8080`

### Step 4: Setup Frontend

```bash
cd Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend available at: `http://localhost:5173`

## 📋 Testing the API

### Test Registration

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "fullName": "John Doe",
    "phoneNumber": "+1234567890",
    "role": "USER"
  }'
```

### Test Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Test Health

```bash
curl http://localhost:8080/api/auth/health
```

## 🔑 Role-Based Registration Examples

### Register as USER
```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John User",
  "phoneNumber": "+1234567890",
  "role": "USER"
}
```

### Register as SELLER
```json
{
  "email": "seller@example.com",
  "password": "password123",
  "fullName": "Sarah Seller",
  "phoneNumber": "+0987654321",
  "role": "SELLER",
  "sellerShopName": "Sarah's Electronics",
  "sellerCategory": "Electronics"
}
```

### Register as NGO
```json
{
  "email": "ngo@example.com",
  "password": "password123",
  "fullName": "NGO Admin",
  "phoneNumber": "+1122334455",
  "role": "NGO",
  "ngoName": "Green Initiative NGO",
  "ngoRegistrationNumber": "NGO2024001"
}
```

## 💾 JWT Token Structure

After login/register, you'll receive:

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
    "role": "USER"
  }
}
```

## 🔐 Using the Token

Include the token in all protected requests:

```javascript
const token = localStorage.getItem('token');

fetch('http://localhost:8080/api/protected-endpoint', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

## 📁 Project Structure After Setup

```
d:\Projects\AI-powered-Circular-Marketplace-
├── Backend/
│   ├── pom.xml
│   ├── README.md
│   ├── src/main/
│   │   ├── java/com/example/backend/
│   │   │   ├── CircularMarketplaceApplication.java
│   │   │   ├── controller/
│   │   │   ├── service/
│   │   │   ├── model/
│   │   │   ├── dto/
│   │   │   ├── repository/
│   │   │   ├── security/
│   │   │   ├── config/
│   │   │   └── exception/
│   │   └── resources/
│   │       └── application.properties
│   ├── auth/
│   │   └── [All auth related files]
│   └── setup/
│       └── database.sql
├── Frontend/
│   ├── src/
│   │   ├── services/
│   │   │   └── authService.js
│   │   ├── components/
│   │   │   └── Auth/
│   │   │       ├── LoginForm.jsx
│   │   │       └── SignupForm.jsx
│   │   └── App.jsx
│   └── package.json
```

## 🛠️ Common Issues & Solutions

### Issue: "No database selected"
**Solution:** Ensure you ran `source Backend/setup/database.sql`

### Issue: CORS error on login
**Solution:** Verify frontend URL is in `WebConfig.java` allowed origins

### Issue: "Invalid credentials"
**Solution:** 
1. Check email exists in database: `SELECT * FROM users WHERE email='...';`
2. Verify password matches in database
3. Check user is active: `is_active = 1`

### Issue: Token validation fails
**Solution:** 
1. Ensure token is in `Authorization: Bearer <token>` format
2. Check token hasn't expired (24 hours)
3. Verify JWT secret in application.properties matches

## 📚 Next Steps

1. ✅ **Backend Auth Setup** - Complete!
2. ⏭️ **Frontend Integration** - Use provided LoginForm.jsx and SignupForm.jsx
3. ⏭️ **Role-based Dashboards** - Create separate views for User/Seller/NGO
4. ⏭️ **Protected Routes** - Implement middleware to protect frontend routes
5. ⏭️ **Seller Features** - Add product listing/management
6. ⏭️ **NGO Features** - Add initiative management
7. ⏭️ **ML Integration** - Connect ML models for recommendations

## 📞 Need Help?

1. Check `Backend/README.md` for detailed API documentation
2. Review error messages in browser console and server logs
3. Verify all credentials are correct in application.properties
4. Ensure MySQL is running and accessible

## 🎯 Test Checklist

- [ ] MySQL database created and tables exist
- [ ] Backend runs without errors on port 8080
- [ ] Can register a user via API
- [ ] Can login with registered user
- [ ] Receive JWT token on successful login
- [ ] Frontend can reach backend API
- [ ] Token stored in localStorage after login
- [ ] Can make requests with Bearer token

Good luck! 🚀
