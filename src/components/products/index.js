const ProductManagerDb = require('../../dao/managersDb/ProductManagerDb');
const { Router } = require('express');
const bodyParser = require('body-parser');

const productController = new ProductManagerDb();

module.exports = (app) => {
  let router = new Router();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/products', router);

  router.get('/', async (req, res) => {
    try {
      const currentPath = req.originalUrl;
      const params = req.query;
      const productsList = await productController.getProducts(
        params,
        currentPath,
      );
      console.log(productsList);
      res.status(200).render('products', { products: productsList });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  router.get('/:pid', async (req, res) => {
    try {
      const paramsID = req.params.pid;
      const productId = await productController.getProductById(paramsID);
      if (productId == null) {
        return res
          .status(400)
          .send('no se econtro el producto con el ' + paramsID);
      }

      return res.status(200).render('productView', { product: productId });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
};
