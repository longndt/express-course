var express = require('express')
var router = express.Router()
var UserModel = require('../models/UserModel');

//import "bcryptjs" library
var bcrypt = require('bcryptjs');
var salt = 8;                     //random value

router.get('/register', (req, res) => {
   res.render('auth/register', { layout: 'auth_layout' })
})

router.post('/register', async (req, res) => {
   try {
      var userRegistration = req.body;
      var hashPassword = bcrypt.hashSync(userRegistration.password, salt);
      var user = {
         username: userRegistration.username,
         password: hashPassword,
         role: 'customer'
      }
      await UserModel.create(user);
      res.redirect('/auth/login')
   } catch (err) {
      res.send(err)
   }
})

router.get('/login', (req, res) => {
   res.render('auth/login', { layout: 'auth_layout' })
})

router.post('/login', async (req, res) => {
   try {
      var userLogin = req.body;
      var user = await UserModel.findOne({ username: userLogin.username })
      if (user) {
         var hash = bcrypt.compareSync(userLogin.password, user.password)
         if (hash) {
            //initialize session after login success
            req.session.username = user.username;
            req.session.role = user.role;
            res.redirect('/');
         }
         else {
            res.redirect('/auth/login');
         }
      }
   } catch (err) {
      res.send(err)
   }
});

router.get('/logout', (req, res) => {
   req.session.destroy();
   res.redirect("/auth/login");
})

module.exports = router