
const userController = require('../controllers/user');
const authController = require('../controllers/authController');
const verifyToken = require('../controllers/verifyToken');
let cors = require('cors');

module.exports = (app) => {

  let corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  app.get('/users', userController.get);
  app.get('/users/:id', userController.getById);
  app.get('/logout', authController.logout);
  app.get('/userId', verifyToken, userController.getUserId);

  // if registration is successful, then redirect to authentication
  app.post('/users', userController.post, authController.login);
  app.post('/login',cors(corsOptions), authController.login);
};
