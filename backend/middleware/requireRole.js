// backend/middleware/requireRole.js
// Debe ir después de verifyJWT: usa req.user.role del token

function requireRole(...rolesPermitidos) {
  return function (req, res, next) {
    if (!req.user || !rolesPermitidos.includes(req.user.role)) {
      return res.status(403).json({ error: 'No tiene permisos para realizar esta acción' });
    }
    next();
  };
}

module.exports = requireRole;
