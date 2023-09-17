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
    const payload = { username: 'user', password: 'password' };
    it('should return a token', async function () {
      sinon.stub(jwt, 'sign').resolves(validToken); // using .returns() instead of .resolves() will need type casting
      
      const token = await auth.generateToken(payload);
      
      expect(token).to.be.equal(validToken);
    });

    it('jwt.sing() should have been called with the correct arguments', function () {
      sinon.stub(jwt, 'sign');

      const payload = { username: 'user', password: 'password' };

      auth.generateToken(payload);

      expect(auth.secret).to.be.equal(process.env.JWT_SECRET || 'secret');
      expect(jwt.sign).to.have.been.calledWith(payload, auth.secret, {
        expiresIn: '7d',
        algorithm: 'HS256',
      });
    });
  });

  context('verifyToken and jwt should have the correct behavior', function () {
    it('should return the decoded token', async function () {
      sinon.stub(jwt, 'verify').resolves({ username: 'user', password: 'password' });

      const result = await auth.verifyToken(validToken);

      expect(result).to.be.deep.equal({ username: 'user', password: 'password' });
    });

    it('should return null if token is invalid', async function () {
      sinon.stub(jwt, 'verify').throws();

      const result = await auth.verifyToken(validToken);

      expect(result).to.be.null;
    });
  });
});
