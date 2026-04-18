// ==========================================
// YUNCAR Backend - Entry point
// ==========================================

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// --- Inicialización ---
const app = express();
const PORT = process.env.PORT || 3001;

// --- Middlewares globales ---
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// --- Conexión a MongoDB ---
connectDB();

// --- Rutas ---
app.use('/api/health', require('./routes/healthRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// --- Ruta raíz de prueba ---
app.get('/', (req, res) => {
  res.json({
    message: 'YUNCAR Backend API',
    status: 'running',
    timestamp: new Date().toISOString(),
  });
});

// --- Arranque del servidor ---
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`   Entorno: ${process.env.NODE_ENV}`);
  console.log(`   CORS permitido desde: ${process.env.FRONTEND_URL}`);
});