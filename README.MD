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

| Variabel                                  | Keterangan                              | Contoh                  |
| ----------------------------------------- | --------------------------------------- | ----------------------- |
| `NEXT_PUBLIC_SERVER_API_BASE_URL`         | URL API dari server backend             | `http://localhost:5000` |
| `NEXT_PUBLIC_PYTHON_SERVICE_API_BASE_URL` | URL layanan Python eksternal (opsional) | `http://localhost:8000` |

### Server (.env)

| Variabel                | Keterangan                                                  | Contoh                       |
| ----------------------- | ----------------------------------------------------------- | ---------------------------- |
| `PORT`                  | Port untuk menjalankan server backend                       | `5000`                       |
| `NODE_ENV`              | Mode environment: `development` atau `production`           | `development`                |
| `CLIENT_URL`            | URL frontend yang terhubung ke backend                      | `http://localhost:3000`      |
| `DB_TYPE`               | Jenis database yang digunakan (`local`, `neon`, `supabase`) | `local`                      |
| `DB_USER`               | Username database untuk koneksi lokal                       | `postgres`                   |
| `DB_HOST`               | Host database untuk koneksi lokal                           | `localhost`                  |
| `DB_NAME`               | Nama database yang digunakan                                | `survaanalytics_db`          |
| `DB_PASSWORD`           | Password database lokal                                     | `yourpassword`               |
| `DB_PORT`               | Port database                                               | `5432`                       |
| `DB_SSL`                | Gunakan SSL untuk koneksi database (`true` / `false`)       | `false`                      |
| `NEON_DATABASE_URL`     | Connection string dari Neon PostgreSQL                      | `postgres://...`             |
| `SUPABASE_DATABASE_URL` | Connection string dari Supabase PostgreSQL                  | `postgres://...`             |
| `JWT_ACCESS_SECRET`     | Secret key JWT Access Token                                 | `someaccesssecretkey`        |
| `JWT_REFRESH_SECRET`    | Secret key JWT Refresh Token                                | `somerefreshsecretkey`       |
| `SMTP_HOST`             | Alamat SMTP provider email                                  | `smtp.gmail.com`             |
| `SMTP_PORT`             | Port SMTP (465 = SSL, 587 = TLS)                            | `465`                        |
| `SMTP_USE_SSL`          | Gunakan SSL untuk email (`true` / `false`)                  | `true`                       |
| `SMTP_USER`             | Alamat email pengirim                                       | `youremail@gmail.com`        |
| `SMTP_PASSWORD`         | App Password atau password email                            | `yourapppassword`            |
| `FROM_EMAIL`            | Email pengirim yang tampil                                  | `noreply@survaanalytics.com` |
| `REDIS_URL`             | URL koneksi ke Redis                                        | `redis://localhost:6379`     |
| `XENDIT_SECRET_KEY`     | API key dari Xendit                                         | `xnd_production_...`         |
| `XENDIT_CALLBACK_TOKEN` | Token untuk memverifikasi callback dari Xendit              | `your-callback-token`        |

### Python Service (.env)

| Variabel      | Keterangan                                       | Contoh                  |
| ------------- | ------------------------------------------------ | ----------------------- |
| `APP_NAME`    | Nama aplikasi atau layanan                       | `AI Service`            |
| `CLIENT_URL`  | URL aplikasi frontend yang mengakses layanan ini | `http://localhost:3000` |
| `DEBUG`       | Aktifkan debug mode (`True` / `False`)           | `True`                  |
| `ENVIRONMENT` | Lingkungan aktif (`development` / `production`)  | `development`           |
| `PORT`        | Port untuk menjalankan service Python            | `8000`                  |

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
