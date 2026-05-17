// ==========================================
// YUNCAR Backend - Contact Controller
// POST /api/contact - Recibe lead + notificacion correo
// ==========================================

const { Resend } = require('resend');
const Consult = require('../models/Consult');

// --- Cliente Resend (HTTP API) ---
const resend = new Resend(process.env.RESEND_API_KEY);

// --- Verificación de configuración al arranque ---
if (!process.env.RESEND_API_KEY) {
  console.error('❌ RESEND_API_KEY no configurada');
} else {
  console.log('✅ Resend listo para enviar correos');
}

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

  // 3. Enviar correo de notificación vía Resend HTTP API en segundo plano
    resend.emails.send({
      from: 'YUNCAR Contacto <onboarding@resend.dev>',
      to: process.env.MAIL_TO,
      replyTo: nuevoLead.correo,
      subject: `Nuevo lead: ${nuevoLead.nombre} - ${nuevoLead.servicio || 'Sin servicio especificado'}`,
      text: buildEmailBody(nuevoLead),
    })
      .then(({ data, error }) => {
        if (error) {
          console.error(`⚠️  Error enviando correo (lead ya guardado): ${error.message}`);
        } else {
          console.log(`📧 Correo enviado: ${data.id}`);
        }
      })
      .catch((mailError) => {
        console.error(`⚠️  Error de red enviando correo (lead ya guardado): ${mailError.message}`);
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