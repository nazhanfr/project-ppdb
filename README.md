# PPDB TPQ — Sistem Informasi PPDB TPQ (Fullstack)

Sistem Informasi Penerimaan Peserta Didik Baru (PPDB) TPQ berbasis website lengkap:
- **Frontend**: React + Vite, JavaScript, React Router, Tailwind CSS v4, Lucide Icons.
- **Backend API**: Node.js, Express, SQLite (`node:sqlite`), Multer, JWT, bcryptjs.

## Status Sistem
- **Fase 1–5 (Frontend)**: Selesai dan terverifikasi penuh.
- **Fase 6 (Backend API & Integrasi Fullstack)**: Selesai dan terhubung secara end-to-end.
- Data tersimpan secara persisten di database SQLite (`backend/data/ppdb.db`) dan berkas dokumen tersimpan di `backend/uploads/`.
- Dilengkapi fallback otomatis ke mode offline/demo jika backend sedang tidak aktif.

---

## Cara Menjalankan Aplikasi

Pastikan Node.js (v20+ disarankan, v22/v26 didukung penuh) terpasang.

### 1. Menjalankan Backend API
Buka terminal pada folder `backend/`:
```bash
cd backend
npm install
npm run dev
```
Backend API akan berjalan di: **`http://localhost:5000`**

### 2. Menjalankan Frontend
Buka terminal pada folder `ppdb-tpq/`:
```bash
cd ppdb-tpq
npm install
npm run dev
```
Frontend akan berjalan di: **`http://localhost:5173`** (Vite otomatis melakukan reverse-proxy rute `/api` dan `/uploads` ke backend port 5000).

---

## Akun Bawaan untuk Pengujian
Portal login (`/masuk`) telah dilengkapi tombol preset cepat untuk menguji akun berikut:
- **Akun Wali Santri**:
  - Email: `wali@demo.local`
  - Kata Sandi: `wali123`
- **Akun Admin Pengelola**:
  - Email: `admin@demo.local`
  - Kata Sandi: `admin123`

---

## Menjalankan Pengujian Otomatis

### 1. Pengujian Backend API
Di folder `backend/`:
```bash
npm test
```
Menjalankan tes API lengkap (Healthcheck, Auth JWT, Applicant Flow & Submission, Admin Review, Document Upload & Deletion).

### 2. Pengujian Frontend
Di folder `ppdb-tpq/`:
```bash
npm test
npm run build
```
Memverifikasi unit test penyimpanan serta validasi build produksi Vite.

---

## Fitur Utama

### A. Portal Calon Santri & Wali
1. **Registrasi & Login Akun**: Autentikasi aman berbasis JWT dan kata sandi ter-hash bcrypt.
2. **Formulir Pendaftaran Bertahap**: Data santri, alamat & asal sekolah, orang tua/wali, serta dokumen pendukung.
3. **Simpan Draft**: Orang tua dapat menyimpan draf formulir kapan saja sebelum pengiriman final.
4. **Unggah Berkas Fisik**: Unggah berkas asli (PDF, JPG, PNG maks 2 MB) ke server.
5. **Dashboard Status Real-Time**: Memantau perkembangan status (`Draft`, `Dikirim`, `Sedang Ditinjau`, `Perlu Perbaikan`, `Diterima`, `Ditolak`).
6. **Cetak Bukti Pendaftaran**: Cetak bukti pendaftaran resmi dan simpan ke PDF langsung dari browser.

### B. Panel Administrasi Pengelola
1. **Dashboard Metrik**: Ringkasan jumlah pendaftar, dalam proses, diterima, ditolak, dan berkas belum diverifikasi.
2. **Kelola Pendaftar**: Pencarian instan, filter status, tambah pendaftar manual, edit, dan hapus permanen.
3. **Verifikasi Berkas**: Buka dan lihat berkas dokumen fisik yang diunggah, tetapkan status `Valid` atau `Perlu Perbaikan` beserta catatan panitia.
4. **Keputusan Seleksi**: Tetapkan status santri dan berikan catatan resmi yang langsung tampil di dashboard calon santri.
5. **Kelola Pengumuman**: Publikasikan dan hapus pengumuman publik ke portal santri.
6. **Kelola Informasi PPDB**: Perbarui jadwal, kontak, kuota, dan persyaratan.
7. **Laporan & Ekspor**: Ekspor rekapitulasi data pendaftar ke file CSV dan format cetak laporan.
