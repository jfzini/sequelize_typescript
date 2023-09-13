import express from 'express';
import controller from '../controllers';

const ProductsRouter = express.Router();

ProductsRouter.post('/', controller.createProduct);
ProductsRouter.get('/', controller.getAllProducts);

export default ProductsRouter;
