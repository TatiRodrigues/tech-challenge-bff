const mongoose = require('mongoose');

async function connectDB() {
  const mongoUri = process.env.MONGO_URI || process.env.MONGO_URL || process.env.DATABASE_URL;

  if (!mongoUri) {
    console.warn('⚠️  Nenhuma variável MONGO_URI/MONGO_URL definida. Iniciando sem banco de dados.');
    return;
  }

  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
  }
}

module.exports = connectDB;