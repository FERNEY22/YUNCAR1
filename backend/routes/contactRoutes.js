// ==========================================
// YUNCAR Backend - Contact Routes
// POST  /api/contact      → público (formulario)
// GET   /api/contact      → protegido (panel admin)
// PATCH /api/contact/:id  → protegido (actualizar estado/notas)
// ==========================================

const express = require('express');
const { createContact, getAllContacts, updateContact } = require('../controllers/contactController');
const verifyJWT = require('../middleware/verifyJWT');

const router = express.Router();

// Ruta pública - cualquier visitante puede enviar el formulario
router.post('/', createContact);

// Rutas protegidas - requieren JWT válido
router.get('/', verifyJWT, getAllContacts);
router.patch('/:id', verifyJWT, updateContact);

module.exports = router;