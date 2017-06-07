var pg = require('pg');

var WorldDirection = new Class(
{
        initialize: function(bapp,world_point_id,d,picture_id,url,passable,world_point_id)
        {
		this.mApp = bapp;
		this.world_point_id = world_point_id;
		this.d = d;

		this.picture_id = picture_id; 
		this.url = url; 
		this.passable = passable; 

		console.log('pic:' + this.url);
        }

});

module.exports = WorldDirection;
