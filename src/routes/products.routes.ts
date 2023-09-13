import express from 'express';
import controller from '../controllers';

const ProductsRouter = express.Router();

ProductsRouter.post('/', controller.createProduct);

export default ProductsRouter;
