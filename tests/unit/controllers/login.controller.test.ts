import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import services from '../../../src/services';
import controllers from '../../../src/controllers';
import { validToken } from '../../mocks/token.mocks';

chai.use(sinonChai);

describe('LoginController', function () {
  context('userLogin should have the correct behavior', function () {
    const req = {} as Request;
    const res = {} as Response;

    beforeEach(function () {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      sinon.restore();
    });

    it('should return the status and data received by the service', async function () {
      sinon
        .stub(services, 'userLogin')
        .resolves({ status: 'SUCCESSFUL', data: { token: validToken } });

      req.body = { username: 'teste', password: 'teste' };

      await controllers.userLogin(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ token: validToken });
    });
  });
});
