import productsServices from './products.services';
import ordersServices from './orders.services';
import userServices from './user.services';

export default {
  createProduct: productsServices.createProduct,
  getAllProducts: productsServices.getAllProducts,
  getAllOrders: ordersServices.getAllOrders,
  userLogin: userServices.userLogin,
};
