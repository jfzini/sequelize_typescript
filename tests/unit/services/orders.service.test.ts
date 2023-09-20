import { expect } from 'chai';
import sinon from 'sinon';
import OrderModel from '../../../src/database/models/order.model';
import ProductModel from '../../../src/database/models/product.model';
import { getAllOrdersFromModel, getAllOrdersFromService } from '../../mocks/order.mocks';
import services from '../../../src/services';
import db from '../../../src/database/models';

describe('OrdersService', function () {
  context('getAllOrders should have the correct behavior', function () {
    beforeEach(function () {
      sinon.restore();
    });

    it('getAllOrders should return status SUCCESSFUL all orders', async function () {
      sinon.stub(OrderModel, 'findAll').resolves(
        getAllOrdersFromModel.map((order) =>
          OrderModel.build(order, {
            include: [
              {
                model: ProductModel,
                as: 'productIds',
                attributes: ['id'],
              },
            ],
          }),
        ),
      );

      const result = await services.getAllOrders();

      expect(result).to.deep.equal({ status: 'SUCCESSFUL', data: getAllOrdersFromService });
    });

    it('getAllOrders should return status SUCCESSFUL an empty array if there are no orders', async function () {
      sinon.stub(OrderModel, 'findAll').resolves([]);

      const result = await services.getAllOrders();

      expect(result).to.deep.equal({ status: 'SUCCESSFUL', data: [] });
    });
  });

  context('createOrder should have the correct behavior', function () {
    beforeEach(function () {
      sinon.restore();
    });

    it('createOrder should return status CREATED and order when given a valid userId and productIds', async function () {
      sinon.stub(db, 'transaction').resolves();
      sinon.stub(OrderModel, 'create').resolves(OrderModel.build({ id: 1, userId: 1 }));
      sinon.stub(ProductModel, 'update').resolves([1]);

      const result = await services.createOrder(1, [1, 2]);

      expect(result).to.deep.equal({ status: 'CREATED', data: { userId: 1, productIds: [1, 2] } });
    });

    it('createOrder should return status INTERNAL_SERVER_ERROR when given an invalid userId', async function () {
      sinon.stub(db, 'transaction').rejects();
      sinon.stub(OrderModel, 'create').resolves(OrderModel.build({ id: 1, userId: 1 }));
      sinon.stub(ProductModel, 'update').throws();

      const result = await services.createOrder(1, [1, 2]);

      expect(result).to.deep.equal({
        status: 'INTERNAL_SERVER_ERROR',
        data: { message: 'Something went wrong: Error: Error' },
      });
    });
  });
});
