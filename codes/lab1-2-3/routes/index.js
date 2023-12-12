var express = require('express');
var router = express.Router();
const { checkLoginSession } = require('../middlewares/auth');

router.get('/', checkLoginSession, function (req, res) {
  res.render('index', { layout: 'home_layout' });
});

router.get('/admin', (req, res) => {
  res.render('admin');
})

router.get('/user', (req, res) => {
  res.render('user');
})

module.exports = router;
