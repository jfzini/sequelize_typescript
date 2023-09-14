import OrderModel from '../database/models/order.model';
import { Service } from '../types/Service';
import { CreateOrder, Order } from '../types/Order';
import ProductModel from '../database/models/product.model';
import db from '../database/models';

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

const createOrder = async (userId: number, productIds: number[]): Promise<Service<CreateOrder>> => {
  try {
    await db.transaction(async (t) => {
      const newOrder = await OrderModel.create({ userId }, { transaction: t });
      const updateProductsPromises = productIds.map(async (productId) => {
        await ProductModel.update(
          { orderId: newOrder.dataValues.id },
          { where: { id: productId }, transaction: t },
        );
      });
      await Promise.all(updateProductsPromises);
    });
    return { status: 'CREATED', data: { userId, productIds } };
  } catch (error) {
    console.error(error);
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Something went wrong' } };
  }
  // const newOrder = await OrderModel.create({ userId });
  // productIds.forEach(async (productId) => {
  //   await ProductModel.update({ orderId: newOrder.dataValues.id }, { where: { id: productId } });
  // });
  // return { status: 'CREATED', data: { userId, productIds } };
};

export default { getAllOrders, createOrder };
