// ==========================================
// YUNCAR Backend - Contact Routes
// POST /api/contact  → público (formulario del sitio)
// GET  /api/contact  → protegido (panel admin)
// ==========================================

const express = require('express');
const { createContact, getAllContacts } = require('../controllers/contactController');
const verifyJWT = require('../middleware/verifyJWT');

const router = express.Router();

// Ruta pública - cualquier visitante puede enviar el formulario
router.post('/', createContact);

// Ruta protegida - requiere JWT válido
router.get('/', verifyJWT, getAllContacts);

module.exports = router;
