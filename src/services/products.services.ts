import ProductModel from '../database/models/product.model';
import { Product, ProductService } from '../types/Product';
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

const getProductById = async (id: number): Promise<Service<ProductService>> => {
  const rawProduct = await ProductModel.findByPk(id);
  const parsedProduct = rawProduct?.toJSON();
  if (parsedProduct) {
    return { status: 'SUCCESSFUL', data: parsedProduct };
  }
  return { status: 'NOT_FOUND', data: { message: '"productId" not found' } };
};

export default {
  createProduct,
  getAllProducts,
  getProductById,
};
