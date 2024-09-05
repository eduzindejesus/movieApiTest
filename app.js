const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');
const movieRoutes = require('./routes/movie.routes');
const adminRoutes = require('./routes/admin.routes'); // Importar as rotas de admin
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

require('dotenv').config();
const app = express();

// Conectar ao banco de dados
connectDB();

// Middleware
app.use(express.json());

// Rotas
app.use('/users', userRoutes);
app.use('/movies', movieRoutes);
app.use('/admins', adminRoutes); // Usar as rotas de admin

// Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rota de instalação (populando o banco)
app.get('/install', async (req, res) => {
  // Aqui você pode criar as tabelas e popular com dados iniciais
  res.json({ message: 'Database setup completed' });
});

// Inicialização do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
