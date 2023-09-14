import productsServices from './products.services';
import ordersServices from './orders.services';
import userServices from './user.services';

export default {
  createProduct: productsServices.createProduct,
  getAllProducts: productsServices.getAllProducts,
  getProductById: productsServices.getProductById,
  getAllOrders: ordersServices.getAllOrders,
  userLogin: userServices.userLogin,
  getUserById: userServices.getUserById,
  createOrder: ordersServices.createOrder,
};
