// Importa o módulo 'mongoose' para utilizar o MongoDB no projeto
const mongoose = require('mongoose');

// Define uma função assíncrona chamada 'connectDB' que será usada para conectar ao banco de dados MongoDB
const connectDB = async () => {
  try {
    // Tenta conectar ao MongoDB usando a URL de conexão armazenada em 'process.env.MONGO_URI'
    // 'useNewUrlParser' e 'useUnifiedTopology' são opções recomendadas para evitar warnings de depreciação
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,  // Usa o novo parser de URL para o MongoDB (para evitar advertências de versão antiga)
      useUnifiedTopology: true,  // Usa a nova engine de gerenciamento de conexões do MongoDB (para otimização de desempenho)
    });
    // Se a conexão for bem-sucedida, exibe a mensagem 'MongoDB connected' no console
    console.log('MongoDB connected');
  } catch (error) {
    // Caso ocorra um erro na conexão, exibe a mensagem de erro e o próprio erro no console
    console.error('MongoDB connection error:', error);
    // Encerra o processo com falha (status 1) para indicar que o erro é crítico
    process.exit(1);
  }
};

// Exporta a função 'connectDB' para que possa ser utilizada em outros arquivos do projeto
module.exports = connectDB;
