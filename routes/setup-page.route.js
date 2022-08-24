const middleware = require('../middleware')
const controller = require('../controller/setup_page.controller')

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'authorization, Origin, Content-Type, Accept'
    )
    next()
  })

  app.get('/api/setup', middleware.verifyToken, controller.show);
  app.get('/api/setup/create', middleware.verifyToken, controller.create);
  app.get('/api/setup/phone', middleware.verifyToken, controller.phone);
  app.patch('/api/setup/:id', middleware.verifyToken, controller.update);
}