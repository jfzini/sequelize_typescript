import express from 'express';
import { LoginRouter, OrdersRouter, ProductsRouter } from './routes';

const app = express();

app.use(express.json());

app.use('/products', ProductsRouter);
app.use('/orders', OrdersRouter);
app.use('/login', LoginRouter);

export default app;
