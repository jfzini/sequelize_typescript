import productController from './products.controllers';
import ordersControllers from './orders.controllers';
import userControllers from './user.controllers';

export default {
  createProduct: productController.createProduct,
  getAllProducts: productController.getAllProducts,
  getAllOrders: ordersControllers.getAllOrders,
  userLogin: userControllers.userLogin,
};
