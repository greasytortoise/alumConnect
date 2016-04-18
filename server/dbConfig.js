var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'abcd1234',
    database: 'alumConnectTest',
    charset: 'utf8',
    insecureAuth: true
  },
   pool: {
    min: 0,
    max: 666
  }
});
var bookshelf = require('bookshelf');

var db = new bookshelf(knex).plugin('registry');
module.exports = db;
