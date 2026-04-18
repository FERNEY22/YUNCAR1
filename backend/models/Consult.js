// ==========================================
// YUNCAR Backend - Modelo Consult (Lead)
// estados nuevo/en_gestion/cerrado_ganado/cerrado_perdido
// ==========================================

const mongoose = require('mongoose');

const consultSchema = new mongoose.Schema(
  {
    // --- Datos lead ---
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
      minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
      maxlength: [100, 'El nombre no puede superar 100 caracteres'],
    },
    empresa: {
      type: String,
      trim: true,
      maxlength: [150, 'La empresa no puede superar 150 caracteres'],
    },
    cargo: {
      type: String,
      trim: true,
      maxlength: [100, 'El cargo no puede superar 100 caracteres'],
    },
    telefono: {
      type: String,
      required: [true, 'El teléfono es obligatorio'],
      trim: true,
      match: [/^[0-9+\-\s()]{7,20}$/, 'Formato de teléfono inválido'],
    },
    correo: {
      type: String,
      required: [true, 'El correo es obligatorio'],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Formato de correo inválido'],
    },
    zona: {
      type: String,
      trim: true,
      maxlength: [100, 'La zona no puede superar 100 caracteres'],
    },
    servicio: {
      type: String,
      trim: true,
      maxlength: [100, 'El servicio no puede superar 100 caracteres'],
    },
    mensaje: {
      type: String,
      required: [true, 'El mensaje es obligatorio'],
      trim: true,
      minlength: [10, 'El mensaje debe tener al menos 10 caracteres'],
      maxlength: [2000, 'El mensaje no puede superar 2000 caracteres'],
    },

    // --- Trazabilidad operativa ---
    canal: {
      type: String,
      enum: ['formulario', 'whatsapp', 'manual'],
      default: 'formulario',
    },
    estado: {
      type: String,
      enum: ['nuevo', 'en_gestion', 'cerrado_ganado', 'cerrado_perdido'],
      default: 'nuevo',
    },
    prioridad: {
      type: String,
      enum: ['normal', 'critico'],
      default: 'normal',
    },

    // --- Timestamps operativos ---
    contactadoEn: {
      type: Date,
      default: null,
    },

    // --- Notas internas admin ---
    notas: {
      type: String,
      trim: true,
      maxlength: [1000, 'Las notas no pueden superar 1000 caracteres'],
      default: '',
    },
  },
  {
    // Agrega auto createdAt y updatedAt
    timestamps: { createdAt: 'creadoEn', updatedAt: 'actualizadoEn' },
  }
);

module.exports = mongoose.model('Consult', consultSchema);