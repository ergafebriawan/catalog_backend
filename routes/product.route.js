const middleware = require('../middleware')
const controller = require('../controller/product.controller')

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'authorization, Origin, Content-Type, Accept'
    )
    next()
  })

  app.get('/api/product/detail/:id', middleware.verifyToken, controller.show);
  app.get('/api/product/all', middleware.verifyToken, controller.index);
  app.get('/api/product/active', middleware.verifyToken, controller.active_product);
  app.get('/api/product/archive', middleware.verifyToken, controller.archive_product);
  app.get('/api/product/category/:id', middleware.verifyToken, controller.showbycategory);
  app.post('/api/product/add', middleware.verifyToken, controller.create);
  app.patch('/api/product/:id', middleware.verifyToken, controller.update);
  app.delete('/api/product/:id', middleware.verifyToken, controller.delete);
  app.patch('/api/product/active/:id', middleware.verifyToken, controller.active);
}