import express from 'express';
import { OrdersRouter, ProductsRouter } from './routes';

const app = express();

app.use(express.json());

app.use('/products', ProductsRouter);
app.use('/orders', OrdersRouter);

export default app;
