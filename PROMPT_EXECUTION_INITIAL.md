# Prompt Eksekusi Awal — PPDB TPQ

## Tujuan prompt
Gunakan prompt ini hanya setelah pengguna secara eksplisit menyetujui dimulainya **Fase 1 — Kerangka frontend** dalam `docs/IMPLEMENTATION_PLAN.md`. Persetujuan terhadap SOT atau pembuatan dokumen ini saja bukan izin untuk mulai coding.

---

Anda bertindak sebagai senior frontend engineer yang bekerja berdasarkan kontrak SOT proyek PPDB TPQ.

### Wajib dibaca terlebih dahulu
Baca seluruh dokumen berikut sebelum melakukan perubahan:
1. `AGENTS.md`
2. `docs/PRD.md`
3. `docs/UI_GUIDELINE.md`
4. `docs/IMPLEMENTATION_PLAN.md`

### Pemeriksaan sebelum coding
- Pastikan pengguna telah memberi persetujuan eksplisit untuk Fase 1 — Kerangka frontend.
- Jika persetujuan tidak ditemukan, berhenti tanpa membuat atau mengubah kode aplikasi dan minta persetujuan.
- Periksa kondisi folder/repository yang sudah ada agar tidak menimpa pekerjaan.
- Identifikasi keputusan yang masih terbuka: TypeScript atau JavaScript, routing, dan pendekatan styling. Jika keputusan ini diperlukan untuk memulai, ajukan pertanyaan ringkas dan tunggu jawaban.
- Jangan mengarang identitas atau informasi resmi TPQ.

### Ruang lingkup Fase 1
Setelah persetujuan dan keputusan teknis tersedia, kerjakan hanya:
- Inisialisasi React + Vite.
- Struktur folder dasar sesuai `docs/IMPLEMENTATION_PLAN.md`.
- Token desain berdasarkan `docs/UI_GUIDELINE.md`.
- Layout dasar yang responsif dan komponen fondasi minimal.
- Data demo fiktif bila diperlukan untuk memperlihatkan kerangka.
- README dengan instruksi menjalankan proyek.

Jangan membuat fitur lengkap registrasi, login, formulir pendaftaran, upload, panel admin, backend, database, atau integrasi pihak ketiga pada fase ini kecuali pengguna menyetujui perubahan ruang lingkup secara terpisah.

### Batas teknis
- Jangan menambahkan dependensi tanpa alasan yang jelas dan sesuai persetujuan.
- Jangan menambahkan backend atau mengklaim autentikasi/penyimpanan nyata.
- Jangan memasukkan rahasia atau data pribadi nyata.
- Ikuti warna, tipografi, spacing, bentuk, aksesibilitas, dan responsivitas dalam UI guideline.
- Jika keputusan teknis atau kebutuhan bertentangan dengan SOT, berhenti dan minta keputusan pengguna.

### Verifikasi
Jalankan hanya pemeriksaan yang tersedia dan relevan, misalnya instalasi dependensi bila diizinkan, `npm run build`, serta pemeriksaan struktur file. Laporkan hasil sebenarnya; jangan mengarang hasil tes.

### Output yang wajib dilaporkan
1. Ringkasan kerangka yang dibuat.
2. Daftar file yang dibuat/diubah.
3. Keputusan teknis yang diterapkan.
4. Perintah verifikasi dan hasilnya.
5. Hal yang belum dikerjakan karena di luar fase.
6. Minta persetujuan pengguna sebelum memulai Fase 2.

**Instruksi akhir:** selesaikan Fase 1 saja. Jangan beralih ke Fase 2 tanpa persetujuan eksplisit pengguna.
