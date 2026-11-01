# ⚡ Full-Stack URL Shortener System

A high-performance, full-stack URL shortener application engineered with **Spring Boot 4**, **React 19**, **PostgreSQL 18**, **Redis 7**, and **Docker**.

---

## 🌟 Key Features

- 🔗 **Bijective Base62 Encoding**: Collision-free short code generation from auto-incrementing database identifiers.
- ⚡ **Sub-Millisecond Redirection**: Cache-Aside pattern utilizing Redis in-memory storage for `< 2ms` redirect latency.
- ⏳ **Sliding TTL Cache**: 10-minute cache invalidation with automatic cache warming on miss.
- 📊 **Click & Traffic Tracking**: Persistent click analytics tracked in PostgreSQL.
- 🎨 **Modern React + Vite Frontend**: High-aesthetic dark UI with QR code generation, one-click copy, and live backend health indicators.
- 🐳 **Docker Ready**: Multi-stage containerization ready for cloud deployment.

---

## 🛠️ Tech Stack

| Domain | Technology |
|---|---|
| **Backend** | Java 17+, Spring Boot 4, Spring Data JPA, Spring Data Redis, Lombok |
| **Frontend** | React 19, Vite, Vanilla CSS Design System, Lucide Icons, Canvas Confetti |
| **Database** | PostgreSQL 18 |
| **Cache Layer** | Redis 7 (In-Memory) |
| **Build Tools** | Maven Wrapper (`mvnw`), npm |

---

## 📁 Repository Structure

```text
Url-Shortener/
├── url-shortener/        # Spring Boot REST API Backend
│   ├── src/
│   │   ├── main/java/com/drupad/urlshortener/
│   │   └── main/resources/application.properties
│   ├── pom.xml
│   └── Dockerfile
└── frontend/             # React + Vite Interactive Frontend
    ├── src/
    │   ├── App.jsx
    │   ├── App.css
    │   └── index.css
    ├── package.json
    └── vite.config.js
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Java 17+** (JDK 17 or higher)
- **Node.js 18+** & npm
- **PostgreSQL** running on port `5432` (with database `urlshortener` created)
- **Redis** running on port `6379`

### 2. Backend Setup
```powershell
cd url-shortener

# Set environment variables (adjust password as needed)
$env:DB_URL="jdbc:postgresql://localhost:5432/urlshortener"
$env:DB_USERNAME="postgres"
$env:DB_PASSWORD="postgres"

# Run Spring Boot
.\mvnw.cmd spring-boot:run
```
*Backend runs at `http://localhost:8080`.*

### 3. Frontend Setup
```powershell
cd frontend
npm install
npm run dev
```
*Frontend runs at `http://localhost:5173` or `http://localhost:5174`.*

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
