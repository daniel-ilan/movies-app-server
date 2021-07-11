import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.get('Authorization').split(' ')[1];

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'secret');
  } catch (error) {
    console.log(error);
    return res.status(401).send();
  }
  if (!decodedToken) {
    throw new Error('Not authenticated!');
  }
  req['userId'] = decodedToken.userId;
  return next();
};

export default isAuth;
