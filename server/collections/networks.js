var db = require('../dbConfig');
var Network = require('../models/network');

var Networks = new db.Collection();
Networks.model = Network;

module.exports = Networks;