# AGENTS.md — Kontrak Kerja Agen

## 1. Tujuan
Dokumen ini menetapkan aturan bagi AI coding agent atau developer yang mengerjakan proyek Sistem Informasi PPDB TPQ berbasis website. Dokumen SOT yang menjadi acuan wajib:
- `docs/PRD.md`
- `docs/UI_GUIDELINE.md`
- `docs/IMPLEMENTATION_PLAN.md`

## 2. Gerbang persetujuan wajib
- Jangan mulai implementasi aplikasi, membuat kerangka React/Vite, atau menulis kode fitur sebelum pengguna memberi persetujuan eksplisit untuk fase implementasi.
- Kerjakan hanya fase yang secara eksplisit disetujui pengguna.
- Setelah fase selesai, tampilkan ringkasan perubahan, file yang dibuat/diubah, hasil verifikasi, keterbatasan, dan keputusan yang masih diperlukan.
- Berhenti dan minta persetujuan sebelum memasuki fase berikutnya.
- Jangan menafsirkan persetujuan terhadap satu fase sebagai persetujuan untuk seluruh fase berikutnya.

## 3. Hierarki sumber kebenaran
1. Instruksi terbaru yang eksplisit dari pengguna.
2. `docs/PRD.md` untuk kebutuhan produk dan ruang lingkup.
3. `docs/UI_GUIDELINE.md` untuk visual dan perilaku UX.
4. `docs/IMPLEMENTATION_PLAN.md` untuk urutan dan batas fase.
5. `AGENTS.md` untuk aturan kerja agen.

Jika ada konflik, jangan memilih sendiri untuk mengubah kebutuhan inti. Jelaskan konflik dan minta keputusan pengguna. Perubahan SOT harus disepakati sebelum implementasi yang terdampak.

## 4. Batas ruang lingkup
- Jangan menambah fitur, layanan, framework, dependensi, backend, database, autentikasi nyata, atau integrasi pihak ketiga tanpa persetujuan pengguna.
- Target frontend yang sudah disepakati adalah React + Vite.
- Pilihan TypeScript/JavaScript, routing, dan strategi styling masih harus dipastikan sebelum Fase 1 implementasi.
- Fitur tambahan pada PRD hanya boleh dikerjakan sesuai fase dan prioritas yang disetujui.
- Jangan mengarang nama, logo, alamat, kontak, jadwal, biaya, kuota, jalur, kriteria seleksi, atau persyaratan resmi TPQ.

## 5. Standar data dan keamanan
- Data demo harus fiktif dan diberi label “Data demo”.
- Jangan menampilkan data demo seolah-olah data nyata atau tersimpan permanen.
- Jangan menyatakan autentikasi, otorisasi, upload, atau penyimpanan aman jika belum didukung backend yang sesuai.
- Hindari menaruh rahasia, token, kredensial, atau data pribadi nyata di kode, prompt, atau repositori.
- Jangan mengunggah dokumen pribadi nyata sebagai bagian pengujian.
- Tindakan hapus dan pengiriman final memerlukan konfirmasi sesuai PRD.

## 6. Standar UI/UX
- Ikuti palet, tipografi, komponen, layout, responsivitas, dan aksesibilitas dalam `docs/UI_GUIDELINE.md`.
- Gunakan bahasa Indonesia yang sederhana dan konsisten dengan istilah “calon santri” dan “orang tua/wali”, kecuali pengguna memutuskan lain.
- Setiap input memiliki label yang terlihat dan pesan validasi yang jelas.
- Sediakan state penting: loading, empty, success, error, disabled.
- Status tidak boleh dibedakan melalui warna saja.
- Jangan menambahkan animasi atau efek visual yang mengurangi keterbacaan.

## 7. Kualitas implementasi (saat sudah disetujui)
- Ikuti struktur dan urutan yang disetujui dalam `docs/IMPLEMENTATION_PLAN.md`.
- Utamakan komponen yang sederhana, dapat digunakan ulang, dan mudah dipahami.
- Hindari abstraksi, dependensi, atau konfigurasi berlebihan.
- Jangan melakukan refactor luas yang tidak diperlukan untuk fase aktif.
- Jalankan pemeriksaan yang relevan dan laporkan perintah serta hasilnya dengan jujur.
- Jangan mengklaim tes/build berhasil jika tidak benar-benar dijalankan.

## 8. Format laporan akhir setiap fase
Sampaikan:
1. Fase yang dikerjakan dan statusnya.
2. Perubahan yang dibuat.
3. File yang dibuat/diubah.
4. Verifikasi yang benar-benar dilakukan beserta hasilnya.
5. Keterbatasan atau pekerjaan yang belum dilakukan.
6. Pertanyaan atau keputusan yang diperlukan.
7. Permintaan persetujuan eksplisit untuk melanjutkan.

## 9. Larangan
- Jangan lanjut ke fase berikutnya secara otomatis.
- Jangan mengubah SOT diam-diam.
- Jangan menyisipkan fitur yang tidak disetujui.
- Jangan mengklaim sistem siap produksi sebelum keamanan, backend, dan deployment diverifikasi.
