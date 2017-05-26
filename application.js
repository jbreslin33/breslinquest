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

	collisionCheck: function()
	{
		//check for party to party collision
                for (i=0; i < this.mPartiesArray.length; i++)
		{
			var partyA = this.mPartiesArray[i];	
			if (partyA.x == 0 && partyA.y == 0 && partyA.z == 0)
			{
                		//at origin no battles allowed and must not already be in battle!		
			}
			else if (partyA.mEnemyParty != 0)
			{
				//already have enemy
			}
			else
			{	
				for (j=0; j < this.mPartiesArray.length; j++)
				{
					var partyB = this.mPartiesArray[j];	
					if (partyA.x == 0 && partyA.y == 0 && partyA.z == 0)
					{
                				//at origin no battles allowed		
					}
					else if (partyB.mEnemyParty != 0)
					{
						//already have enemy
					}
					else
					{
						if (partyA != partyB)
						{		
							//check for collision between partyA and partyB
							if (partyA.x == partyB.x && partyA.y == partyB.y && partyA.z == partyB.z)
							{
								console.log('battle between ' + partyA.name + ' and ' + partyB.name); 
								//io.sockets.socket(savedSocketId).emit(...)
								var battle = new Battle(this,0,partyA,partyB);
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
                        var character = new Character(this,row.id,row.name,row.user_id,row.race_id,row.class_id,row.full_hitpoints,row.current_hitpoints,row.level,row.experience,row.party_id);

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
