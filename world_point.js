var pg = require('pg');

var WorldPoint = new Class(
{
        initialize: function(bapp,id,x,y,z)
        {
		this.mApp = bapp;
		this.id = id;
		this.x = x;
		this.y = y;
		this.z = y;
        }
});

module.exports = WorldPoint;
