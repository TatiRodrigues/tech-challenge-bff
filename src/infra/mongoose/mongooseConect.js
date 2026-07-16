const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

async function connectDB() {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGO_URL || process.env.DATABASE_URL;
    if (mongoUri) {
      // Conectar ao MongoDB real (Docker ou produção)
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Conectado ao MongoDB');
    } else {
      // Iniciar MongoDB em memória para desenvolvimento local sem Docker
      const mongod = await MongoMemoryServer.create();
      const mongoUri = mongod.getUri();
      await mongoose.connect(mongoUri);
      console.log('Conectado ao MongoDB em memória');
    }
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
  }
}

module.exports = connectDB;