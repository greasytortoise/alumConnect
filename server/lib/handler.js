var bodyParser = require('body-parser');
var util = require('./utility.js');
var Promise = require('bluebird');

module.exports = {
  getAll: function(attrs, Model) {
    return Promise.map(attrs, function(attr) {
      return Model.forge(attr).fetch();
    })
    .filter(function(models) {
      return models;
    });
},

  deleteAll: function(models) {
    return Promise.map(models, function(model) {
      return model.destroy();
    });
  },

  createAll: function(attrs, Model) {
    return Promise.map(attrs, function(attr) {
      return Model.forge(attr).save();
    });
  },

  saveIds: function(models) {
    return models.map(function(model) {
      return model.id;
    });
  },

  checkLogin: function(req, res) {

    User.where({email: req.body.email}).fetch().then(function(user){
      if(user === null) {
        res.send(401, 'No user with that email');
      } else {
        // bcrypt.compare(password, user[0].password, function(err, isMatch){
        //   if(match) {
        //     res.send(200, util.generateToken(user.id, user));
        //   } else {
        //     // res.send(401, 'Invalid Password');
        //     res.send(200, util.generateToken(user.id, user));

        //   }
        // });
        if(req.body.password === user.attributes.password) {
          res.send(200, JSON.stringify({token: util.generateToken(user.attributes.id, user.attributes.email, user.attributes.permission), perm: user.attributes.permission}));
        } else {
          res.send(403, 'Invalid Password');
        }
      }
    });
  }
};