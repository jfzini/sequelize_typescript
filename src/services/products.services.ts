import ProductModel from '../database/models/product.model';
import { Product, ProductService } from '../types/Product';

const createProduct = async (product: Product): Promise<ProductService> => {
  const newProduct = await ProductModel.create(product);
  const { orderId, ...result } = newProduct.toJSON();
  return { status: 'CREATED', data: result };
};

export default {
  createProduct,
};
