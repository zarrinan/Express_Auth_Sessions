const authRouter     = require('express').Router();
const AuthService    = require('./AuthService');
const ViewController = require('../UserViewController');
//const UserController = require('../UserController');

/* public routes */

authRouter.route('/login')
  /* deliver the login form */
  .get(ViewController.showLoginForm)
  /* receive the login form / creds */
  .post(AuthService.login, ViewController.handleCreateUser);

//authRouter.route('/register')


authRouter.get('/logout', AuthService.logout, ViewController.handleLogout);

/* Error handler */
authRouter.use((err, req, res, next) => {
  console.error(err);
  res.json({ error: err });
});
module.exports = authRouter;
