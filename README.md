Demo: https://donkit.com:1337/

# alumConnect
Alumni networking platform


### To create database and populate with sample data: ###
 **note from drake: database is still in test mode**
  * $ mysql -u root < server/schema.sql
  * $ node server/insertData.js


### Make sure you use webpack to generate a client/bundle.js: ###

  * (make sure you npm install your dependencies)
  * Install webpack globally (npm install -g webpack)
  * run: webpack --watch
  * Start the server visit http://localhost:3000/
  * For production: 'npm run deploy' creates the minified production bundle.  
  * client/index.html Developtment: script src="/build/bundle.js" Production: src="/dist/bundle.js"
  * TESTING: npm test
  * Default Admin login information: email: admin@admin.com password: admin
  * Default user login information: email: firstname_lastname@hr.com password: user 


### API: 
(These have been upated, so some might not work!)
* get: <http://localhost:3000/db/groups>
* get: <http://localhost:3000/db/groups/group:id>
* post: <http://localhost:3000/db/groups>
* ---
* get:  <http://localhost:3000/db/users>
* get:  <http://localhost:3000/db/users/user/:id>
* post: <http://localhost:3000/db/users/>
* ---
* get:  <http://localhost:3000/db/networks>
* get:  <http://localhost:3000/db/networks/network/:id>
* post: <http://localhost:3000/db/networks>
* ---
* get:  <http://localhost:3000/db/bios>
* get:  <http://localhost:3000/db/bios/bio:id>
* post: <http://localhost:3000/db/bios>


### Challenges:

* We're gathering so much data about the users -- their likes, interests, github, linkedin accounts, and more can easily be added. Use this data to create new features! Eg: blog feed, linkedin api to populate additional fields in the user profile, ect, 
* Currently, a clever user of the site can spoof the JWT of an admin and do bad things. Prevent this from happening.
* Refactor to use Flux
* Add more features to admin dashboard(change user password, group, etc)
* alumConnect is by invite only. Set up a way to generate a unique default password for the user, which can be changed on first login, and send an email to the supplied address with their password. 
* Allow users to change their own password
* Create blogging features into the site.
* Add more social features like commenting, likes, etc.
* Modularize site, so that admin can add modules to extend site functionality
* Set up more generic site, but allow more options through a configuration file
* Allow users to upload their own images


