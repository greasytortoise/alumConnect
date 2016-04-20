# alumConnect
A React CMS. Currently manages authentication, user profiles, and an admin dashboard with configurable options.


### To create database and populate with sample data: ###
 **note from drake: database is still in test mode**
  * $ mysql -u root < server/schema.sql
  * $ node server/insertData.js
  * client side admin password: u: admin@admin.com p: admin  



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

### Frontend:
* client/index.js: We're using react router! You can see the routes in this file. If you open it up you'll see a bunch of imports. The router needs to know about these compoents to direct the user to them when they go to a url. In render, you can see the router in action! If you're unsure what component is being rendered on a certain url, just check the router.
* client/components/admin: this is where all the components that controll the admin dashboard. You can manage and add new users, edit profile fields, add sites that users can be a part of and hopefully more!
* client/components/frontend: this is where the actual site that users view lives. It's pretty simple, we essentially have users and profiles. Hopefully this will be extended out more!
* client/components/frontend/profile handles a lot! It's responsible for getting all the user profile info from our /db/users/user/:id api and nicely displaying it. Additionally, users or admins can edit profile fields, based on their permissions. Hopefully this is built out enough to where you won't need to touch it much, and continue expanding or using the frameowrk in other ways!


### API: 
(These have been upated,)
* get: <http://localhost:3000/db/groups>
* get: <http://localhost:3000/db/groups/group:id>
* post: <http://localhost:3000/db/groups>
* ---
* get:  <http://localhost:3000/db/users>
* get:  <http://localhost:3000/db/users/user/:id>
* post: <http://localhost:3000/db/users/>
* ---
* get:  <http://localhost:3000/db/sites>
* post: <http://localhost:3000/db/sites>
* ---
* get:  <http://localhost:3000/db/fields>
* post: <http://localhost:3000/db/fields>
### Challenges:

* We're gathering so much data about the users -- their likes, interests, github, linkedin accounts, and more can easily be added. Use this data to create new features! Eg: blog feed, linkedin api to populate additional fields in the user profile, ect, 
* Currently, a clever user of the site can spoof the JWT of an admin and do bad things. Prevent this from happening.
* Refactor to use Flux
* Refactor to use server side rendering
* Add more features to admin dashboard(change user password, group, etc)
* alumConnect is by invite only. Set up a way to generate a unique default password for the user, which can be changed on first login, and send an email to the supplied address with their password. 
* Allow users to change their own password
* Create blogging features into the site.
* Add more social features like commenting, likes, etc.
* Modularize site, so that admin can add modules to extend site functionality
* Set up more generic site, but allow more options through a configuration file
* Allow users to upload their own images


