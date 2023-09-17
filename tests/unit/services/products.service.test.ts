import { expect } from 'chai';
import sinon from 'sinon';
import ProductModel from '../../../src/database/models/product.model';
import { getAllProducts, productMock, resCreatedProduct, sentProduct } from '../../mocks/products.mocks';
import services from '../../../src/services';

describe.only('ProductsService', function () {
  context('createProduct should have the correct behavior', function () {
    beforeEach(function () {
      sinon.restore();
    });

    it('createProduct should return status CREATED and product when given a valid product', async function () {
      sinon.stub(ProductModel, 'create').resolves(ProductModel.build(productMock));

      const result = await services.createProduct(productMock);

      expect(result).to.deep.equal({ status: 'CREATED', data: resCreatedProduct });
    });
  });

  context('getAllProducts should have the correct behavior', function () {
    beforeEach(function () {
      sinon.restore();
    });

    it('getAllProducts should return status SUCCESSFUL all products', async function () {
      sinon.stub(ProductModel, 'findAll').resolves(getAllProducts.map((product) => ProductModel.build(product)));

      const result = await services.getAllProducts();

      expect(result).to.deep.equal({ status: 'SUCCESSFUL', data: getAllProducts });
    });

    it('getAllProducts should return status SUCCESSFUL an empty array if there are no products', async function () {
      sinon.stub(ProductModel, 'findAll').resolves([]);

      const result = await services.getAllProducts();

      expect(result).to.deep.equal({ status: 'SUCCESSFUL', data: [] });
    });
  });

  context('getProductById should have the correct behavior', function () {
    beforeEach(function () {
      sinon.restore();
    });

    it('getProductById should return status SUCCESSFUL and product when given a valid id', async function () {
      sinon.stub(ProductModel, 'findByPk').resolves(ProductModel.build(productMock));

      const result = await services.getProductById(1);

      expect(result).to.deep.equal({ status: 'SUCCESSFUL', data: productMock });
    });

    it('getProductById should return status NOT_FOUND when given an invalid id', async function () {
      sinon.stub(ProductModel, 'findByPk').resolves(null);

      const result = await services.getProductById(1);

      expect(result).to.deep.equal({ status: 'NOT_FOUND', data: { message: '"productId" not found' } });
    });
  });
});
