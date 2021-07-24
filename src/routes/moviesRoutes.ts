import { Router } from 'express';
import {
  getAllMovies,
  getPaginationMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} from '../controllers/moviesController';
import isAuth from '../middlware/isAuth';
const router: Router = Router();

router.get('/all-movies', isAuth, getAllMovies);

router.post('/add-movie', isAuth, addMovie);

router.post('/edit-movie', isAuth, updateMovie);

router.delete('/delete-movie/:id', isAuth, deleteMovie);

router.post('/pagination-movies', isAuth, getPaginationMovies);

export default router;
