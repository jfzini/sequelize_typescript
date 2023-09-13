import express from 'express';
import controllers from '../controllers';

const OrdersRouter = express.Router();

OrdersRouter.get('/', controllers.getAllOrders);

export default OrdersRouter;
