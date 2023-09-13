import ProductModel from '../database/models/product.model';
import { Product } from '../types/Product';
import { Service } from '../types/Service';

const createProduct = async (product: Product): Promise<Service<Product>> => {
  const newProduct = await ProductModel.create(product);
  const { orderId, ...result } = newProduct.toJSON();
  return { status: 'CREATED', data: result };
};

const getAllProducts = async (): Promise<Service<Product>> => {
  const rawProducts = await ProductModel.findAll();
  const parsedProducts = rawProducts.map((product) => product.toJSON());
  return { status: 'SUCCESSFUL', data: parsedProducts };
};

export default {
  createProduct,
  getAllProducts,
};
