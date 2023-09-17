import { NextFunction, Request, Response } from 'express';
import auth from '../auth/token.jwt';

// global declaration to add user to req
declare global {
  namespace Express {
    interface Request {
      user: {
        username: string;
      };
    }
  }
}

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const [, tokenValue] = token.split(' ');
  const decoded = auth.verifyToken(tokenValue);
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  const { username } = decoded;
  req.user = { username };
  next();
};

export default { validateToken };
