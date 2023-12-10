var express = require('express');
var router = express.Router();
const { checkLoginSession } = require('../middlewares/auth');

router.get('/', checkLoginSession, function (req, res) {
  res.render('index', { layout: 'home_layout' });
});

module.exports = router;
