var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'alumConnectTest',
    charset: 'utf8'
  }
});
var bookshelf = require('bookshelf');

var db = new bookshelf(knex);
module.exports = db;
