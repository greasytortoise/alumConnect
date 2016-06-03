var bodyParser = require('body-parser');
var util = require('./utility.js');
var Promise = require('bluebird');
var User = require('../models/user.js');
var bcrypt = require('bcrypt');

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

};