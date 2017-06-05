var pg = require('pg');
var User  = require('./user');
var Party  = require('./party');
var Character  = require('./character');
var Battle  = require('./battle');
var WorldPoint  = require('./world_point');
var WorldDirection  = require('./world_direction');

var Application = new Class(
{
        initialize: function(io)
        {
		this.mIO = io;
      		this.mUsersArray = new Array(); 
		this.mPartiesArray = new Array();
      		this.mCharactersArray = new Array(); 

		//should battles array be reset?????? after every update
      		this.mBattlesArray = new Array(); 

		this.mWorldPointsArray = new Array();
		this.mWorldDirectionsArray = new Array();

		this.loadUsers();
		this.loadParties();
		this.loadCharacters();

		this.loadWorldPoints();
		this.loadWorldDirections();

	},

	update: function()
	{
		//process all user moves first
		this.processUserMoves();
	
		//check for collisions, you may want to not check those you checked earlier in processUserMoves to save processing power	
		this.collisionCheck();

		//lets clean up finished battles			
		for (var b=0; b < this.mBattlesArray.length; b++)
		{
			if (this.mBattlesArray[b].isNoOneLeftToFight())
			{
				this.mBattlesArray.splice(b,1);	
			}
		}

		//run unfinished battles
		for (var b=0; b < this.mBattlesArray.length; b++)
		{
			this.mBattlesArray[b].update();						
		}

		//update users
		for (var u=0; u < this.mUsersArray.length; u++)
		{
			var user = this.mUsersArray[u]
			var party = this.getPartyByID(user.party_id);

			var worldPoint = this.getWorldPointByCoordinates(party.x,party.y,party.z);	
			var worldDirection = 0;
			if (worldPoint != 0)
			{
				console.log('A worldPoint.id:' + worldPoint.id + ' party.d:' + party.d);
				worldDirection = this.getWorldDirectionByWorldPointIDAndDirection(worldPoint.id,party.d);
			}
			//console.log('worldPoint.id:' + worldPoint.id + ' worldDirection.id:' + worldDirection.id);
			
			if (user.socket != 0)
			{
				console.log('B socket username:' + user.username);
				if (worldPoint != 0)
				{
					console.log('C worldPoint id:' + worldPoint.id);
					if (worldDirection != 0)
					{
						console.log('D worldDirection id:' + worldDirection.id);
						console.log('D show: d:' + worldDirection.d + ' x:' + worldPoint.x + ' y:' + worldPoint.y + ' z:' + worldPoint.z); 
	           				user.socket.emit('show','' + worldDirection.picture);
					}
				}
			}
/*
			if (user.socket != 0 && worldPoint != 0 && worldDirection != 0)
			{
	           		user.socket.emit('show','' + worldDirection.picture);
			}
*/
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

	privateCollisionCheck: function(partyA)
	{
		if (partyA.inBattle())
                {
                        //console.log('' + partyA.name + ' already in battle');
                       	//a already in battle
                }
                else if (!partyA.isPartyAlive())
                {
                        //party dead
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
                                else if (partyA == partyJ)
                                {
                                        //same parties!
                                }
                                else if (!partyJ.isPartyAlive())
                                {
                                	//party dead
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
                                                        console.log('PRIVATE CHECK: ' + partyA.name + ' joining battle');
                                                }
                                                else //create new battle
                                                {
                                                	console.log('PRIVATE CHECK:' + partyA.name + ' creating and joing battle');
                                                        var battle = new Battle(this,0);
                                                        this.mBattlesArray.push(battle);
                                                        battle.addParty(partyA);
                                                }
                                        }
                                }
			}
		}
	},

	collisionCheck: function()
	{
		//this.mBattlesArray = [];
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
			else if (!partyA.isPartyAlive())
			{
				//party dead		
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
					else if (partyA == partyJ)
					{
						//same parties!
					}
					else if (!partyJ.isPartyAlive())
					{
						//party dead		
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
								//console.log('' + partyA.name + ' joining battle'); 
							}
							else //create new battle
							{
								//console.log('' + partyA.name + ' creating and joing battle'); 
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
        
	getWorldPointByCoordinates: function(x,y,z)
        {
                for (var w=0; w < this.mWorldPointsArray.length; w++)
                {
                        if (this.mWorldPointsArray[w].x == x && this.mWorldPointsArray[w].y == y && this.mWorldPointsArray[w].z == z)
                        {
				var worldPoint = this.mWorldPointsArray[w];
                                return worldPoint;
                        }
                }
		return 0;
        },

        getWorldDirectionByWorldPointIDAndDirection: function(world_point_id,d)
        {
		console.log('world_point_id:' + world_point_id + ' d:' + d);
                for (var w=0; w < this.mWorldDirectionsArray.length; w++)
                {

			var worldDirection = this.mWorldDirectionsArray[w]; 
			console.log('AAAAAAAAAAAAAAAA worldDirection.d:' + worldDirection.d);
                        if (worldDirection.world_point_id == world_point_id && worldDirection.d == d)
                        {
				console.log('BBBBBBBBBBBBBB worldDirection.d:' + worldDirection.d);
                                return worldDirection;
                        }
                }
                return 0;
        },

        getPartyByID: function(partyid)
        {
                for (var i=0; i < this.mPartiesArray.length; i++)
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
                for (var i=0; i < this.mUsersArray.length; i++)
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
                for (var i=0; i < this.mUsersArray.length; i++)
                {
                        if (this.mUsersArray[i].socket_id == socketid)
                        {
                                return this.mUsersArray[i];
                        }
                }
		return 0;
	},
	
	addWorldPoint: function(world_point)
        {
		this.mWorldPointsArray.push(world_point);
        },
	
	addWorldDirection: function(world_direction)
        {
		this.mWorldDirectionsArray.push(world_direction);
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

        loadWorldPoints: function()
        {
                var conString = "postgres://postgres:mibesfat@localhost/openrpg";
                var queryString = "select * from world_points;";

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
                        var worldPoint = new WorldPoint(this,row.id,row.x,row.y,row.z);
                        this.addWorldPoint(worldPoint);

                }.bind(this));
                query.on("end", function (result)
                {
                        client.end();
                }.bind(this));
        },

        loadWorldDirections: function()
        {
                var conString = "postgres://postgres:mibesfat@localhost/openrpg";
                var queryString = "select * from world_directions;";

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
                        var worldDirection = new WorldDirection(this,row.id,row.d,row.picture,row.passable,row.world_point_id);
                        this.addWorldDirection(worldDirection);

                }.bind(this));
                query.on("end", function (result)
                {
                        client.end();
                }.bind(this));
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
	
	storeUserMoves: function(move_key,socket_id)
	{
		var user = this.getUserBySocketID(socket_id);	
		user.mMovesArray.push(move_key);
	},

	processUserMoves: function()
	{
		for (var u = 0; u < this.mUsersArray.length; u++)
		{
			var user = this.mUsersArray[u];
			var party = this.getPartyByID(user.party_id);	

			if (user.mMovesArray.length > 0 && party.inBattle() == false)
			{
				//grab earliest move and then delete it
				var move_key_code = user.mMovesArray[0];
				user.mMovesArray.splice(0,1);

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
				this.privateCollisionCheck(party);
			}
		}
	}
});
module.exports = Application;
