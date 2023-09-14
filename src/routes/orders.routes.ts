import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares/orders.middlewares';
import tokenMiddlewares from '../middlewares/token.middlewares';

const OrdersRouter = express.Router();

OrdersRouter.get('/', controllers.getAllOrders);

OrdersRouter.use(tokenMiddlewares.validateToken);

OrdersRouter.post('/', middlewares.validateCreationFields, controllers.createOrder);

export default OrdersRouter;
