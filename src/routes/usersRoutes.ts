import { Router } from 'express';
import {
  getAllUsers,
  addUser,
  deleteUser,
  updateUser,
} from '../controllers/usersController';
import isAuth from '../middlware/isAuth';
const router: Router = Router();

router.post('/all-users', isAuth, getAllUsers);

router.post('/add-user', isAuth, addUser);

router.post('/update-user', isAuth, updateUser);

router.post('/delete-user', isAuth, deleteUser);

export default router;
