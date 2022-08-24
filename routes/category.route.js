const middleware = require('../middleware')
const controller = require('../controller/category.controller')

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'authorization, Origin, Content-Type, Accept'
    )
    next()
  })

  app.get('/api/category/show', middleware.verifyToken, controller.show);
  app.post('/api/category/add', middleware.verifyToken, controller.create);
  app.patch('/api/category/:id', middleware.verifyToken, controller.update);
  app.delete('/api/category/:id', middleware.verifyToken, controller.delete);
  // app.post('/api/category/add', controller.create)
}