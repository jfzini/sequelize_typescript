import { expect } from 'chai';
import sinon from 'sinon';
import bcrypt from 'bcryptjs';
import UserModel from '../../../src/database/models/user.model';
import { mockedUserFromModel } from '../../mocks/user.mocks';
import services from '../../../src/services';
import auth from '../../../src/auth/token.jwt';
import { validToken } from '../../mocks/token.mocks';

describe('LoginService', function () {
  context('userLogin should have the correct behavior', function () {
    beforeEach(function () {
      sinon.restore();
    });

    it('userLogin should return status SUCESSFUL and token when given a valid username and password', async function () {
      sinon.stub(UserModel, 'findOne').resolves(UserModel.build(mockedUserFromModel));
      sinon.stub(bcrypt, 'compareSync').returns(true);
      sinon.stub(auth, 'generateToken').returns(validToken);

      const result = await services.userLogin('Hagar', 'terrível');

      expect(result).to.deep.equal({ status: 'SUCCESSFUL', data: { token: validToken } });
    });

    it('userLogin should return status UNAUTHORIZED when given an invalid username', async function () {
      sinon.stub(UserModel, 'findOne').resolves(null);
      sinon.stub(bcrypt, 'compareSync').returns(true);
      sinon.stub(auth, 'generateToken').returns(validToken);

      const result = await services.userLogin('Hagar', 'terrível');

      expect(result).to.deep.equal({
        status: 'UNAUTHORIZED',
        data: { message: 'Username or password invalid' },
      });
    });

    it('userLogin should return status UNAUTHORIZED when given an invalid password', async function () {
      sinon.stub(UserModel, 'findOne').resolves(UserModel.build(mockedUserFromModel));
      sinon.stub(bcrypt, 'compareSync').returns(false);
      sinon.stub(auth, 'generateToken').returns(validToken);

      const result = await services.userLogin('Hagar', 'terrível');

      expect(result).to.deep.equal({
        status: 'UNAUTHORIZED',
        data: { message: 'Username or password invalid' },
      });
    });
  });

  context('getUserById should have the correct behavior', function () {
    beforeEach(function () {
      sinon.restore();
    });

    it('getUserById should return status SUCCESSFUL and user when given a valid id', async function () {
      sinon.stub(UserModel, 'findByPk').resolves(UserModel.build(mockedUserFromModel));

      const result = await services.getUserById(1);

      const { password, ...userWithoutPassword } = mockedUserFromModel;

      expect(result).to.deep.equal({ status: 'SUCCESSFUL', data: userWithoutPassword });
    });

    it('getUserById should return status NOT FOUND when given an invalid id', async function () {
      sinon.stub(UserModel, 'findByPk').resolves(null);

      const result = await services.getUserById(1);

      expect(result).to.deep.equal({
        status: 'NOT_FOUND',
        data: { message: '"userId" not found' },
      });
    });
  });
});
