const middleware = require('../middleware')
const controller = require('../controller/auth.controller')

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'authorization, Origin, Content-Type, Accept'
    )
    next()
  })

  app.post('/api/auth/register', middleware.isUserExist, controller.register)
  app.post('/api/auth/login', middleware.checkActivation, controller.login)
  app.get('/activation/:id_user', middleware.validationActivation, controller.verifiedAccount)
}