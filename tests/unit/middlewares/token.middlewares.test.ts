import chai, { expect } from 'chai';
import { Request, Response } from 'express';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import middlewares from '../../../src/middlewares/token.middlewares';
import auth from '../../../src/auth/token.jwt';

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

  context('validateToken works as expected', function () {
    it('should return status UNAUTHORIZED if token is not sent', function () {
      req.headers = {};

      middlewares.validateToken(req, res, next);

      expect(res.status).to.have.been.calledWith(401);
      expect(res.json).to.have.been.calledWith({ message: 'Token not found' });
    });

    it('should return status UNAUTHORIZED if token is invalid', function () {
      req.headers = { authorization: 'thisisnotavalidtoken'};
      sinon.stub(auth, 'verifyToken').returns(null);

      middlewares.validateToken(req, res, next);

      expect(res.status).to.have.been.calledWith(401);
      expect(res.json).to.have.been.calledWith({ message: 'Invalid token' });
    });

    it('should call next if token is valid', function () {
      req.headers = { authorization: 'thiswillbeinterpretedasavalidtoken'};
      sinon.stub(auth, 'verifyToken').returns({ username: 'username', password: 'password'});
      
      middlewares.validateToken(req, res, next);

      expect(req.user).to.be.deep.equal({ username: 'username' });
      expect(next).to.have.been.called;
    });
  });
});