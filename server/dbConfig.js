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
var db = require('bookshelf')(knex);

db.knex.schema.hasTable('Groups').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('Groups', function(group) {
      group.increments('id').primary();
      group.string('group_name');
      group.timestamps();
    }).then(function(table) {
      console.log('Groups table is created!', table);
    });
  }
});

db.knex.schema.hasTable('Users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('Users', function(user) {
      user.increments('id').primary();
      user.string('username');
      user.string('password');
      user.string('email');
      user.string('url_hash');
      user.integer('public');
      user.integer('permission');
      user.timestamps();
    }).then(function(table) {
      console.log('Users table is created!', table);
    });
  }
});

db.knex.schema.hasTable('Networks').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('Networks', function(network) {
      network.increments('id').primary();
      network.string('network_name');
      network.string('username');
      network.timestamps();
    }).then(function(table) {
      console.log('Networks table is created!', table);
    });
  }
});

db.knex.schema.hasTable('Bios').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('Bios', function(bio) {
      bio.increments('id').primary();
      bio.string('lorem');
      bio.string('ipsum');
      bio.string('dolor');
      bio.string('sit');
      bio.timestamps();
    }).then(function(table) {
      console.log('Bios table is created!', table);
    });
  }
});

module.exports = db;