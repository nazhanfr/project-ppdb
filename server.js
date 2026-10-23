import express from 'express'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import multer from 'multer'
import { initDatabase } from './db.js'
import apiRoutes from './routes/api.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const uploadsDir = path.resolve(__dirname, '../uploads')

// Inisialisasi Database SQLite
initDatabase()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Melayani berkas upload secara statis
app.use('/uploads', express.static(uploadsDir))

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'PPDB TPQ Backend API',
    status: 'running',
    timestamp: new Date().toISOString(),
  })
})

// Pasang routes API
app.use('/api', apiRoutes)

// 404 Handler untuk rute yang tidak ditemukan
app.use('/api/*', (req, res) => {
  res.status(404).json({ ok: false, message: 'Endpoint API tidak ditemukan.' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ ok: false, message: 'Ukuran berkas terlalu besar. Maksimal ukuran berkas adalah 2 MB.' })
    }
    return res.status(400).json({ ok: false, message: `Kesalahan unggah berkas: ${err.message}` })
  }

  if (err) {
    console.error('Server error:', err)
    return res.status(400).json({ ok: false, message: err.message || 'Terjadi kesalahan pada server.' })
  }

  next()
})

const server = app.listen(PORT, () => {
  console.log(`[PPDB TPQ Backend] Berjalan di http://localhost:${PORT}`)
})

export { app, server }
