import { Request, Response } from 'express';
import services from '../services';
import mapStatus from '../utils/statusHTTP';

const createProduct = async (req: Request, res: Response) => {
  const result = await services.createProduct(req.body);
  return res.status(mapStatus(result.status)).json(result.data);
};

const getAllProducts = async (_req: Request, res: Response) => {
  const result = await services.getAllProducts();
  return res.status(mapStatus(result.status)).json(result.data);
};

export default {
  createProduct,
  getAllProducts,
};
