import { Request, Response } from 'express';
import services from '../services';
import mapStatus from '../utils/statusHTTP';

const getAllOrders = async (_req: Request, res: Response) => {
  const result = await services.getAllOrders();
  return res.status(mapStatus(result.status)).json(result.data);
};

export default { getAllOrders };