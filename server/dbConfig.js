var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'alumConnectTest',
    charset: 'utf8'
  }
});
var bookshelf = require('bookshelf');

var db = new bookshelf(knex).plugin('registry');
module.exports = db;
