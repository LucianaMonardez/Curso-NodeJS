const express = require('express');

const productsRouter = require('./productsRouter');
const userRouter = require('./usersRouter');
const categoryRouter = require('./categoryRouter');

function routerApi(app){
  const router = express.Router();
  app.use('/api', router);

  router.use('/products', productsRouter);
  router.use('/users', userRouter);
  router.use('/category', categoryRouter);

}

module.exports = routerApi;
