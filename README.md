# ⚡ Full-Stack URL Shortener System

A high-performance, distributed URL shortener application engineered with **Spring Boot 4**, **React 19**, **Neon PostgreSQL**, **Upstash Redis (TLS)**, and **Docker**.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://url-shortener-peach-three-60.vercel.app)
[![Backend API](https://img.shields.io/badge/API_Live-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://url-shortener-backend-k7ks.onrender.com/test)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.0.6-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon_Cloud-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech)
[![Redis](https://img.shields.io/badge/Redis-Upstash_TLS-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://upstash.com)

---

## 🌐 Live Deployment Links

* 🔗 **Live Web Application**: **[https://url-shortener-peach-three-60.vercel.app](https://url-shortener-peach-three-60.vercel.app)**
* 📡 **Live Backend API**: **[https://url-shortener-backend-k7ks.onrender.com](https://url-shortener-backend-k7ks.onrender.com)**
* 🩺 **API Health Check**: `https://url-shortener-backend-k7ks.onrender.com/test`

---

## 🌟 Key Features

- 🔗 **Bijective Base62 Encoding**: Collision-free short code generation from auto-incrementing database identifiers.
- ⚡ **Sub-Millisecond Redirection**: Cache-Aside pattern utilizing Redis in-memory storage for `< 2ms` redirect latency.
- 🔒 **TLS/SSL Encrypted Redis**: Automatic SSL negotiation supporting cloud serverless Redis (Upstash) and local unencrypted setups.
- ⏳ **Sliding TTL Cache**: 10-minute cache invalidation with automatic cache warming on miss.
- 📊 **Click & Traffic Tracking**: Persistent click analytics tracked in PostgreSQL.
- 🎨 **Modern React + Vite Frontend**: High-aesthetic dark UI with responsive design, one-click copy, and real-time link generation.
- 🐳 **Cloud Native & Dockerized**: Containerized Spring Boot backend deployed seamlessly on Render free tier.

---

## 🏗️ System Architecture

```text
[ Browser / Client ]
        │
        ▼ (HTTPS)
[ Vercel CDN: React + Vite Frontend ]
        │
        ▼ (REST API / JSON)
[ Render: Dockerized Spring Boot Backend ]
        │
   ┌────┴────────────────────────┐
   ▼                             ▼ (TLS Port 6379)
[ Neon PostgreSQL ]       [ Upstash Redis Cache ]
  (Persistent Store)        (In-Memory Cache)
```

---

## 🛠️ Tech Stack

| Domain | Technology | Hosting / Platform |
|---|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS / Vanilla CSS | **Vercel** (Global Edge CDN) |
| **Backend** | Java 17+, Spring Boot 4, Spring Data JPA, Spring Data Redis, Lombok | **Render** (Cloud Docker Container) |
| **Database** | PostgreSQL 18 | **Neon.tech** (Serverless Cloud Postgres) |
| **Cache Layer** | Redis 7 (In-Memory with TLS encryption) | **Upstash** (Serverless Redis) |
| **Build Tools** | Maven Wrapper (`mvnw`), npm, Docker | Docker Engine / BuildKit |

---

## 📁 Repository Structure

```text
Url-Shortener/
├── url-shortener/               # Spring Boot REST API Backend
│   ├── src/
│   │   ├── main/java/com/drupad/urlshortener/
│   │   └── main/resources/application.properties
│   ├── pom.xml
│   └── Dockerfile
├── url-shortener-frontend/      # React + Vite Production Frontend
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 🚀 Local Development Setup

### 1. Prerequisites
- **Java 17+** (JDK 17 or higher)
- **Node.js 18+** & npm
- **PostgreSQL** running locally on port `5432`
- **Redis** running locally on port `6379`

### 2. Backend Setup
```powershell
cd url-shortener

# Set local environment variables (adjust password as needed)
$env:DB_URL="jdbc:postgresql://localhost:5432/urlshortener"
$env:DB_USERNAME="postgres"
$env:DB_PASSWORD="postgres"
$env:REDIS_HOST="localhost"
$env:REDIS_PORT="6379"

# Run Spring Boot
.\mvnw.cmd spring-boot:run
```
*Backend runs at `http://localhost:8080`.*

### 3. Frontend Setup
```powershell
cd url-shortener-frontend
npm install
npm run dev
```
*Frontend runs at `http://localhost:5173`.*

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/shorten` | Generate short code for long URL |
| `GET` | `/{shortCode}` | 302 Redirect to destination URL |
| `GET` | `/test` | Health-check endpoint |

---

## 👨‍💻 Author

**Drupad Dhamdhere**  
- **GitHub**: [github.com/Drupad-2027](https://github.com/Drupad-2027)  
- **LinkedIn**: [linkedin.com/in/drupad-dhamdhere](https://www.linkedin.com/in/drupad-dhamdhere)
