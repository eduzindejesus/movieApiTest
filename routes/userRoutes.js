const express = require('express');
const { register, login, updateUser } = require('../controllers/userController');
const { validateUserRegistration, validateUserUpdate } = require('../middlewares/validationMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', validateUserRegistration, register);
router.post('/login', login);
router.put('/update', authMiddleware, validateUserUpdate, updateUser);

module.exports = router;
