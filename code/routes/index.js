var express = require('express');
var router = express.Router();
const checkSession = require('../middlewares/auth');

router.get('/', checkSession, function (req, res) {
  res.render('index', { layout: 'home_layout' });
});

module.exports = router;
