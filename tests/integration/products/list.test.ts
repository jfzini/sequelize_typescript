import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ProductModel from '../../../src/database/models/product.model';
import { getAllProducts } from '../../mocks/products.mocks';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('should return 200 when getting a list of all products', async function () {
    sinon.stub(ProductModel, 'findAll').resolves(getAllProducts.map((product) => ProductModel.build(product)));
    const res = await chai.request(app).get('/products').send();
    expect(res).to.have.status(200);
    expect(res.body).to.be.deep.equal(getAllProducts);
  });
});
