var express = require('express');
var router = express.Router();
const { checkLoginSession, checkSingleSession } = require('../middlewares/auth');

router.get('/', checkLoginSession, function (req, res) {
  res.render('index', { layout: 'home_layout' });
});

router.get('/admin', checkSingleSession, (req, res) => {
  res.send('<h1>You are logged in as admin role</h1>')
})

router.get('/user', (req, res) => {
  res.send('<h1>You are logged in as user role</h1>')
})

module.exports = router;
