const mongoose = require('mongoose');

// Falha rápida: sem isso, queries ficam em buffer esperando conexão que nunca vem
mongoose.set('bufferCommands', false);

async function connectDB() {
  const mongoUri = process.env.MONGO_URI || process.env.MONGO_URL || process.env.DATABASE_URL;

  if (!mongoUri) {
    console.warn('⚠️  Nenhuma variável MONGO_URI/MONGO_URL definida. Iniciando sem banco de dados.');
    return;
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
  }
}

module.exports = connectDB;