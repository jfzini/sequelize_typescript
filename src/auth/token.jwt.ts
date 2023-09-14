import jwt, { SignOptions } from 'jsonwebtoken';

type TokenPayload = {
  username: string;
  password: string;
};

const secret = process.env.JWT_SECRET || 'secret';

const generateToken = (payload: TokenPayload): string => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign(payload, secret, jwtConfig as SignOptions);
  return token;
};

// const verifyToken = (token: string): TokenPayload => {
//   const decoded = jwt.verify(token, secret) as TokenPayload;
//   return decoded;
// };

export default { generateToken };
