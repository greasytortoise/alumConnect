var db = require('../dbConfig');
var BioField = require('../models/bioField');

var BioFields = new db.Collection();
BioFields.model = BioField;

module.exports = BioFields;