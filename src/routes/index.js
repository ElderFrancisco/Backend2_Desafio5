const webSocket = require('../components/webSocket');
const api = require('../components/api');
const products = require('../components/products');
const carts = require('../components/carts');
module.exports = (app) => {
  webSocket(app);
  api(app);
  products(app);
  carts(app);

  app.get('/', (req, res) => res.send('Hello world!'));
};
