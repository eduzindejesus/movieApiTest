const express = require('express');
const { getMovies, addMovie, updateMovie, deleteMovie } = require('../controllers/movieController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getMovies); // Rota para listar filmes
router.get('/rating', getMoviesByRating); // Nova rota para filtrar filmes por avaliação
router.post('/', authMiddleware, addMovie);
router.put('/:id', authMiddleware, updateMovie);
router.delete('/:id', authMiddleware, deleteMovie);

module.exports = router;
