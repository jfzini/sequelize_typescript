import { NextFunction, Request, Response } from 'express';
import auth from '../auth/token.jwt';

// declaração global para conseguir inserir a propriedade user no objeto Request
// declare global {
//   namespace Express {
//     interface Request {
//       user: {
//         username: string;
//         password: string;
//       };
//     }
//   }
// }
// desabilitado por conta do linter

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
  // req.user = decoded;
  next();
};

export default { validateToken };
