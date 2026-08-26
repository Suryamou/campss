# Campss Backend API (Laravel 11 + Docker)

Backend ini melayani seluruh kebutuhan API untuk aplikasi **Campss** (Pemesanan Tiket Gunung). Dibangun menggunakan Laravel 11 dan berjalan sepenuhnya di dalam lingkungan **Docker (Laravel Sail)**.

## 🚀 Persyaratan Sistem
- [Docker Desktop](https://docs.docker.com/desktop/) (Pastikan dalam keadaan aktif/running).

## ⚙️ Cara Menjalankan Server
Buka terminal di dalam folder `campss-backend`, lalu jalankan perintah berikut:

```bash
# 1. Menyalakan Server & Database
./vendor/bin/sail up -d

# 2. Menjalankan Migrasi & Mengisi Data Dummy (Seeder)
./vendor/bin/sail artisan migrate:fresh --seed
```
*Server API akan berjalan di **`http://localhost:8080/api`**.*
*Database (phpMyAdmin) dapat diakses di **`http://localhost:8081`**.*

---

## 🔐 Akun Default (Mock Data)
Saat Anda menjalankan `--seed`, database akan otomatis terisi oleh 3 akun ini (Password semuanya adalah `password123`):
- **Admin**: `admin@campss.com` (Role: admin)
- **Petugas**: `petugas@campss.com` (Role: petugas)
- **User Biasa**: `user@campss.com` (Role: user)

---

## 📡 Daftar API Endpoint

### 1. Data Publik (Tanpa Login)
| Method | Endpoint | Keterangan |
|--------|----------|------------|
| `GET`  | `/api/jalur` | Mengambil daftar jalur pendakian. |
| `GET`  | `/api/vegetasi` | Mengambil data flora & fauna. |
| `GET`  | `/api/cek-kuota` | Mengecek sisa kuota (`?tanggal=Y-m-d&jalur_id=X`). |
| `POST` | `/api/pemesanan` | Mendaftar/membuat pesanan baru (Booking). |

### 2. Autentikasi (Sanctum)
| Method | Endpoint | Keterangan |
|--------|----------|------------|
| `POST` | `/api/login` | Login user, mengembalikan `access_token`. |
| `POST` | `/api/register` | Mendaftar akun baru. |
| `POST` | `/api/logout` | Logout (Wajib Header Authorization). |

### 3. API Terlindungi (Khusus Admin/Petugas)
*Wajib menyertakan Header: `Authorization: Bearer <access_token>`*
| Method | Endpoint | Keterangan |
|--------|----------|------------|
| `POST` | `/api/admin/verifikasi/{id}` | Mengubah status pembayaran (diverifikasi/ditolak). |
| `POST` | `/api/admin/kuota` | Membuka/Menutup kuota pada tanggal tertentu. |
| `POST` | `/api/monitoring/checkin/{qr}`| Mencatat waktu masuk pendaki (Check-in). |
| `POST` | `/api/monitoring/checkout/{qr}`| Mencatat waktu turun pendaki (Check-out). |

---

## 🧪 Testing API
Saya telah menyediakan file **`campss-postman-collection.json`** di dalam folder ini. 
Anda dapat melakukan **Import** file tersebut ke aplikasi **Postman** Anda untuk langsung mendapatkan seluruh pengaturan API di atas secara otomatis!

---

## 🔗 Panduan Koneksi ke Frontend (Next.js)
1. Buat file `.env.local` di folder Frontend Anda.
2. Tambahkan: `NEXT_PUBLIC_API_URL=http://localhost:8080/api`
3. Gunakan URL tersebut pada setiap fungsi `fetch()` Anda. (Pastikan selalu mengirimkan header `Accept: application/json`).
