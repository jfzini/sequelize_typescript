import express from 'express';
import controller from '../controllers';
import middlewares from '../middlewares/products.middlewares';

const ProductsRouter = express.Router();

ProductsRouter.post('/', middlewares.validateFields, controller.createProduct);
ProductsRouter.get('/', controller.getAllProducts);

export default ProductsRouter;
