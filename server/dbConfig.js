var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '107.170.1.73',
    user: 'root',
    password: '',
    database: 'alumConnectTest',
    charset: 'utf8',
    insecureAuth: true
  }
});
var bookshelf = require('bookshelf');

var db = new bookshelf(knex).plugin('registry');
module.exports = db;
