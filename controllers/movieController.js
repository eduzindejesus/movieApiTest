const Movie = require('../models/movie');

// Listar filmes com paginação
exports.getMovies = async (req, res) => {
  const { limit = 10, page = 1 } = req.query; // Parâmetros de limite e página
  const skip = (page - 1) * limit; // Calcular o número de registros a serem pulados

  try {
    const movies = await Movie.find()
      .limit(parseInt(limit)) // Limitar a quantidade de filmes
      .skip(skip); // Pular os filmes anteriores

    const totalMovies = await Movie.countDocuments(); // Contar o total de filmes
    res.json({
      total: totalMovies,
      page: parseInt(page),
      limit: parseInt(limit),
      movies,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar filmes', error });
  }
};


// Adicionar filme
exports.addMovie = async (req, res) => {
  try {
    const { title, director, year, genre } = req.body;

    // Validação dos dados
    if (!title || !director || !year || !genre) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const movie = new Movie({ title, director, year, genre });
    await movie.save();

    res.status(201).json({ message: 'Movie added successfully', movie });
  } catch (error) {
    res.status(500).json({ message: 'Error adding movie', error: error.message });
  }
};

// Atualizar filme
exports.updateMovie = async (req, res) => {
  try {
    const { title, director, year, genre } = req.body;
    const { id } = req.params;

    // Validação dos dados
    if (!title || !director || !year || !genre) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const updatedMovie = await Movie.findByIdAndUpdate(id, { title, director, year, genre }, { new: true });

    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json({ message: 'Movie updated successfully', movie: updatedMovie });
  } catch (error) {
    res.status(500).json({ message: 'Error updating movie', error: error.message });
  }
};

// Filtrar filmes com base em uma avaliação mínima
exports.getMoviesByRating = async (req, res) => {
    const { minRating } = req.query; // Parâmetro para a avaliação mínima
  
    try {
      const movies = await Movie.find({ rating: { $gte: minRating } }); // Filtra filmes com rating maior ou igual
      res.json(movies);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao filtrar filmes', error });
    }
  };

// Excluir filme
exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting movie', error: error.message });
  }
};
