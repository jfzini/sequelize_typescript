import chai, { expect } from 'chai';
import { Request, Response } from 'express';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import middlewares from '../../../src/middlewares/user.middlewares';

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

  context('validateLoginFields works as expected', function () {
    it("should return status BAD REQUEST if username isn't sent", function () {
      req.body = { password: 'password' };
      middlewares.validateLoginFields(req, res, next);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: '"username" and "password" are required',
      });
    });

    it("should return status BAD REQUEST if password isn't sent", function () {
      req.body = { username: 'username' };
      middlewares.validateLoginFields(req, res, next);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: '"username" and "password" are required',
      });
    });

    it('should call next if username and password are sent', function () {
      req.body = { username: 'username', password: 'password' };
      middlewares.validateLoginFields(req, res, next);

      expect(next).to.have.been.called;
    });
  });
});
