import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';
import auth from '../../../src/auth/token.jwt';
import app from '../../../src/app';
import UserModel from '../../../src/database/models/user.model';
import { mockedUserFromModel } from '../../mocks/user.mocks';
import { validToken } from '../../mocks/token.mocks';

chai.use(chaiHttp);

describe('POST /login', function () {
  beforeEach(function () {
    sinon.restore();
  });
  
  it('should return status 200 and a token if everything is correct', async function () {
    sinon.stub(UserModel, 'findOne').resolves(UserModel.build(mockedUserFromModel));
    sinon.stub(bcrypt, 'compareSync').returns(true);
    const res = await chai.request(app).post('/login').send({
      username: 'Hagar',
      password: 'terrível',
    });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('token');
  });

  it('should return status 401 if can\'t find a user', async function () {
    sinon.stub(UserModel, 'findOne').resolves(null);
    sinon.stub(bcrypt, 'compareSync').returns(true);
    const res = await chai.request(app).post('/login').send({
      username: 'Hagar',
      password: 'terrível',
    });
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('message').equal('Username or password invalid');
  });

  it('should return status 401 if password is incorrect', async function () {
    sinon.stub(UserModel, 'findOne').resolves(UserModel.build(mockedUserFromModel));
    sinon.stub(bcrypt, 'compareSync').returns(false);
    const res = await chai.request(app).post('/login').send({
      username: 'Hagar',
      password: 'terrível',
    });
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('message').equal('Username or password invalid');
  });
});
