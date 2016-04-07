var db = require('../config');
var Bio = require('../models/bio');

var Bios = new db.Collection();
Bios.model = Bio;

module.exports = Bios;