var db = require('../dbConfig');
var NetworkValue = require('../models/networkValue');

var NetworkValues = new db.Collection();
NetworkValues.model = NetworkValue;

module.exports = NetworkValues;