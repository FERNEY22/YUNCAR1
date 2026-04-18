// ==========================================
// YUNCAR Backend - Conexión a MongoDB Atlas
// ADR-010: MongoDB + Mongoose
// ==========================================

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
    console.log(`   Base de datos: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ Error al conectar MongoDB: ${error.message}`);
    process.exit(1); // Mata el proceso si falla la conexión
  }
};

module.exports = connectDB;