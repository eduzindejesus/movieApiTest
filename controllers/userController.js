const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { hashPassword, comparePassword } = require('../helpers');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await hashPassword(password);

  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  res.status(201).json({ message: 'User registered successfully' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await comparePassword(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
};


// Atualizar dados do usuário
exports.updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.user.id;

    // Validação dos dados
    const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// Alterar dados do usuário comum (caso os administradores tenham permissão)
exports.updateUserByAdmin = async (req, res) => {
  try {
    const { id } = req.params; // ID do usuário a ser atualizado
    const { name, email } = req.body;

    // Validação dos dados
    const updatedUser = await User.findByIdAndUpdate(id, { name, email }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};
