import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import OrderModel from '../../../src/database/models/order.model';
import ProductModel from '../../../src/database/models/product.model';
import { getAllOrdersFromModel, getAllOrdersFromService } from '../../mocks/order.mocks';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('GET /orders', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('should return 200 and an array of orders', async function () {
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
    const res = await chai.request(app).get('/orders').send();
    expect(res).to.have.status(200);
    expect(res.body).to.be.deep.equal(getAllOrdersFromService);
  });
});
