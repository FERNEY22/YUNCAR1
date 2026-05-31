const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_TTL = process.env.JWT_TTL || '8h';

async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: 'Username y password son requeridos'
      });
    }

    // Incluir explícitamente el campo password (oculto por defecto en el schema)
    const user = await User.findOne({
      username: username.toLowerCase().trim()
    }).select('+password');

    // Mensaje genérico: no revela si el problema fue usuario inexistente, inactivo o password mal
    const invalidCredentials = () =>
      res.status(401).json({ error: 'Credenciales inválidas' });

    if (!user) return invalidCredentials();
    if (!user.isActive) return invalidCredentials();

    const passwordMatches = await user.comparePassword(password);
    if (!passwordMatches) return invalidCredentials();

    // Actualizar lastLoginAt (pre-save no re-hashea porque password no fue modificado)
    user.lastLoginAt = new Date();
    await user.save();

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET no está definido en .env');
      return res.status(500).json({ error: 'Error de configuración del servidor' });
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: JWT_TTL }
    );

    return res.status(200).json({
      token,
      user: user.toJSON()
    });

  } catch (err) {
    console.error('Error en login:', err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = { login };

