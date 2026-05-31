// scripts/seedUser.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

function parseArgs(argv) {
  const args = {};
  for (const arg of argv.slice(2)) {
    if (arg.startsWith('--')) {
      const [key, ...rest] = arg.slice(2).split('=');
      args[key] = rest.join('=');
    }
  }
  return args;
}

function printUsage() {
  console.log(`
Uso:
  node scripts/seedUser.js --username=<user> --email=<email> --role=<admin|comercial|viewer> [--password=<pass>]

Notas:
  - Si no se pasa --password, se lee de la variable de entorno SEED_PASSWORD.
  - La contraseña debe tener al menos 8 caracteres.
  - Username y email se normalizan a minúsculas automáticamente.

Ejemplo:
  node scripts/seedUser.js --username=ferney --email=ferney@yuncar.com.co --role=admin --password=MiP4ssSegura!
  `);
}

async function seedUser() {
  const args = parseArgs(process.argv);

  const required = ['username', 'email', 'role'];
  const missing = required.filter(k => !args[k]);
  if (missing.length > 0) {
    console.error(`Error: faltan argumentos requeridos: ${missing.join(', ')}`);
    printUsage();
    process.exit(1);
  }

  const password = args.password || process.env.SEED_PASSWORD;
  if (!password) {
    console.error('Error: la contraseña se debe pasar vía --password o variable de entorno SEED_PASSWORD');
    printUsage();
    process.exit(1);
  }

 const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('Error: MONGO_URI no está definido en .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('Conectado a MongoDB Atlas');

    // Validación previa amigable (antes de toparse con E11000 de Mongo)
    const existing = await User.findOne({
      $or: [
        { username: args.username.toLowerCase() },
        { email: args.email.toLowerCase() }
      ]
    });

    if (existing) {
      console.error(`Error: ya existe un usuario con username "${existing.username}" o email "${existing.email}".`);
      process.exit(1);
    }

    const user = new User({
      username: args.username,
      email: args.email,
      role: args.role.toLowerCase(),
      password: password
    });

    await user.save();

    console.log('\nUsuario creado exitosamente:');
    console.log(JSON.stringify(user.toJSON(), null, 2));
    console.log('\nNota: el hash bcrypt está en la DB pero no se muestra por seguridad.');

  } catch (err) {
    if (err.name === 'ValidationError') {
      console.error('Error de validación:');
      for (const field in err.errors) {
        console.error(`  - ${field}: ${err.errors[field].message}`);
      }
    } else if (err.code === 11000) {
      console.error('Error: el username o email ya existe en la base de datos.');
    } else {
      console.error('Error inesperado:', err.message);
    }
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Conexión cerrada');
  }
}

seedUser();