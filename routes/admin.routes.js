const express = require('express');
const {
  createAdmin,
  deleteUser,
  getAdmins,
  updateAdmin
} = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Rota para criar um novo administrador
router.post('/', authMiddleware, createAdmin);

// Rota para excluir um usuário não administrador
router.delete('/:id', authMiddleware, deleteUser);

// Rota para listar todos os administradores
router.get('/', authMiddleware, getAdmins);

// Rota para atualizar um administrador
router.put('/:id', authMiddleware, updateAdmin);

module.exports = router;
