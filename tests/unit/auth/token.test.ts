import chai, { expect } from 'chai';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import auth from '../../../src/auth/token.jwt';
import { validToken } from '../../mocks/token.mocks';

describe('Token', function () {
  beforeEach(function () {
    sinon.restore();
  });

  context('generateToken and jwt should have the correct behavior', function () {
    const payload = { username: 'user', password: 'pass' };
    it('should return a token', async function () {
      sinon.stub(jwt, 'sign').resolves(validToken); // using .returns() instead of .resolves() will need type casting
      
      const token = await auth.generateToken(payload);
      
      expect(token).to.be.equal(validToken);
    });

    it('jwt.sing() should have been called with the correct arguments', function () {
      sinon.stub(jwt, 'sign');

      const payload = { username: 'user', password: 'pass' };

      auth.generateToken(payload);

      expect(auth.secret).to.be.equal(process.env.JWT_SECRET || 'secret');
      expect(jwt.sign).to.have.been.calledWith(payload, auth.secret, {
        expiresIn: '7d',
        algorithm: 'HS256',
      });
    });
  });
});
