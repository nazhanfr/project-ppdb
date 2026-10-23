import { DatabaseSync } from 'node:sqlite'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import bcrypt from 'bcryptjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.resolve(__dirname, '../data')
const uploadsDir = path.resolve(__dirname, '../uploads')

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

const dbPath = path.join(dataDir, 'ppdb.db')
export const db = new DatabaseSync(dbPath)

// Mengaktifkan foreign keys
db.exec('PRAGMA foreign_keys = ON;')

export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('admin', 'wali')),
      phone TEXT,
      created_at TEXT DEFAULT (datetime('now', 'localtime'))
    );

    CREATE TABLE IF NOT EXISTS applicants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      registration_number TEXT UNIQUE,
      full_name TEXT NOT NULL,
      nickname TEXT,
      gender TEXT CHECK(gender IN ('Laki-laki', 'Perempuan', '')),
      birth_place TEXT,
      birth_date TEXT,
      school TEXT,
      address TEXT,
      guardian_name TEXT,
      guardian_relation TEXT,
      guardian_phone TEXT,
      guardian_email TEXT,
      status TEXT NOT NULL DEFAULT 'Draft' CHECK(status IN ('Draft', 'Dikirim', 'Sedang Ditinjau', 'Perlu Perbaikan', 'Diterima', 'Ditolak')),
      review_notes TEXT,
      submitted_at TEXT,
      created_at TEXT DEFAULT (datetime('now', 'localtime')),
      updated_at TEXT DEFAULT (datetime('now', 'localtime')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      applicant_id INTEGER NOT NULL,
      doc_type TEXT NOT NULL,
      file_name TEXT NOT NULL,
      file_path TEXT NOT NULL,
      file_size INTEGER NOT NULL,
      mime_type TEXT NOT NULL,
      verification_status TEXT DEFAULT 'Belum Diperiksa' CHECK(verification_status IN ('Belum Diperiksa', 'Valid', 'Tidak Valid', 'Perlu Perbaikan')),
      verification_notes TEXT,
      uploaded_at TEXT DEFAULT (datetime('now', 'localtime')),
      FOREIGN KEY (applicant_id) REFERENCES applicants(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS status_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      applicant_id INTEGER NOT NULL,
      old_status TEXT,
      new_status TEXT NOT NULL,
      actor_name TEXT NOT NULL,
      note TEXT,
      created_at TEXT DEFAULT (datetime('now', 'localtime')),
      FOREIGN KEY (applicant_id) REFERENCES applicants(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS announcements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      is_published INTEGER DEFAULT 1,
      author TEXT DEFAULT 'Pengelola PPDB',
      created_at TEXT DEFAULT (datetime('now', 'localtime')),
      updated_at TEXT DEFAULT (datetime('now', 'localtime'))
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      type TEXT DEFAULT 'info' CHECK(type IN ('info', 'success', 'warning', 'danger')),
      is_read INTEGER DEFAULT 0,
      link TEXT,
      created_at TEXT DEFAULT (datetime('now', 'localtime')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, is_read);
  `)

  seedInitialData()
}

function seedInitialData() {
  // Cek apakah admin sudah ada
  const checkAdmin = db.prepare('SELECT id FROM users WHERE role = ?').get('admin')
  if (!checkAdmin) {
    const adminPasswordHash = bcrypt.hashSync('admin123', 10)
    db.prepare(`
      INSERT INTO users (name, email, password_hash, role, phone)
      VALUES (?, ?, ?, ?, ?)
    `).run('Admin Demo Pengelola', 'admin@demo.local', adminPasswordHash, 'admin', '081234567890')

    const waliPasswordHash = bcrypt.hashSync('wali123', 10)
    const waliRes = db.prepare(`
      INSERT INTO users (name, email, password_hash, role, phone)
      VALUES (?, ?, ?, ?, ?)
    `).run('Orang Tua Santri Demo', 'wali@demo.local', waliPasswordHash, 'wali', '089876543210')

    // Tambah contoh pendaftar demo awal
    const appRes = db.prepare(`
      INSERT INTO applicants (
        user_id, registration_number, full_name, nickname, gender, birth_place, birth_date,
        school, address, guardian_name, guardian_relation, guardian_phone, guardian_email,
        status, review_notes, submitted_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      waliRes.lastInsertRowid,
      'TPQ-2026-DEMO01',
      'Muhammad Rayhan Pratama',
      'Rayhan',
      'Laki-laki',
      'Surabaya',
      '2018-05-12',
      'TK Al-Ihsan',
      'Jl. Melati No. 45, RT 02/RW 03',
      'Orang Tua Santri Demo',
      'Ayah',
      '089876543210',
      'wali@demo.local',
      'Dikirim',
      'Dokumen sedang menunggu pemeriksaan pengelola.',
      new Date().toISOString()
    )

    db.prepare(`
      INSERT INTO status_logs (applicant_id, old_status, new_status, actor_name, note)
      VALUES (?, ?, ?, ?, ?)
    `).run(appRes.lastInsertRowid, 'Draft', 'Dikirim', 'Orang Tua Santri Demo', 'Pendaftaran berhasil dikirim oleh wali santri.')
  }

  // Cek settings awal
  const checkSettings = db.prepare('SELECT key FROM settings WHERE key = ?').get('public_info')
  const defaultInfo = {
    period: 'Tahun Ajaran 2026/2027',
    requirements: '1. Usia calon santri minimal 5 tahun.\n2. Mengisi formulir pendaftaran santri baru.\n3. Melampirkan Kartu Keluarga (KK) dan Akta Kelahiran.\n4. Pas foto santri terbaru.',
    schedule: 'Gelombang I: Pendaftaran online dibuka setiap hari.\nVerifikasi berkas fisik: Senin - Sabtu (08.00 - 15.00 WIB).',
    contact: 'Sekretariat TPQ Nurul Ikhsan: (021) 8876-5432 / info@tpqnurulikhsan.sch.id / WA: 0812-3456-7890',
    registrationOpen: true,
    quota: 60,
  }
  if (!checkSettings) {
    db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run('public_info', JSON.stringify(defaultInfo))
  }

  // Cek pengumuman awal
  const checkAnnounce = db.prepare('SELECT id FROM announcements LIMIT 1').get()
  if (!checkAnnounce) {
    db.prepare(`
      INSERT INTO announcements (title, content, is_published, author)
      VALUES (?, ?, 1, ?)
    `).run(
      'Penerimaan Santri Baru TPQ Nurul Ikhsan Dibuka',
      'Pendaftaran calon santri baru TPQ Nurul Ikhsan tahun ajaran 2026/2027 telah dibuka secara daring. Mari wujudkan generasi Qur\'ani yang berakhlakul karimah, fasih membaca Al-Qur\'an, dan mencintai sunnah Rasulullah SAW.',
      'Panitia PPDB TPQ Nurul Ikhsan'
    )
  }

  // Cek notifikasi demo
  const checkNotif = db.prepare('SELECT id FROM notifications LIMIT 1').get()
  if (!checkNotif) {
    const wali = db.prepare('SELECT id FROM users WHERE email = ?').get('wali@demo.local')
    if (wali) {
      db.prepare(`
        INSERT INTO notifications (user_id, title, message, type, is_read, link)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(
        wali.id,
        'Pendaftaran Berhasil Dikirim',
        'Pendaftaran santri Muhammad Rayhan Pratama (TPQ-2026-DEMO01) telah berhasil dikirim. Menunggu verifikasi berkas oleh pengelola TPQ.',
        'success',
        0,
        '/dashboard'
      )
      db.prepare(`
        INSERT INTO notifications (user_id, title, message, type, is_read, link)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(
        wali.id,
        'Ahlan wa Sahlan di PPDB TPQ',
        'Akun wali santri Anda telah aktif. Pantau status dan informasi pendaftaran santri baru melalui portal ini.',
        'info',
        1,
        '/dashboard'
      )
    }

    const admin = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@demo.local')
    if (admin) {
      db.prepare(`
        INSERT INTO notifications (user_id, title, message, type, is_read, link)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(
        admin.id,
        'Berkas Pendaftar Baru Masuk',
        'Santri Muhammad Rayhan Pratama (TPQ-2026-DEMO01) telah mengirim formulir pendaftaran. Silakan periksa berkas di panel admin.',
        'info',
        0,
        '/admin'
      )
    }
  }
}

