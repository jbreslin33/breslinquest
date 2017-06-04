var pg = require('pg');

var Character = new Class(
{
        initialize: function(bapp,id,name,userid,raceid,classid,fullhitpoints,currenthitpoints,level,experience,partyid,action)
        {
		this.mClientID = 0;
		this.mApp = bapp;
	
		this.id = id;
		this.name = name;
		this.user_id = userid;
		this.race_id = raceid;
		this.class_id = classid;
		
		this.full_hitpoints = fullhitpoints;
		this.current_hitpoints = currenthitpoints;
		this.level = level;
		this.experience = experience;

		//if you have a party id your movement should come from party? or are we going to be more tactical?		
		this.party_id = partyid;


		//battle
		this.action = action; //1 attack, 2 defend, 3 flee 
		this.attack = 0; //default 0 is closest opponent

		this.weapon = 0;
        },
		
	setDamage: function(damage)
	{
		this.current_hitpoints = this.current_hitpoints - damage;	
		this.dbSetDamage();
	},

        dbSetDamage: function()
        {
                var conString = "postgres://postgres:mibesfat@localhost/openrpg";

                var queryString = 'update characters set current_hitpoints = ' + this.current_hitpoints + ' where id = ' + this.id + ';';

                var client = new pg.Client(conString);
                client.connect();

                var query = client.query(queryString, function (err,result)
                {
                        if (err)
                        {
                                throw err;
                        }
                });
                query.on("end", function (result)
                {
                        client.end();
                }.bind(this));
        },

});

module.exports = Character;
