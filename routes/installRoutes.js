const express = require('express');
const router = express.Router();
const db = require('../config/db');
const User = require('../models/user');
const Movie = require('../models/movie');

// Rota para instalar o banco de dados e adicionar dados iniciais
router.get('/install', async (req, res) => {
  try {
    // Sincronizar modelos com o banco de dados
    await db.sync({ force: true });

    // Criar usuário administrador padrão
    const adminUser = await User.create({
      username: 'admin',
      password: 'admin123',
      isAdmin: true
    });

    // Inserir filmes iniciais
    await Movie.bulkCreate([
      { title: 'Matrix', description: 'Filme de ficção científica' },
      { title: 'Inception', description: 'Filme de ficção e mistério' },
      { title: 'Interstellar', description: 'Exploração espacial' },
      { title: 'Avatar', description: 'Um mundo alienígena' },
      { title: 'Titanic', description: 'Romance no famoso navio' }
    ]);

    res.json({ message: 'Instalação realizada com sucesso!', adminUser });
  } catch (error) {
    res.status(500).json({ message: 'Erro na instalação', error });
  }
});

module.exports = router;
