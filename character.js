var Character = new Class(
{
        initialize: function(bapp)
        {
		this.mClientID = 0;
	
		this.id = 0;
		this.user_id = 0;
		this.race_id
		this.class_id
		
		this.full_hitpoints = 0;
		this.current_hitpoints = 0;
		this.level = 0;
		this.experience = 0;
		
		this.party_id = 0;

		//movement
		this.d = 0;
		this.x = 0;
		this.y = 0;
		this.z = 0;
        }


	setPosition: function(d,x,y,z)	
	{
		this.d = d;
		this.x = x;
		this.y = y;
		this.z = z;

		//update db

	}
});

module.exports = GameClient;
