var pg = require('pg');

var Party = new Class(
{
        initialize: function(bapp,id,name,d,x,y,z,userid)
        {
		this.id = id;
		this.name = name;

		//party coordinates should overide characters in a party like a boat?
		this.d = d;
		this.x = x;
		this.y = y;
		this.z = z;

		this.user_id = userid;

		//app
		this.mApp = bapp
        },

        inBattle: function()
        {
                for (b=0; b < this.mApp.mBattlesArray.length; b++)
                {
                        for (p=0; p < this.mApp.mBattlesArray[b].mPartiesArray.length; p++)
                        {
                                if (this.mApp.mBattlesArray[b].mPartiesArray[p] == this)
                                {
                                        return true;
                                }
                        }
                }
                return false;
        },

	setEnemyParty: function(enemy)
	{
		this.mEnemyParty = enemy;
	},
	
	setPosition: function(d,x,y,z)
	{
		this.d = d;
		this.x = x;
		this.y = y;
		this.z = z;
		this.dbUpdatePosition();
		console.log('d:' + d + ' x:' + x + 'y:' + y + 'z:' + z);  
	},

        dbUpdatePosition: function()
        {
                var conString = "postgres://postgres:mibesfat@localhost/openrpg";
		
                var queryString = 'update parties set d = ' + this.d + ', x = ' + this.x + ', y = ' + this.y + ', z = ' + this.z + ' where id = ' + this.id + ';';

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

	getd: function()
	{
		return this.d;
	},
	getx: function()
	{
		return this.x;
	},
	gety: function()
	{
		return this.y;
	},
	getz: function()
	{
		return this.z;
	},

	setd: function(d)
	{
		this.d = d;
	},
	setx: function(x)
	{
		this.x = x;
	},
	sety: function(y)
	{
		this.y = y;
	},
	setz: function(z)
	{
		this.z = z;
	}	
});

module.exports = Party;
