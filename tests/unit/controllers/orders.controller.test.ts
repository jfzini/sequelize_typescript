import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import services from '../../../src/services';
import controllers from '../../../src/controllers';
import { createdOrderFromService, getAllOrdersFromService } from '../../mocks/order.mocks';
import { mockedUserFromModel } from '../../mocks/user.mocks';
import { resCreatedProduct } from '../../mocks/products.mocks';

chai.use(sinonChai);

describe('OrdersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  context('getAllOrders should have the correct behavior', function () {
    it('should return the status and data received by the service', async function () {
      sinon
        .stub(services, 'getAllOrders')
        .resolves({ status: 'SUCCESSFUL', data: getAllOrdersFromService });

      await controllers.getAllOrders(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(getAllOrdersFromService);
    });
  });

  context('createOrder should have the correct behavior', function () {
    it('should return status CREATED and the data received by the service if everything is correct', async function () {
      const { password, ...userWithoutPassword } = mockedUserFromModel;
      sinon
        .stub(services, 'getUserById')
        .resolves({ status: 'SUCCESSFUL', data: userWithoutPassword });
      sinon
        .stub(services, 'getProductById')
        .resolves({ status: 'SUCCESSFUL', data: resCreatedProduct });
      sinon
        .stub(services, 'createOrder')
        .resolves({ status: 'CREATED', data: createdOrderFromService });

      req.body = { userId: 1, productIds: [1, 2] };

      await controllers.createOrder(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(createdOrderFromService);
    });

    it('should return status NOT_FOUND if the user does not exist', async function () {
      sinon
        .stub(services, 'getUserById')
        .resolves({ status: 'NOT_FOUND', data: { message: '"userId" not found' } });

      req.body = { userId: 1, productIds: [1, 2] };

      await controllers.createOrder(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: '"userId" not found' });
    });

    it('should return status NOT_FOUND if some product does not exist', async function () {
      const { password, ...userWithoutPassword } = mockedUserFromModel;
      sinon
        .stub(services, 'getUserById')
        .resolves({ status: 'SUCCESSFUL', data: userWithoutPassword });
      sinon
        .stub(services, 'getProductById')
        .resolves({ status: 'NOT_FOUND', data: { message: '"productId" not found' } });

      req.body = { userId: 1, productIds: [1, 2] };

      await controllers.createOrder(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Some product was not found' });
    });
  });
});
