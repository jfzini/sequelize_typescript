import ProductModel from '../database/models/product.model';
import { Product, ProductService } from '../types/Product';

const createProduct = async (product: Product): Promise<ProductService> => {
  const newProduct = await ProductModel.create(product);
  const { orderId, ...result } = newProduct.toJSON();
  return { status: 'CREATED', data: result };
};

const getAllProducts = async (): Promise<ProductService> => {
  const rawProducts = await ProductModel.findAll();
  const parsedProducts = rawProducts.map((product) => product.toJSON());
  return { status: 'SUCCESSFUL', data: parsedProducts };
};

export default {
  createProduct,
  getAllProducts,
};
