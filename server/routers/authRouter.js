var authRouter = require('express').Router();
var userController = require('../controllers/userController');
var util = require('../lib/utility.js');
var passport = require('passport');
var GithubStrategy = require('passport-github2').Strategy;
var User = require('../models/user');

authRouter.route('/')
  .get(passport.authenticate('github', {scopes: [ 'user:email' ]}));

authRouter.route('/logout')
  .get(function(req, res) {
    req.logout();
    req.session.destroy();
    res.redirect('/login');
  });


authRouter.route('/error')
  .get(function(req, res) {
    res.redirect('/login');
  });

authRouter.route('/callback')
    .get(passport.authenticate('github', { failureRedirect: '/auth/error'}),
    function(req, res) {
      // In the real application you might need to check 
      // whether the user exists and if exists redirect 
      // or if not you many need to create user.
      console.log(req.user.userData.handle)
      // User.where({handle: req.user.userData.handle}).fetch()
      //   .then(function(user) {
           // if (!user) {
              //do SOMETHING
       //     } else {
                // var store = user.permissions === 1 ? '8609213322' : '2319028362';
                // res.cookie('ac', store, { httpOnly: false})
                // if (store === '8609213322') {
                //   res.redirect('/dashboard');
                // } else {
                //   res.redirect('/');
                // }
       //     }

      //   })


      //COOKIES  OM NOM NOM
      // '2319028362' is regular user
      // '8609213322' is ADMIN
      
      res.cookie('ac', '2319028362', { httpOnly: false});
      res.redirect('/');

    });

authRouter.route('/islogged') 
  .get(util.isLoggedIn, function(req, res){
    res.status(200).send('true');
  });

authRouter.route('/isadmin') 
  .get(util.isLoggedIn, util.isAdmin, function(req, res){
    res.status(200).send('true');
  }); 

module.exports = authRouter;
