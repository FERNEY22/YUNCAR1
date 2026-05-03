// ==========================================
// YUNCAR Backend - Contact Controller
// POST /api/contact - Recibe lead + notificacion correo
// ==========================================

const nodemailer = require('nodemailer');
const Consult = require('../models/Consult');

// --- Transporter SMTP (se crea una vez) ---
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  family: 4,
});

// --- Verificación de conexión SMTP al arranque ---
transporter.verify((error) => {
  if (error) {
    console.error('❌ Error en configuración SMTP:', error.message);
  } else {
    console.log('✅ SMTP listo para enviar correos');
  }
});

// --- Función helper: construir el cuerpo del correo ---
const buildEmailBody = (lead) => `
Nuevo lead recibido en YUNCAR
==============================

Nombre:     ${lead.nombre}
Empresa:    ${lead.empresa || 'No especificada'}
Cargo:      ${lead.cargo || 'No especificado'}
Teléfono:   ${lead.telefono}
Correo:     ${lead.correo}
Zona:       ${lead.zona || 'No especificada'}
Servicio:   ${lead.servicio || 'No especificado'}

Mensaje:
--------
${lead.mensaje}

------------------------------
Recibido: ${lead.creadoEn.toLocaleString('es-CO', { timeZone: 'America/Bogota' })}
ID: ${lead._id}
`;

// --- Controller principal ---
const createContact = async (req, res) => {
  try {
    // 1. Crear y guardar el lead en MongoDB
    const nuevoLead = new Consult(req.body);
    await nuevoLead.save();

    console.log(`📝 Lead guardado: ${nuevoLead._id} - ${nuevoLead.nombre}`);

    // 2. Responder al frontend INMEDIATAMENTE (no esperar al correo)
    res.status(201).json({
      success: true,
      message: 'Consulta recibida correctamente. Te contactaremos pronto.',
      id: nuevoLead._id,
    });

    // 3. Enviar correo de notificación en segundo plano
    transporter.sendMail({
      from: `"YUNCAR Contacto" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: nuevoLead.correo,
      subject: `Nuevo lead: ${nuevoLead.nombre} - ${nuevoLead.servicio || 'Sin servicio especificado'}`,
      text: buildEmailBody(nuevoLead),
    })
      .then((info) => {
        console.log(`📧 Correo enviado: ${info.messageId}`);
      })
      .catch((mailError) => {
        console.error(`⚠️  Error enviando correo (lead ya guardado): ${mailError.message}`);
      });

  } catch (error) {
    // Errores de validación de Mongoose
    if (error.name === 'ValidationError') {
      const errores = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: 'Datos inválidos',
        errors: errores,
      });
    }

    // Cualquier otro error
    console.error('❌ Error en createContact:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    });
  }
};

module.exports = { createContact };