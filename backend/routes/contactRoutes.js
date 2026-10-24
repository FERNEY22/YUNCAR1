// ==========================================
// YUNCAR Backend - Contact Routes
// POST  /api/contact      → público (formulario)
// GET   /api/contact      → protegido (panel admin)
// PATCH /api/contact/:id  → protegido (actualizar estado/notas)
// ==========================================

const express = require('express');
const { createContact, getAllContacts, updateContact } = require('../controllers/contactController');
const verifyJWT = require('../middleware/verifyJWT');
const requireRole = require('../middleware/requireRole');

const router = express.Router();

// Ruta pública - cualquier visitante puede enviar el formulario
router.post('/', createContact);

// Rutas protegidas - requieren JWT válido
router.get('/', verifyJWT, getAllContacts);
router.patch('/:id', verifyJWT, requireRole('admin', 'comercial'), updateContact);

module.exports = router;