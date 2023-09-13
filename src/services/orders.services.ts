import OrderModel from '../database/models/order.model';
import { Service } from '../types/Service';
import { Order } from '../types/Order';

const getAllOrders = async (): Promise<Service<Order>> => {
  const rawOrders = await OrderModel.findAll();
  const parsedOrders = rawOrders.map((order) => order.toJSON());
  return { status: 'SUCCESSFUL', data: parsedOrders };
};
