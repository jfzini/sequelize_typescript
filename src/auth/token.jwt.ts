import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

type TokenPayload = {
  username: string;
  password: string;
};

const secret = process.env.JWT_SECRET || 'secret';

const generateToken = (payload: TokenPayload): string => {
  const jwtConfig: SignOptions = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

const verifyToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, secret) as TokenPayload; 
    return decoded;
  } catch (error) {
    return null;
  }
};

export default { generateToken, verifyToken, secret };
