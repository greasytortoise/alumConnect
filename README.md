# alumConnect
DO AMAZING THINGS!!!!


### To create database: ###
 **note from drake: database is still in test mode**
  * $ mysql -u root < server/schema.sql


### Make sure you use webpack to generate a client/bundle.js: ###

  * (make sure you npm install your dependencies)
  * (make sure you get rid of all client side bower stuff)
  * Install webpack globally (npm install -g webpack)
  * run: webpack --watch
  * Start the server visit http://localhost:3000/

### API: 

* get: <http://localhost:3000/db/groups>
* get: <http://localhost:3000/db/groups/:id>
* post: <http://localhost:3000/db/groups>
* ---
* get:  <http://localhost:3000/db/users>
* get:  <http://localhost:3000/db/users/:id>
* post: <http://localhost:3000/db/users>
* ---
* get:  <http://localhost:3000/db/networks>
* get:  <http://localhost:3000/db/networks/:id>
* post: <http://localhost:3000/db/networks>
* ---
* get:  <http://localhost:3000/db/bios>
* get:  <http://localhost:3000/db/bios/:id>
* post: <http://localhost:3000/db/bios>
