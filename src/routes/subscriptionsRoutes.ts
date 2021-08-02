import { Router } from 'express';
import isAuth from '../middlware/isAuth';
import {
  getAllSubscriptions,
  addSubscription,
} from '../controllers/subscriptionsController';

const router: Router = Router();

router.get('/all-subscriptions', isAuth, getAllSubscriptions);

router.post('/add-subscription', isAuth, addSubscription);

export default router;
