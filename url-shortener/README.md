# 🚀 URL Shortener System

A scalable full-stack URL Shortener built using Spring Boot, PostgreSQL, Redis, React, and cloud deployment platforms like Render and Vercel.

---

# 🌐 Live Demo

## Frontend
https://url-shortener-peach-three-60.vercel.app

## Backend API
https://url-shortener-backend-k7ks.onrender.com

---

# 📌 Features

- 🔗 Convert long URLs into short URLs
- ⚡ Fast redirection using Redis caching
- ⏳ TTL-based cache expiry
- 📊 Click tracking
- 🌐 Full-stack deployment
- ☁️ Cloud-hosted backend & frontend
- 🛢️ Persistent PostgreSQL storage
- 🚀 REST API architecture

---

# 🧠 System Architecture

![System Architecture](assets/SystemDesign.png)

---

# ⚙️ Tech Stack

| Technology | Usage |
|---|---|
| Java 17 | Backend Development |
| Spring Boot | REST API |
| PostgreSQL | Persistent Database |
| Redis | Caching Layer |
| React.js | Frontend |
| Vite | Frontend Build Tool |
| Maven | Dependency Management |
| Docker | Containerization |
| Render | Backend Deployment |
| Vercel | Frontend Deployment |

---

# 🔄 Application Flow

1. User submits long URL
2. Backend generates Base62 short code
3. URL stored in PostgreSQL
4. URL cached in Redis with TTL
5. User accesses short URL
6. System first checks Redis
7. If cache miss → fetch from PostgreSQL
8. Redirect user to original URL

---

# 📡 API Endpoints

## 🔹 Shorten URL

### Request

## Request Body

```json
{
  "longUrl": "https://google.com"
}
```

---

## Response

```json
a1B
```

---

# 🔹 Redirect URL

```http
GET /{shortCode}
```

### Example

```http
https://url-shortener-backend-k7ks.onrender.com/b
```

---

# 📸 Screenshots

## 🔹 Frontend UI

![Frontend UI](assets/LiveFrontend.png)

---

## 🔹 Postman Testing

![Postman Testing](assets/postmanTesting.png)

---

## 🔹 Redis Cache Verification

![Redis Cache](assets/RedisCache.png)

---

## 🔹 PostgreSQL Database

![PostgreSQL Database](assets/postgresDB.png)

---

## 🔹Render Deployment

![PostgreSQL Database](assets/RenderDeployement.png)

---

# 🧪 Local Setup

## Clone Repository

```bash
git clone https://github.com/SyntaxNova/url-shortener.git
```

---

# Backend Setup

```bash
cd url-shortener
```

## Configure PostgreSQL

Update:

```properties
application.properties
```

---

## Run Application

```bash
./mvnw spring-boot:run
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# ☁️ Deployment

| Service | Platform |
|---|---|
| Backend | Render |
| Frontend | Vercel |
| Database | Render PostgreSQL |
| Cache | Upstash Redis |

---

# 💡 Concepts Used

- Base62 Encoding
- REST APIs
- Cache-Aside Pattern
- Redis TTL
- Docker Deployment
- Full-Stack Deployment
- Cloud Hosting
- MVC Architecture

---

# 📌 Future Improvements

- Custom aliases
- QR code generation
- Link expiration
- Analytics dashboard
- Rate limiting
- JWT authentication
- User accounts

---

# 👨‍💻 Author

## Drupad Dhamdhere

🎓 BE Information Technology  
💻 Full Stack Developer  

---

# Connect With Me

- GitHub: https://github.com/Drupad-2027
- LinkedIn: https://www.linkedin.com/in/drupad-dhamdhere

---

# ⭐ If you liked this project

Give it a star on GitHub ⭐
