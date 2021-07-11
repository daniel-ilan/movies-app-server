import { Router } from 'express';

import isAuth from '../middlware/isAuth';

const router: Router = Router();

router.post('/validate-token', isAuth, function (req, res) {
  const token = req.get('Authorization').split(' ')[1];
  res.status(200).json({ token: token, success: true });
});

export default router;
