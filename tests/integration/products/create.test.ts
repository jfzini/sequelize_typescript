import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ProductModel from '../../../src/database/models/product.model';
import app from '../../../src/app';
import { productMock, resCreatedProduct, sentProduct } from '../../mocks/products.mocks';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('should return 201 when product is created', async function () {
    sinon.stub(ProductModel, 'create').resolves(ProductModel.build(productMock));
    const res = await chai.request(app).post('/products').send(sentProduct);
    expect(res).to.have.status(201);
    expect(res.body).to.be.deep.equal(resCreatedProduct);
  });
});
