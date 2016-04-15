var Site = require('../models/site');
var Sites = require('../collections/sites');

module.exports = {
  // http://localhost:3000/db/sites
  fetchSites: function(req, res) {
    Sites.fetch().then(function(sites) {
      res.json(200, sites);
    });
  },
  // http://localhost:3000/db/sites
  createSite: function(req, res) {
    var data = req.body;
    Site.where({site_name: data.site_name}).fetch().then(function(siteExist) {
      if (siteExist) { return res.send(400, 'Site already exists'); }
      Sites.create({
        site_name: data.site_name,
        base_url: data.base_url,
        active: 1
      }).then(function(newSite) {
        res.json(201, newSite);
      });

    });
  },
  // http://localhost:3000/db/sites/site/:id
  modifySite: function(req, res) {
    var id = req.params.id;
    var data = req.body;
    Site.where({site_name: data.site_name}).fetch().then(function(siteExist) {
      if (siteExist && (siteExist.id !== parseInt(id))) {
        return res.send(400, 'Site already exists!'); 
      }
      Site.where({id: id}).fetch().then(function(site) {
        site.save({
          site_name: data.site_name || site.get('site_name'),
          base_url: data.base_url || site.get('base_url'),
          active: data.active || site.get('active')
        }).then(function() {
          res.json(201, site);
        });
      });
    });    
  },
  // http://localhost:3000/db/sites/site/:id
  deleteSite: function(req, res) {
    var id = req.params.id;
    Site.where({id: id}).destroy().then(function() {
      res.send(201, 'deleted!');
    });
  },  
}