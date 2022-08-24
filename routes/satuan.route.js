const middleware = require('../middleware')
const controller = require('../controller/satuan.controller')

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'authorization, Origin, Content-Type, Accept'
    )
    next()
  })

  app.get('/api/satuan', middleware.verifyToken, controller.show);
}