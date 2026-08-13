# 🌿 CircleMarket — AI-Powered Circular Marketplace

<div align="center">

![CircleMarket Banner](https://img.shields.io/badge/CircleMarket-AI%20Powered-62CF8E?style=for-the-badge&logo=leaf&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.1.5-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

**A location-aware, AI-powered platform for buying and selling circular/rescued products nearby.**

[Features](#-features) · [Architecture](#-architecture) · [Getting Started](#-getting-started) · [API Reference](#-api-reference) · [Screenshots](#-screenshots)

</div>

---

## 📖 Overview

CircleMarket is a full-stack web application that connects **sellers** who want to list rescued or circular products with **customers** who can discover those products using real-time GPS location. An embedded **AI-powered photo search** lets customers upload any product image and instantly find visually similar items available in nearby shops.

### The Problem It Solves
- Products go unsold and end up as waste because sellers can't reach local buyers efficiently
- Buyers have no easy way to discover circular/second-hand items near them
- Traditional search requires knowing what you're looking for — AI photo search doesn't

---

## ✨ Features

### 🔐 Authentication
- JWT-based stateless authentication
- Secure password hashing with BCrypt
- Two-step signup with **role selection** (Customer or Seller)
- GPS location capture during registration
- Protected routes — all portals require login

### 🛍️ Customer Portal
- **Location-based Marketplace** — uses browser GPS to find products within a configurable radius (default 10 km)
- **Nearby Shops Strip** — shows all seller shops sorted by distance
- **Category Filtering** — filter products by electronics, clothing, furniture, books, food, toys, sports, etc.
- **Text Search** — search by product name, shop name, or category
- **Wishlist** — heart-toggle any product
- **AI Photo Search** — upload a product photo and find similar items nearby

### 🏪 Seller Portal
- **Seller Dashboard** — view total listings, available count, total value, shop name
- **Add Product** — full form with:
  - Drag-and-drop image upload (stored as Base64)
  - Category and condition selectors
  - Selling price and original price (auto-computes discount %)
  - Quantity field
  - GPS location pinning (auto-creates/updates seller's shop)
  - Shop address
- **Inventory Management** — view all listings in a card grid with delete functionality
- Auto-creates shop record from seller's location on first product listing

### 🤖 AI Photo Search
- Upload any product photo to the search panel
- Backend analyses the image and guesses the product category
- Returns nearby products in matching category, ranked with **"Best Match"** badges
- Designed to be swapped out for Google Vision API or a real ML model

### 📍 Location System
- Haversine formula distance calculation in JPQL queries
- Sellers set location at signup or per-product
- Products and shops stored with lat/lng coordinates
- Customers grant browser GPS permission; distance shown on every product card

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   FRONTEND (React + Vite)                │
│                   http://localhost:5173                  │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │  AuthContext  │  │  API Service  │  │ProtectedRoute│   │
│  │  (JWT store) │  │(Axios + JWT) │  │(Role gating) │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                          │
│  Pages: LoginPage │ SignupPage │ Marketplace             │
│          SellerDashboard │ AddProduct │ Inventory         │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTP / REST (JSON)
                           │ Bearer Token (JWT)
┌──────────────────────────▼──────────────────────────────┐
│                BACKEND (Spring Boot 3.1.5)               │
│                   http://localhost:8080                  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │          Spring Security + JWT Filter             │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  Auth Layer           │  Marketplace Layer               │
│  ─────────────────    │  ───────────────────────────     │
│  AuthController       │  MarketplaceController           │
│  AuthService          │  MarketplaceService              │
│  JwtUtil              │  ProductRepository (Haversine)   │
│  JwtAuthFilter        │  ShopRepository (Haversine)      │
│  SecurityConfig       │                                  │
│                       │                                  │
└──────────────────────────────────────────────────────────┘
                           │ JPA / Hibernate
┌──────────────────────────▼──────────────────────────────┐
│                  MySQL Database                          │
│                                                          │
│   users  │  products  │  shops                          │
└──────────────────────────────────────────────────────────┘
```

### Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite 8, React Router 7, Axios |
| **Styling** | Vanilla CSS Modules, Space Grotesk + Manrope + IBM Plex Mono |
| **Backend** | Spring Boot 3.1.5, Spring Security, Spring Data JPA |
| **Auth** | JWT (JJWT 0.12.3), BCrypt |
| **Database** | MySQL 8.0, Hibernate ORM |
| **Build** | Maven (Backend), Vite (Frontend) |

---

## 📂 Project Structure

```
AI-powered-Circular-Marketplace/
│
├── Backend/                          ← Spring Boot application
│   ├── pom.xml                       ← Maven dependencies
│   └── src/main/java/com/example/backend/
│       ├── CircularMarketplaceApplication.java   ← Main entry point
│       │
│       ├── auth/                     ← Authentication module
│       │   ├── controller/
│       │   │   └── AuthController.java           ← /api/auth/* endpoints
│       │   ├── model/
│       │   │   └── User.java                     ← User JPA entity
│       │   ├── repository/
│       │   │   └── UserRepository.java
│       │   ├── security/
│       │   │   ├── JwtUtil.java                  ← Token generation & validation
│       │   │   ├── JwtAuthFilter.java            ← Per-request JWT filter
│       │   │   └── SecurityConfig.java           ← Security rules + CORS
│       │   └── service/
│       │       └── AuthService.java              ← Register, login logic
│       │
│       └── marketplace/              ← Marketplace module
│           ├── controller/
│           │   └── MarketplaceController.java    ← Product & shop endpoints
│           ├── model/
│           │   ├── Product.java                  ← Product JPA entity
│           │   └── Shop.java                     ← Shop JPA entity
│           ├── repository/
│           │   ├── ProductRepository.java        ← Haversine distance queries
│           │   └── ShopRepository.java
│           └── service/
│               └── MarketplaceService.java       ← Business logic + AI search
│
├── Frontend/                         ← React + Vite application
│   ├── index.html
│   ├── package.json
│   └── src/
│       ├── main.jsx                  ← App entry point
│       ├── App.jsx                   ← Routes + AuthProvider
│       ├── index.css                 ← Global design tokens
│       │
│       ├── context/
│       │   └── AuthContext.jsx       ← JWT state management
│       │
│       ├── services/
│       │   ├── api.js                ← Axios client + JWT interceptor
│       │   ├── auth.js               ← Auth API calls
│       │   └── marketplace.js        ← Marketplace API calls
│       │
│       ├── pages/
│       │   ├── auth/
│       │   │   ├── LoginPage.jsx
│       │   │   ├── SignupPage.jsx     ← 2-step: details → role + location
│       │   │   └── AuthPages.module.css
│       │   ├── customer/
│       │   │   ├── Marketplace.jsx   ← GPS + live products + AI search
│       │   │   └── Marketplace.module.css
│       │   └── seller/
│       │       ├── SellerDashboard.jsx
│       │       ├── AddProduct.jsx    ← Image upload + location pin
│       │       └── Inventory.jsx     ← Product management
│       │
│       └── components/
│           ├── layout/
│           │   ├── DashboardLayout.jsx
│           │   ├── Sidebar.jsx       ← User info + logout
│           │   ├── Header.jsx
│           │   └── ProtectedRoute.jsx
│           └── marketplace/
│               ├── AiSearchPanel.jsx ← Photo upload → API → results
│               ├── ProductCard.jsx
│               ├── ProductGrid.jsx
│               └── CategoryChips.jsx
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version | Required for |
|------|---------|-------------|
| **Node.js** | 18+ | Frontend |
| **Java JDK** | 17+ | Backend |
| **Maven** | 3.8+ | Backend build |
| **MySQL** | 8.0+ | Database |

---

### Step 1 — Set Up the Database

Open MySQL and run:

```sql
CREATE DATABASE circular_marketplace CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

### Step 2 — Configure the Backend

Open `Backend/src/main/resources/application.properties` and update:

```properties
# Set your MySQL password here
spring.datasource.password=YOUR_MYSQL_PASSWORD

# Optional: change your MySQL username if not root
spring.datasource.username=root
```

> All other settings (JWT secret, port 8080, JPA auto-DDL) are pre-configured and work out of the box.

---

### Step 3 — Start the Backend

```bash
cd Backend
mvn spring-boot:run
```

You should see:
```
Started CircularMarketplaceApplication in X.XXX seconds
```

Backend is now running at **http://localhost:8080**

> On first start, Hibernate will auto-create all tables (`users`, `products`, `shops`) via `spring.jpa.hibernate.ddl-auto=update`

---

### Step 4 — Start the Frontend

Open a new terminal:

```bash
cd Frontend
npm install
npm run dev
```

Frontend is now running at **http://localhost:5173**

---

### Step 5 — Use the App

1. Open `http://localhost:5173` in your browser
2. You'll be redirected to `/login` automatically
3. Click **"Create one free"** to register
4. Choose your role and follow the steps below

---

## 👥 User Roles & Flows

### 🛒 Customer

```
Signup → Choose "Buy & Discover" → Allow location
→ Marketplace → Browse nearby products
→ Filter by category / search by name
→ "AI photo search" → Upload photo → See similar items
```

### 🏪 Seller

```
Signup → Choose "Sell Products" → Enter shop name → Allow location
→ Seller Dashboard → "Add New Product"
→ Fill form (name, category, price, image, condition)
→ "Pin my location" → "Publish Product"
→ Inventory → See all listings → Delete if needed
```

> Products listed by sellers immediately appear to nearby customers in the marketplace.

---

## 🔌 API Reference

### Auth Endpoints (Public)

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | `{name, email, password, role, latitude, longitude, address, shopName}` | Register new user |
| `POST` | `/api/auth/login` | `{email, password}` | Login → returns JWT token |

**Register Response:**
```json
{
  "token": "eyJhbGci...",
  "user": {
    "id": 1,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "SELLER",
    "latitude": 12.9716,
    "longitude": 77.5946,
    "shopName": "Green Garden Store"
  }
}
```

### Auth Endpoints (Protected — requires `Authorization: Bearer <token>`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/auth/me` | Get current user profile |

### Marketplace Endpoints (Public)

| Method | Endpoint | Params | Description |
|--------|----------|--------|-------------|
| `GET` | `/api/products/nearby` | `latitude`, `longitude`, `radiusKm` (default 10) | Get products within radius |
| `GET` | `/api/shops/nearby` | `latitude`, `longitude`, `radiusKm` (default 10) | Get shops within radius |
| `POST` | `/api/products/ai-search` | Form-data: `image` file, `latitude`, `longitude`, `radiusKm` | Upload photo → find similar nearby products |

### Marketplace Endpoints (Protected — Seller)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products/my` | Get all products listed by the logged-in seller |
| `POST` | `/api/products` | Add a new product listing |
| `DELETE` | `/api/products/{id}` | Delete own product |

**Add Product Body:**
```json
{
  "name": "Vintage Wooden Chair",
  "category": "furniture",
  "price": 299,
  "originalPrice": 1500,
  "quantity": 1,
  "condition": "good",
  "description": "Solid teak, minor scratches on leg",
  "imageBase64": "...",
  "shopName": "Green Garden Store",
  "address": "123 Main St, Bengaluru",
  "latitude": 12.9716,
  "longitude": 77.5946
}
```

---

## 🗄️ Database Schema

### `users` table
| Column | Type | Description |
|--------|------|-------------|
| `id` | BIGINT PK | Auto-increment |
| `name` | VARCHAR | Full name |
| `email` | VARCHAR UNIQUE | Login email |
| `password` | VARCHAR | BCrypt hash |
| `role` | ENUM | `CUSTOMER`, `SELLER`, `NGO`, `ADMIN` |
| `latitude` | DOUBLE | User/shop location |
| `longitude` | DOUBLE | User/shop location |
| `address` | VARCHAR(500) | Human-readable address |
| `shop_name` | VARCHAR | Seller's shop name |
| `created_at` | DATETIME | Auto-set on create |

### `shops` table
| Column | Type | Description |
|--------|------|-------------|
| `id` | BIGINT PK | Auto-increment |
| `name` | VARCHAR | Shop display name |
| `seller_email` | VARCHAR | Links to users.email |
| `latitude` | DOUBLE | Shop GPS latitude |
| `longitude` | DOUBLE | Shop GPS longitude |
| `address` | VARCHAR(500) | Shop address |
| `category` | VARCHAR | Primary category |
| `created_at` | DATETIME | Auto-set |

### `products` table
| Column | Type | Description |
|--------|------|-------------|
| `id` | BIGINT PK | Auto-increment |
| `name` | VARCHAR | Product name |
| `category` | VARCHAR | Category slug |
| `price` | DOUBLE | Selling price (₹) |
| `original_price` | DOUBLE | Original price for discount calc |
| `image_base64` | LONGTEXT | Base64-encoded product image |
| `description` | VARCHAR(2000) | Product description |
| `status` | VARCHAR | `available`, `sold` |
| `seller_email` | VARCHAR | Seller reference |
| `shop_name` | VARCHAR | Denormalized for quick display |
| `address` | VARCHAR(500) | Product location address |
| `latitude` | DOUBLE | Product GPS lat |
| `longitude` | DOUBLE | Product GPS lng |
| `quantity` | INT | Stock quantity |
| `condition` | VARCHAR | `new`, `like-new`, `good`, `fair`, `for-parts` |
| `shop_id` | BIGINT FK | Links to shops.id |
| `created_at` | DATETIME | Auto-set |

---

## 🤖 How the AI Photo Search Works

```
User uploads photo
      │
      ▼
Frontend sends multipart/form-data to /api/products/ai-search
(image file + user's lat/lng)
      │
      ▼
MarketplaceService.aiSearch()
      │
      ├── guessCategoryFromImage(image)
      │     → Checks filename for keywords
      │       (e.g. "laptop.jpg" → "electronics")
      │     → Falls back to random category for demo
      │
      ├── productRepository.findNearbyByCategory(lat, lng, radius, category)
      │     → Haversine SQL query in JPQL
      │
      └── Returns products sorted by:
            1. aiMatch = true (category matched) FIRST
            2. Then remaining nearby products
      │
      ▼
Frontend renders results with "✦ Best match" badge on matched items
```

> **To upgrade to real AI**: Replace `guessCategoryFromImage()` in `MarketplaceService.java` with a call to [Google Cloud Vision API](https://cloud.google.com/vision) or any image classification model.

---

## 🎨 Design System

The frontend uses a dark eco-themed design system defined in `src/index.css`:

| Token | Value | Usage |
|-------|-------|-------|
| `--c-ink` | `10, 15, 12` | Page background |
| `--c-moss-900` | `19, 27, 22` | Sidebar background |
| `--c-moss-800` | `28, 38, 32` | Card backgrounds |
| `--c-pine` | `31, 111, 74` | Primary green |
| `--c-emerald` | `62, 207, 142` | Accent / highlights |
| `--c-harvest` | `227, 162, 60` | Discount badges / gold |
| `--c-ember` | `226, 87, 76` | Destructive / error |
| `--c-bone` | `237, 242, 238` | Primary text |
| `--c-sage` | `143, 163, 152` | Secondary text |
| `--font-display` | Space Grotesk | Headings |
| `--font-body` | Manrope | Body text |
| `--font-mono` | IBM Plex Mono | Prices / numbers |

---

## 🔧 Configuration Reference

All backend config lives in `Backend/src/main/resources/application.properties`:

```properties
# Server
server.port=8080

# Database — CHANGE PASSWORD BEFORE RUNNING
spring.datasource.url=jdbc:mysql://localhost:3306/circular_marketplace
spring.datasource.username=root
spring.datasource.password=                        ← SET THIS

# JWT
app.jwt.secret=9a0e7e3c2b1d4f6a8c5e2b0...         ← Change for production
app.jwt.expiration=86400000                        ← 24 hours in ms

# CORS — Frontend URL
app.frontend.url=http://localhost:5173

# File Upload
spring.servlet.multipart.max-file-size=15MB
spring.servlet.multipart.max-request-size=15MB
```

---

## 🛡️ Security Notes

| Item | Implementation |
|------|---------------|
| Passwords | BCrypt hashed, never stored in plain text |
| Auth | Stateless JWT (no sessions) |
| Token expiry | 24 hours (configurable) |
| CORS | Restricted to `localhost:3000` and `localhost:5173` |
| Seller endpoints | Verified via JWT — sellers can only delete their own products |
| Public endpoints | `/api/auth/*`, `/api/products/nearby`, `/api/shops/nearby`, `/api/products/ai-search` |

> ⚠️ **For production**: Change the `app.jwt.secret` to a cryptographically random 256-bit key, restrict CORS to your actual domain, and enable HTTPS.

---

## 🌱 Product Categories

The marketplace supports these categories (filterable in UI):

| Category | Icon keyword |
|----------|-------------|
| `electronics` | phones, laptops, cameras |
| `clothing` | shirts, dresses, jackets |
| `furniture` | chairs, tables, sofas |
| `books` | novels, textbooks |
| `food` | organic, snacks, produce |
| `toys` | games, kids items |
| `sports` | gym, cycling, fitness |
| `tools` | hardware, DIY |
| `other` | everything else |

---

## 📝 Scripts

### Frontend
```bash
npm run dev        # Start dev server (http://localhost:5173)
npm run build      # Build for production (outputs to dist/)
npm run preview    # Preview production build locally
npm run lint       # Run oxlint
```

### Backend
```bash
mvn spring-boot:run     # Start with hot-reload
mvn compile             # Compile only
mvn package             # Build JAR
mvn package -DskipTests # Build JAR without running tests
java -jar target/circular-marketplace-backend-1.0.0.jar  # Run JAR directly
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">

Built with 💚 for a more circular economy

**CircleMarket** — *Rescue · Reuse · Reconnect*

</div>
