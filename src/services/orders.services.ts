import OrderModel from '../database/models/order.model';
import { Service } from '../types/Service';
import { Order } from '../types/Order';
import ProductModel from '../database/models/product.model';

const getAllOrders = async (): Promise<Service<Order>> => {
  const rawOrders = await OrderModel.findAll({
    include: [
      {
        model: ProductModel,
        as: 'productIds',
        attributes: ['id'],
      },
    ],
  });
  
  const parsedOrders = rawOrders.map((order) => order.toJSON());

  const resultOrders = parsedOrders.map((order) => {
    const productIds = (order.productIds as { id: number }[]).map((product) => product.id);
    return { ...order, productIds };
  });

  return { status: 'SUCCESSFUL', data: resultOrders };
};

export default { getAllOrders };
