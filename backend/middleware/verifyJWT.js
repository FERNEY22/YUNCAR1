// backend/middleware/verifyJWT.js
const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token de autenticación requerido' });
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Formato de autorización inválido' });
  }

  const token = authHeader.substring(7); // quita el prefijo "Bearer "

  if (!token) {
    return res.status(401).json({ error: 'Token de autenticación requerido' });
  }

  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET no está definido en .env');
    return res.status(500).json({ error: 'Error de configuración del servidor' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: decoded.userId,
      username: decoded.username,
      role: decoded.role
    };
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado, debe iniciar sesión nuevamente' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token inválido' });
    }
    console.error('Error verificando token:', err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = verifyJWT;
