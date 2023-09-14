import OrderModel from '../database/models/order.model';
import { Service } from '../types/Service';
import { CreatedOrder, Order } from '../types/Order';
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

const createOrder = async (
  userId: number,
  productIds: number[],
): Promise<Service<CreatedOrder>> => {
  // console.log('ID DO USUÁRIO', userId);
  // console.log('ID DOS PRODUTOS', productIds);

  // try {
  //   const result = await OrderModel.sequelize?.transaction(async (t) => {
  //     const newOrder = await OrderModel.create({ userId }, { transaction: t });
  //     productIds.forEach(async (productId) => {
  //       await ProductModel.update({ orderId: newOrder.dataValues.id }, { where: { id: productId }, transaction: t });
  //     });
  //     return newOrder;
  //   })
  //   return { status: 'SUCCESSFUL', data: {id: 1, userId: 2} };
  // } catch (error) {
  //   console.error(error);
  //   return { status: 'INTERNAL_SERVER_ERROR', data: { id: 0, userId: 0}}
  // }

  const newOrder = await OrderModel.create({ userId });
  productIds.forEach(async (productId) => {
    await ProductModel.update({ orderId: newOrder.dataValues.id }, { where: { id: productId } });
  });

  return { status: 'CREATED', data: { userId, productIds } };
};

export default { getAllOrders, createOrder };
