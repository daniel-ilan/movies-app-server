import { Router } from 'express';
import {
  getAllMovies,
  getPaginationMovies,
} from '../controllers/moviesController';
import isAuth from '../middlware/isAuth';
const router: Router = Router();

router.get('/all-movies', isAuth, getAllMovies);

router.post('/pagination-movies', isAuth, getPaginationMovies);

/* router.put("/edit-todo/:id", updateTodo)

router.delete("/delete-todo/:id", deleteTodo) */

export default router;
