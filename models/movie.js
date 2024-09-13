const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  year: { type: Number, required: true, min: 1888 }, // O primeiro filme foi feito em 1888
  genre: { type: String, required: true },
  rating: { type: Number, default: 0, min: 0, max: 10 }, // Avaliação entre 0 e 10
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referência ao usuário
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
