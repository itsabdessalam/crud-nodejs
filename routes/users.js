var express = require('express');
var router = express.Router();
const User = require('../controllers/Users.js')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('Hello there')
});
router
  .route('/signup')
  .post(User.create)
  .get(User.add)
router
  .route('/signin')
  .post(User.connect)
  .get(User.login)
router
  .route('/logout')
  .get(User.logout)
module.exports = router;