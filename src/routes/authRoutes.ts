import { Router } from 'express';
import { signUp, login } from '../controllers/authController';

const router: Router = Router();

router.post('/login', login);

router.post('/signup', signUp);

export default router;
