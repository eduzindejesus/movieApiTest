const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ }, // Validação de formato de email
  password: { type: String, required: true },
  role: { type: String, default: 'user', enum: ['user', 'admin'] }, // Permitir apenas 'user' ou 'admin'
});

const User = mongoose.model('User', userSchema);
module.exports = User;
