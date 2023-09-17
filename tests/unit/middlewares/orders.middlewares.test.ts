import chai, { expect } from 'chai';
import { Request, Response } from 'express';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import middlewares from '../../../src/middlewares/orders.middlewares';

chai.use(sinonChai);

describe('Orders Middlewares', function () {
  const req = {} as Request;
  const res = {} as Response;
  const next = sinon.stub();

  beforeEach(function () {
    sinon.restore();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  context('validateUserId works as expected', function () {
    it("should return status BAD REQUEST if userId isn't sent", function () {
      req.body = {};
      middlewares.validadeUserId(req, res, next);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"userId" is required' });
    });

    it("should return status UNPROCESSABLE ENTITY if userId isn't a number", function () {
      req.body = { userId: '1' };
      middlewares.validadeUserId(req, res, next);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"userId" must be a number' });
    });

    it('should call next if userId is a number', function () {
      req.body = { userId: 1 };
      middlewares.validadeUserId(req, res, next);

      expect(next).to.have.been.called;
    });
  });

  context('validateProductIds works as expected', function () {
    it("should return status BAD REQUEST if productIds isn't sent", function () {
      req.body = {};
      middlewares.validateProductIds(req, res, next);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"productIds" is required' });
    });

    it("should return status UNPROCESSABLE ENTITY if productIds isn't an array", function () {
      req.body = { productIds: '1' };
      middlewares.validateProductIds(req, res, next);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"productIds" must be an array' });
    });

    it("should return status UNPROCESSABLE ENTITY if productIds isn't an array of numbers", function () {
      req.body = { productIds: [1, '2'] };
      middlewares.validateProductIds(req, res, next);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"productIds" must include only numbers' });
    });

    it("should return status UNPROCESSABLE ENTITY if productIds an empty array", function () {
      req.body = { productIds: [] };
      middlewares.validateProductIds(req, res, next);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"productIds" must include only numbers' });
    });

    it('should call next if productIds is an array of numbers', function () {
      req.body = { productIds: [1, 2] };
      middlewares.validateProductIds(req, res, next);

      expect(next).to.have.been.called;
    });
  });
});
