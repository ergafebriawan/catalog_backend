const middleware = require('../middleware')
const controller = require('../controller/tipe_penjualan.controller')

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'authorization, Origin, Content-Type, Accept'
    )
    next()
  })

  app.get('/api/tipe-penjualan', middleware.verifyToken, controller.show);
}