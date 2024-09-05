module.exports = {
    secret: process.env.JWT_SECRET || 'supersecretkey', // Use variável de ambiente ou valor padrão
    expiresIn: process.env.JWT_EXPIRES_IN || '1h', // Permitir configuração da expiração via variável de ambiente
  };
  