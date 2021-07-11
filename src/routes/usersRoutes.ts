import { Router } from 'express';
import { getPaginationUsers, addUser } from '../controllers/usersController';
import isAuth from '../middlware/isAuth';
const router: Router = Router();

router.post('/pagination-users', isAuth, getPaginationUsers);

router.post('/add-user', isAuth, addUser);

export default router;
