import productController from './products.controllers';
import ordersControllers from './orders.controllers';

export default {
  createProduct: productController.createProduct,
  getAllProducts: productController.getAllProducts,
  getAllOrders: ordersControllers.getAllOrders,
};
