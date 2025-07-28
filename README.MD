# SurvaAnalytics

SurvaAnalytics is a comprehensive platform designed to streamline the creation, distribution, and participation in survey forms. It serves as a hub where registered clients can submit survey forms to be filled out by targeted respondents based on specific criteria. The application aims to simplify the process of finding suitable respondents, ensuring that clients' data needs are met efficiently and effectively.

---

## 👥 Team – PBLIF-26  
<sub><i>Politeknik Negeri Batam 2024/2025 genap</i></sub>

- `112093` — Yeni Rokhayati, S.Si., M.Sc — *Project Manager*
- `221320` — Muhamad Sahrul Nizan, A.Md.Kom — *Co-Project Manager*
- `3312301098` — Muhammad Fathu Al Razi — *Team Leader*
- `3312301092` — Muhammad Satria Adji Sandi
- `3312301114` — Mirza Ardanas
- `3312301119` — Muhammad Abdul Aziz

---

## 📁 Project Structure

```
SurvaAnalytics/
├── client/             # Frontend - Next.js
├── server/             # Backend - Node.js & Express
├── service_python/     # Python AI Microservice - FastAPI
├── docker-compose.yml  # Docker orchestration
└── README.md
```

---

## ⚙️ Environment Configuration

### Client (.env)

| Variable                                  | Description                                        | Example                 |
| ----------------------------------------- | -------------------------------------------------- | ----------------------- |
| `NEXT_PUBLIC_SERVER_API_BASE_URL`         | Base URL of the backend server API                 | `http://localhost:5000` |
| `NEXT_PUBLIC_PYTHON_SERVICE_API_BASE_URL` | Base URL of the external Python service (optional) | `http://localhost:8000` |

### Server (.env)

| Variable                | Description                                            | Example                      |
| ----------------------- | ------------------------------------------------------ | ---------------------------- |
| `PORT`                  | Port number the backend server runs on                 | `5000`                       |
| `NODE_ENV`              | Application environment: `development` or `production` | `development`                |
| `CLIENT_URL`            | Frontend application URL that connects to the backend  | `http://localhost:3000`      |
| `DB_TYPE`               | Database type used: `local`, `neon`, or `supabase`     | `local`                      |
| `DB_USER`               | Database username (for local connections)              | `postgres`                   |
| `DB_HOST`               | Database host (for local connections)                  | `localhost`                  |
| `DB_NAME`               | Name of the database in use                            | `survaanalytics_db`          |
| `DB_PASSWORD`           | Password for the database (local)                      | `yourpassword`               |
| `DB_PORT`               | Database port number                                   | `5432`                       |
| `DB_SSL`                | Use SSL for database connection: `true` or `false`     | `false`                      |
| `NEON_DATABASE_URL`     | Full connection string for Neon PostgreSQL             | `postgres://...`             |
| `SUPABASE_DATABASE_URL` | Full connection string for Supabase PostgreSQL         | `postgres://...`             |
| `JWT_ACCESS_SECRET`     | Secret key used to sign JWT Access Tokens              | `someaccesssecretkey`        |
| `JWT_REFRESH_SECRET`    | Secret key used to sign JWT Refresh Tokens             | `somerefreshsecretkey`       |
| `SMTP_HOST`             | SMTP server host for sending emails                    | `smtp.gmail.com`             |
| `SMTP_PORT`             | SMTP port: use `465` for SSL or `587` for TLS          | `465`                        |
| `SMTP_USE_SSL`          | Use SSL for SMTP: `true` or `false`                    | `true`                       |
| `SMTP_USER`             | Email address used to send emails                      | `youremail@gmail.com`        |
| `SMTP_PASSWORD`         | Email password or app-specific password                | `yourapppassword`            |
| `FROM_EMAIL`            | Email address shown as sender                          | `noreply@survaanalytics.com` |
| `REDIS_URL`             | Redis connection string                                | `redis://localhost:6379`     |
| `XENDIT_SECRET_KEY`     | Xendit API secret key                                  | `xnd_production_...`         |
| `XENDIT_CALLBACK_TOKEN` | Token used to verify callbacks from Xendit             | `your-callback-token`        |

### Python Service (.env)

| Variable         | Description                                                          | Example                 |
| ---------------- | -------------------------------------------------------------------- | ----------------------- |
| `APP_NAME`       | Name of the Python microservice                                      | `AI Service`            |
| `CLIENT_URL`     | URL of the frontend accessing this service                           | `http://localhost:3000` |
| `DEBUG`          | Enable debug mode: `True` or `False`                                 | `True`                  |
| `ENVIRONMENT`    | Environment the service is running in: `development` or `production` | `development`           |
| `PORT`           | Port number the Python service runs on                               | `8000`                  |
| `GEMINI_API_KEY` | API key used to access the Gemini model                              | `abcde...`              |
| `GEMINI_MODEL`   | Name of the Gemini model used                                        | `gemini-2.5-flash`      |

---

## 💻 Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/fathualr/SurvaAnalytics.git
cd SurvaAnalytics
```

### 2. Setup Database

Create a PostgreSQL database (local or cloud) and run the SQL schema from:

[Database Schema SQL](https://github.com/fathualr/SurvaAnalytics/blob/main/server/src/database/schema.sql)

### 3. Run Applications (Open 3 Terminals)

#### Terminal 1: Server (Node.js)

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

#### Terminal 2: Client (Next.js)

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

#### Terminal 3: Python Service (FastAPI)

```bash
cd service_python
python -m venv venv
source venv/bin/activate   # or venv\Scripts\activate on Windows
pip install -r requirements.txt
cp app/.env.example app/.env
uvicorn app.src.main:app --reload
```

### Access the App

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000)
- Python Service (Docs): [http://localhost:8000/docs](http://localhost:8000/docs)


### Demo Login (Optional Testing)

> For development/testing only:

- **Email:** `admin@email.com`  
- **Password:** `12345678`

---

## 🚀 Production Deployment

### 1. Clone and Setup Environment Files

```bash
git clone https://github.com/fathualr/SurvaAnalytics.git
cd SurvaAnalytics

# Setup .env files for production
cp server/.env.example server/.env.production
cp client/.env.example client/.env.production
cp service_python/app/.env.example service_python/app/.env.production
```

### 2. Start with Docker Compose

```bash
docker-compose up -d --build
```

---
