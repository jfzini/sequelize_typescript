import productsServices from './products.services';
import ordersServices from './orders.services';

export default {
  createProduct: productsServices.createProduct,
  getAllProducts: productsServices.getAllProducts,
  getAllOrders: ordersServices.getAllOrders,
};
