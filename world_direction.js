var pg = require('pg');

var WorldDirection = new Class(
{
        initialize: function(bapp,world_point_id,d,picture,passable,world_point_id)
        {
		this.mApp = bapp;
		this.world_point_id = world_point_id;
		this.d = d;

		this.picture = picture; 
		this.passable = passable; 
		console.log('passable:' + this.passable);
        }

});

module.exports = WorldDirection;
