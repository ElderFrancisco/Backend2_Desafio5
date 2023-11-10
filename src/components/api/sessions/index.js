const { Router } = require('express');
const userModel = require('../../../dao/models/users.model');
const { Admin } = require('mongodb');

module.exports = (app) => {
  let router = new Router();

  app.use('/api/session', router);

  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email == 'adminCoder@coder.com' && password == 'adminCod3r123') {
        const userAdmin = {
          first_name: 'Admin',
          last_name: 'admin',
          email: 'adminCoder@coder.com',
          age: 0,
          password: 'adminCod3r123',
          rol: 'admin',
        };
        req.session.user = userAdmin;
        return res.redirect('/products');
      }
      const user = await userModel.findOne({ email, password });
      if (!user) return res.redirect('/authfailed');
      req.session.user = user;
      return res.redirect('/products');
    } catch (error) {
      console.log(error);
    }
  });

  router.post('/singup', async (req, res) => {
    try {
      const user = req.body;
      await userModel.create(user);
      return res.redirect('/login');
    } catch (error) {
      console.log(error);
    }
  });

  router.get('/logout', async (req, res) => {
    try {
      if (req.session?.user) {
        req.session.destroy((err) => {
          if (err) return res.status(500).send('logout error');
        });
        return res.redirect('/login');
      }
      return res.render('authfailed', {});
    } catch (error) {
      console.log(error);
    }
  });
};
