var pg = require('pg');
var User  = require('./user');
var Party  = require('./party');
var Character  = require('./character');
var Battle  = require('./battle');
var BattleParty  = require('./battle_party');

var Application = new Class(
{
        initialize: function(io)
        {
		this.mIO = io;
      		this.mUsersArray = new Array(); 
		this.mPartiesArray = new Array();
      		this.mCharactersArray = new Array(); 
      		this.mBattlesArray = new Array(); 

		this.loadUsers();
		this.loadParties();
		this.loadCharacters();
	},

	conductBattles: function()
	{
                for (var i=0; i < this.mBattlesArray.length; i++)
		{
			this.mBattlesArray[i].update();						
		}
	},
	
        getBattle: function(party)
        {
                for (var b=0; b < this.mBattlesArray.length; b++)
                {
                        for (var p=0; p < this.mBattlesArray[b].mPartiesArray.length; p++)
                        {
                                if (this.mBattlesArray[b].mPartiesArray[p] == party)
                                {
                                        return this.mBattlesArray[b];
                                }
                        }
                }
                return false;
        },

	
	atOrigin: function(party)
	{
		if (party.x == 0 && party.y == 0 && party.z == 0)
		{
			return true;
		}	
		return false;
	},

	collisionTwo: function(partya,partyj)
	{
		if (partya.x == partyj.x && partya.y == partyj.y && partya.z == partyj.z)
		{
			return true;
		}
		return false;
	},

	collisionCheck: function()
	{
		//check for party to party collision
                for (var i=0; i < this.mPartiesArray.length; i++)
		{
			var partyA = this.mPartiesArray[i];			
			//is partyA already in a battle?

			//console.log('checking ' + partyA.name);

			if (partyA.inBattle())
			{
				//console.log('' + partyA.name + ' already in battle');
				//a already in battle
			}
			else if (this.atOrigin(partyA))
			{
                		//a at origin no battles allowed and must not already be in battle!	
			}
			else
			{	
				for (var j=0; j < this.mPartiesArray.length; j++)
				{
					var partyJ = this.mPartiesArray[j];	
					if (this.atOrigin(partyJ))
					{
                				//j at origin no battles allowed		
					}
					if (partyA == partyJ)
					{
						//same parties!
					}
					else
					{
						//check for collision between partyA and partyB
						if (this.collisionTwo(partyA,partyJ))
						{
							if (partyJ.inBattle())
							{
								var battle = this.getBattle(partyJ);
								battle.addParty(partyA);
								console.log('' + partyA.name + ' joining battle'); 
							}
							else //create new battle
							{
								console.log('' + partyA.name + ' creating and joing battle'); 
								var battle = new Battle(this,0);
								this.mBattlesArray.push(battle);
								battle.addParty(partyA);
							}
						}
					}
				}
			}
		}
	},

        getPartyByID: function(partyid)
        {
                for (i=0; i < this.mPartiesArray.length; i++)
                {
                        if (this.mPartiesArray[i].id == partyid)
                        {
				var party = this.mPartiesArray[i];
                                return party;
                        }
                }
		return 0;
        },

        getUserByID: function(userid)
        {
                for (i=0; i < this.mUsersArray.length; i++)
                {
                        if (this.mUsersArray[i].id == userid)
                        {
                                var user = this.mUsersArray[i];
                                return user;
                        }
                }
		return 0;
			
        },

	getUserBySocketID: function(socketid)
	{
                for (i=0; i < this.mUsersArray.length; i++)
                {
                        if (this.mUsersArray[i].socket_id == socketid)
                        {
                                return this.mUsersArray[i];
                        }
                }
		return 0;
	},
        
	addUser: function(user)
        {
		this.mUsersArray.push(user);
        },
	
	addParty: function(party)
        {
		this.mPartiesArray.push(party);
        },

	addCharacter: function(character)
        {
		this.mCharactersArray.push(character);
        },

	loadUsers: function()
	{
                var conString = "postgres://postgres:mibesfat@localhost/openrpg";
                var queryString = "select * from users;";

                var client = new pg.Client(conString);
                client.connect();

                var query = client.query(queryString, function (err,result)
                {
                        if (err)
                        {
                                throw err;
                        }
                });
                query.on("row", function (row,result)
                {
                        result.addRow(row);
                        //console.log('creating user ' + row.username + ' and adding to mUserArray');
                	var user = new User(this,0,row.id,row.username,row.password,row.first_name,row.last_name,row.email,row.banned_id);
       			this.addUser(user);

                }.bind(this));
                query.on("end", function (result)
                {
                        client.end();
                }.bind(this));
	},

        loadParties: function()
        {
                var conString = "postgres://postgres:mibesfat@localhost/openrpg";
                var queryString = "select * from parties;";

                var client = new pg.Client(conString);
                client.connect();

                var query = client.query(queryString, function (err,result)
                {
                        if (err)
                        {
                                throw err;
                        }
                });
                query.on("row", function (row,result)
                {
                        result.addRow(row);
                        console.log('creating party ' + row.name + ' owned by user_id ' + row.user_id + ' and adding to mPartiesArray');
			var party = new Party(this,row.id,row.name,row.d,row.x,row.y,row.z,row.user_id);

                        this.addParty(party);

                }.bind(this));
                query.on("end", function (result)
                {
                        client.end();
                }.bind(this));
        },

        loadCharacters: function()
        {
                var conString = "postgres://postgres:mibesfat@localhost/openrpg";
                var queryString = "select * from characters;";

                var client = new pg.Client(conString);
                client.connect();

                var query = client.query(queryString, function (err,result)
                {
                        if (err)
                        {
                                throw err;
                        }
                });
                query.on("row", function (row,result)
                {
                        result.addRow(row);
                        console.log('creating character ' + row.name + ' owned by user_id ' + row.user_id + ' and adding to mCharactersArray');
                        var character = new Character(this,row.id,row.name,row.user_id,row.race_id,row.class_id,row.full_hitpoints,row.current_hitpoints,row.level,row.experience,row.party_id,row.action);

                        this.addCharacter(character);

                }.bind(this));
                query.on("end", function (result)
                {
                        client.end();
                }.bind(this));
        },
/*
	handleUserMove: function(move_key_code,user)
	{

	},
*/

	userMove: function(move_key_code,socket_id)
	{

		var user = this.getUserBySocketID(socket_id);	
		var party = this.getPartyByID(user.party_id);	

		if (party.inBattle())
		{
			return;
		}


		var cd = party.getd();
		var cx = party.getx();
		var cy = party.gety();
		var cz = party.getz();

		var nd = 0;
		var nx = 0;
		var ny = 0;
		var nz = 0;

                if (move_key_code == 37)
                {
                	cd--;
                        if (cd < 0)
                        {
                        	cd = 3;
                        }
                }
                if (move_key_code == 39)
                {
                	cd++;
                        if (cd > 3)
                        {
                        	cd = 0;
                        }
                }
                if (move_key_code == 38)
                {
                	if (cd == 0)
                        {
                        	cy++;
                        }
                        if (cd == 1)
                        {
                        	cx++;
                        }
                        if (cd == 2)
                        {
                        	cy--;
                        }
                        if (cd == 3)
                        {
                        	cx--;
                        }
                }
                if (move_key_code == 40)
                {
                	if (cd == 0)
                        {
                        	cy--;
                        }
                        if (cd == 1)
                        {
                        	cx--;
                        }
                        if (cd == 2)
                        {
                        	cy++;
                        }
                        if (cd == 3)
                        {
                        	cx++;
                        }
		}
		nd = cd;
		nx = cx;
		ny = cy;
		nz = cz;
		party.setPosition(nd,nx,ny,nz);
	}
});
module.exports = Application;
