import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import services from '../../../src/services';
import controllers from '../../../src/controllers';
import { resCreatedProduct } from '../../mocks/products.mocks';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  context('createProduct should have the correct behavior', function () {
    it('should return the status and data received by the service', async function () {
      sinon
        .stub(services, 'createProduct')
        .resolves({ status: 'CREATED', data: resCreatedProduct });

      await controllers.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(resCreatedProduct);
    });
  });

  context('getAllProducts should have the correct behavior', function () {
    it('should return the status and data received by the service', async function () {
      sinon
        .stub(services, 'getAllProducts')
        .resolves({ status: 'SUCCESSFUL', data: [resCreatedProduct] });

      await controllers.getAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([resCreatedProduct]);
    });
  });

});
