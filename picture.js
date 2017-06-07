var pg = require('pg');

var Picture = new Class(
{
        initialize: function(bapp,id,name,url)
        {
		this.mApp = bapp;
		this.id = id; 
		this.name = name; 
		this.url = url; 
        }
});

module.exports = Picture;
