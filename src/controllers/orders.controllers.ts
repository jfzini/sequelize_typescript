import { Request, Response } from 'express';
import services from '../services';
import mapStatus from '../utils/statusHTTP';
import { ProductService } from '../types/Product';
import { Service } from '../types/Service';

const getAllOrders = async (_req: Request, res: Response) => {
  const result = await services.getAllOrders();
  return res.status(mapStatus(result.status)).json(result.data);
};

const createOrder = async (req: Request, res: Response) => {
  const { userId, productIds } = req.body;
  const foundUser = await services.getUserById(userId);
  const productsPromises = productIds.map(
    async (productId: number) => services.getProductById(productId),
  );
  const foundProducts = (await Promise.all(productsPromises)) as Service<ProductService>[];
  const productsExist = foundProducts?.every(
    (product: Service<ProductService>) => product.status === 'SUCCESSFUL',
  );
  if (foundUser.status !== 'SUCCESSFUL') {
    return res.status(mapStatus(foundUser.status)).json(foundUser.data);
  }
  if (!productsExist) {
    return res.status(mapStatus('NOT_FOUND')).json({ message: 'Some product was not found' });
  }
  const result = await services.createOrder(userId, productIds);
  return res.status(mapStatus(result.status)).json(result.data);
};

export default { getAllOrders, createOrder };
