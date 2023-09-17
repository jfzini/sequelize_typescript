import chai, { expect } from 'chai';
import { Request, Response } from 'express';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import middlewares from '../../../src/middlewares/products.middlewares';

chai.use(sinonChai);

describe('Products Middlewares', function () {

  const req = {} as Request;
  const res = {} as Response;
  const next = sinon.stub();

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  context('validateName works as expected', function () {
    it("should return status BAD REQUEST if name isn't sent", function () {
      req.body = {};
      middlewares.validateName(req, res, next);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });

    it("should return status UNPROCESSABLE ENTITY if name isn't a string", function () {
      req.body = { name: 1 };
      middlewares.validateName(req, res, next);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" must be a string' });
    });

    it('should return status UNPROCESSABLE ENTITY if name length is less than 3', function () {
      req.body = { name: 'ab' };
      middlewares.validateName(req, res, next);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"name" length must be at least 3 characters long',
      });
    });

    it('should call next if name is valid', function () {
      req.body = { name: 'abc' };
      middlewares.validateName(req, res, next);

      expect(next).to.have.been.called;
    });
  });

  context('validatePrice works as expected', function () {
    it("should return status BAD REQUEST if price isn't sent", function () {
      req.body = {};
      middlewares.validatePrice(req, res, next);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"price" is required' });
    });

    it("should return status UNPROCESSABLE ENTITY if price isn't a string", function () {
      req.body = { price: 1 };
      middlewares.validatePrice(req, res, next);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"price" must be a string' });
    });

    it('should return status UNPROCESSABLE ENTITY if price length is less than 3', function () {
      req.body = { price: 'ab' };
      middlewares.validatePrice(req, res, next);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"price" length must be at least 3 characters long',
      });
    });

    it('should call next if price is valid', function () {
      req.body = { price: 'abc' };
      middlewares.validatePrice(req, res, next);

      expect(next).to.have.been.called;
    });
  });
});