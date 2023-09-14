import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import OrderModel from '../../../src/database/models/order.model';
import ProductModel from '../../../src/database/models/product.model';
import app from '../../../src/app';
import { validToken } from '../../mocks/token.mocks';
import UserModel from '../../../src/database/models/user.model';
import { mockedUserFromModel } from '../../mocks/user.mocks';
import { productMock } from '../../mocks/products.mocks';

chai.use(chaiHttp);

describe('POST /orders', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('should return 201 and the created order', async function () {
    sinon.stub(OrderModel, 'create').resolves(OrderModel.build({ id: 1, userId: 1 }));
    sinon.stub(ProductModel, 'update').resolves([1]);
    sinon.stub(UserModel, 'findByPk').resolves(UserModel.build(mockedUserFromModel));
    sinon.stub(ProductModel, 'findByPk').resolves(ProductModel.build(productMock));

    const res = await chai
      .request(app)
      .post('/orders')
      .set({ Authorization: `Bearer ${validToken}` })
      .send({ userId: 1, productIds: [1, 2] });

    expect(res).to.have.status(201);
    expect(res.body).to.deep.equal({ userId: 1, productIds: [1, 2] });
  });

  it('should return 401 if a token is not sent', async function () {
    sinon.stub(OrderModel, 'create').resolves(OrderModel.build({ id: 1, userId: 1 }));
    sinon.stub(ProductModel, 'update').resolves([1]);
    sinon.stub(UserModel, 'findByPk').resolves(UserModel.build(mockedUserFromModel));
    sinon.stub(ProductModel, 'findByPk').resolves(ProductModel.build(productMock));

    const res = await chai
      .request(app)
      .post('/orders')
      .send({ userId: 1, productIds: [1, 2] });

    expect(res).to.have.status(401);
    expect(res.body).to.deep.equal({ message: 'Token not found' });
  });

  it('should return 401 if a token is not valid', async function () {
    sinon.stub(OrderModel, 'create').resolves(OrderModel.build({ id: 1, userId: 1 }));
    sinon.stub(ProductModel, 'update').resolves([1]);
    sinon.stub(UserModel, 'findByPk').resolves(UserModel.build(mockedUserFromModel));
    sinon.stub(ProductModel, 'findByPk').resolves(ProductModel.build(productMock));

    const res = await chai
      .request(app)
      .post('/orders')
      .set({ Authorization: `Bearer 12312131213` })
      .send({ userId: 1, productIds: [1, 2] });

    expect(res).to.have.status(401);
    expect(res.body).to.deep.equal({ message: 'Invalid token' });
  });

  it('should return 404 if user is not found', async function () {
    sinon.stub(OrderModel, 'create').resolves(OrderModel.build({ id: 1, userId: 1 }));
    sinon.stub(ProductModel, 'update').resolves([1]);
    sinon.stub(UserModel, 'findByPk').resolves(null);
    sinon.stub(ProductModel, 'findByPk').resolves(ProductModel.build(productMock));

    const res = await chai
      .request(app)
      .post('/orders')
      .set({ Authorization: `Bearer ${validToken}` })
      .send({ userId: 1, productIds: [1, 2] });

    expect(res).to.have.status(404);
    expect(res.body).to.have.property('message').equal('"userId" not found');
  });

  it('should return 404 if productId is not found', async function () {
    sinon.stub(OrderModel, 'create').resolves(OrderModel.build({ id: 1, userId: 1 }));
    sinon.stub(ProductModel, 'update').resolves([1]);
    sinon.stub(UserModel, 'findByPk').resolves(UserModel.build(mockedUserFromModel));
    sinon.stub(ProductModel, 'findByPk').resolves(null);

    const res = await chai
      .request(app)
      .post('/orders')
      .set({ Authorization: `Bearer ${validToken}` })
      .send({ userId: 1, productIds: [1, 2] });

    expect(res).to.have.status(404);
    expect(res.body).to.have.property('message').equal('Some product was not found');
  });

  it('should return 400 if productId is not sent', async function () {
    sinon.stub(OrderModel, 'create').resolves(OrderModel.build({ id: 1, userId: 1 }));
    sinon.stub(ProductModel, 'update').resolves([1]);
    sinon.stub(UserModel, 'findByPk').resolves(UserModel.build(mockedUserFromModel));
    sinon.stub(ProductModel, 'findByPk').resolves(null);

    const res = await chai
      .request(app)
      .post('/orders')
      .set({ Authorization: `Bearer ${validToken}` })
      .send({ userId: 1 });

    expect(res).to.have.status(400);
    expect(res.body).to.have.property('message').equal('"productIds" is required');
  });

  it('should return 422 if productId is not an array', async function () {
    sinon.stub(OrderModel, 'create').resolves(OrderModel.build({ id: 1, userId: 1 }));
    sinon.stub(ProductModel, 'update').resolves([1]);
    sinon.stub(UserModel, 'findByPk').resolves(UserModel.build(mockedUserFromModel));
    sinon.stub(ProductModel, 'findByPk').resolves(null);

    const res = await chai
      .request(app)
      .post('/orders')
      .set({ Authorization: `Bearer ${validToken}` })
      .send({ userId: 1, productIds: 1 });

    expect(res).to.have.status(422);
    expect(res.body).to.have.property('message').equal('"productIds" must be an array');
  });

  it('should return 422 if productId is not an array of numbers', async function () {
    sinon.stub(OrderModel, 'create').resolves(OrderModel.build({ id: 1, userId: 1 }));
    sinon.stub(ProductModel, 'update').resolves([1]);
    sinon.stub(UserModel, 'findByPk').resolves(UserModel.build(mockedUserFromModel));
    sinon.stub(ProductModel, 'findByPk').resolves(null);

    const res = await chai
      .request(app)
      .post('/orders')
      .set({ Authorization: `Bearer ${validToken}` })
      .send({ userId: 1, productIds: ['1'] });

    expect(res).to.have.status(422);
    expect(res.body).to.have.property('message').equal('"productIds" must include only numbers');
  });

  it('should return 422 if productId is an empty array', async function () {
    sinon.stub(OrderModel, 'create').resolves(OrderModel.build({ id: 1, userId: 1 }));
    sinon.stub(ProductModel, 'update').resolves([1]);
    sinon.stub(UserModel, 'findByPk').resolves(UserModel.build(mockedUserFromModel));
    sinon.stub(ProductModel, 'findByPk').resolves(null);

    const res = await chai
      .request(app)
      .post('/orders')
      .set({ Authorization: `Bearer ${validToken}` })
      .send({ userId: 1, productIds: [] });

    expect(res).to.have.status(422);
    expect(res.body).to.have.property('message').equal('"productIds" must include only numbers');
  });

  it('should return 400 if userId is not sent', async function () {
    sinon.stub(OrderModel, 'create').resolves(OrderModel.build({ id: 1, userId: 1 }));
    sinon.stub(ProductModel, 'update').resolves([1]);
    sinon.stub(UserModel, 'findByPk').resolves(UserModel.build(mockedUserFromModel));
    sinon.stub(ProductModel, 'findByPk').resolves(null);

    const res = await chai
      .request(app)
      .post('/orders')
      .set({ Authorization: `Bearer ${validToken}` })
      .send({ productIds: [] });

    expect(res).to.have.status(400);
    expect(res.body).to.have.property('message').equal('"userId" is required');
  });

  it('should return 422 if userId is not a number', async function () {
    sinon.stub(OrderModel, 'create').resolves(OrderModel.build({ id: 1, userId: 1 }));
    sinon.stub(ProductModel, 'update').resolves([1]);
    sinon.stub(UserModel, 'findByPk').resolves(UserModel.build(mockedUserFromModel));
    sinon.stub(ProductModel, 'findByPk').resolves(null);

    const res = await chai
      .request(app)
      .post('/orders')
      .set({ Authorization: `Bearer ${validToken}` })
      .send({ userId: '1', productIds: [] });

    expect(res).to.have.status(422);
    expect(res.body).to.have.property('message').equal('"userId" must be a number');
  });
});
