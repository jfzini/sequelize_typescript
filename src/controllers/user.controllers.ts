import { Request, Response } from 'express';
import services from '../services';
import mapStatus from '../utils/statusHTTP';

const userLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const result = await services.userLogin(username, password);
  
  return res.status(mapStatus(result.status)).json(result.data);
};

export default { userLogin };