var BioField = require('../models/bioField');
var BioFields = require('../collections/bioFields');

module.exports = {
  // http://localhost:3000/db/fields
  fetchFields: function(req, res) {
    BioFields
      .fetch()
      .then(function(fields) {
        res.status(200).send(fields);
      });
  },
  // http://localhost:3000/db/fields
  createField: function(req, res) {
    var data = req.body;
    BioFields
      .create({title: data.title})
      .then(function(newBioField) {
        res.status(201).send(newBioField);
      });
  },
  // http://localhost:3000/db/fields/field/:id  
  modifyField: function(req, res) {
    var id = req.params.id;
    var data = req.body;
    BioField
      .where({id: id})
      .fetch()
      .then(function(bioField) {
        bioField.save({title: data.title || bioField.get('title')})
        .then(function() {
          res.status(201).send(bioField);
        });
    });
  },
  // http://localhost:3000/db/fields/field/:id 
  deleteField: function(req, res) {
    var id = req.params.id;
    BioField
      .where({ id: id })
      .destroy()
      .then(function() {
        res.status(201).send('deleted!');
      });  
  }
};