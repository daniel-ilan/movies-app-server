import { Router } from 'express';
import User from '../models/userModel';
import { IUser } from '../types';
import isAuth from '../middlware/isAuth';
import { getUserPermissionsById } from '../utils/usersHelpers';
import jwt from 'jsonwebtoken';

const router: Router = Router();

router.post('/validate-token', isAuth, async function (req, res) {
  const { userId } = req.body;

  try {
    const user = <IUser>await User.findById(userId);
    if (!user) {
      // There is no such user
      res.status(403).json({
        message: 'Something went wrong please try logging in again',
      });
    } else {
      const { permissions, isAdmin } = getUserPermissionsById(
        userId.toString(),
      );
      const token = jwt.sign(
        { username: user.username, id: userId.toString() },
        'secret',
        { expiresIn: '1h' },
      );
      res.status(200).json({
        isAdmin,
        permissions,
        token,
        id: user._id.toString(),
        username: user.username,
        success: true,
      });
    }
  } catch (error) {
    throw error;
  }
});

export default router;
