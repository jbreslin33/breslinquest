var pg = require('pg');

var Race = new Class(
{
        initialize: function(bapp,id,name)
        {
		this.mApp = bapp;
	
		this.id = id;
		this.name = name;
        }
});

module.exports = Race;
