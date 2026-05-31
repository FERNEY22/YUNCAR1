require('dotenv').config();
const mongoose = require('mongoose');
const Consult = require('../models/Consult');

async function migrate() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Conectado a MongoDB');

  const result = await Consult.updateMany(
    { lastUpdatedBy: { $exists: false } },
    { $set: { lastUpdatedBy: null } }
  );

  console.log(`Documentos actualizados: ${result.modifiedCount}`);
  await mongoose.disconnect();
  console.log('Migración completada');
}

migrate().catch(err => {
  console.error('Error en migración:', err);
  process.exit(1);
});