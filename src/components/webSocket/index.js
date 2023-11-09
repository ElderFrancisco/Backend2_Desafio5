//
//
const { json } = require('body-parser');
const ProductManagerDb = require('../../dao/managersDb/ProductManagerDb');
const productController = new ProductManagerDb();

module.exports = (app) => {
  app.get('/', async (req, res) => {
    try {
      const currentPath = req.originalUrl;
      const params = req.query;
      const productsList = await productController.getProducts(
        params,
        currentPath,
      );
      res.render('home', { products: productsList });
    } catch (error) {
      console.log(error);
    }
  });

  app.get('/realtimeproducts', async (req, res) => {
    try {
      res.render('realTimeProducts');
    } catch (error) {
      console.log(`[ERROR] -> ${error}`);
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  });

  app.get('/chat', async (req, res) => {
    try {
      res.render('chat');
    } catch (error) {
      console.log(`[ERROR] -> ${error}`);
      res.status(500).json({ error: 'Error al obtener los mensajes' });
    }
  });
};
