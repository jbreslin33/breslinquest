var pg = require('pg');
var User  = require('./user');
var Party  = require('./party');
var Character  = require('./character');
var Battle  = require('./battle');
var WorldPoint  = require('./world_point');
var WorldDirection  = require('./world_direction');
var Picture  = require('./picture');
var Utility  = require('./utility');

var Application = new Class(
{
        initialize: function(io)
        {
		this.mUtility = new Utility();

		this.mIO = io;
      		this.mUsersArray = new Array(); 
		this.mPartiesArray = new Array();
		this.mPartyIDArray = new Array();
		this.mPartyIDArrayLast = 0;
      		this.mCharactersArray = new Array(); 

		//should battles array be reset?????? after every update
      		this.mBattlesArray = new Array(); 

		this.mPicturesArray = new Array();
		this.mWorldPointsArray = new Array();
		this.mWorldDirectionsArray = new Array();


		this.loadUsers();
		this.loadParties();
		this.loadCharacters();

		this.loadWorldPoints();
		this.loadWorldDirections();
		this.loadPictures();
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
				worldDirection = this.getWorldDirectionByWorldPointIDAndDirection(worldPoint.id,party.d);
			}
			
			if (user.socket != 0)
			{
				if (worldPoint != 0)
				{
					if (worldDirection != 0)
					{
						//DUNGEON MASTER
						if (user.id == 1)
						{
				                        this.loadParties();
							user.mPartyIDArray = [];
                        				user.mPartyIDArray = new Array();
                        				for (var i=0; i < this.mPartiesArray.length; i++)
                        				{
                                				var iparty = this.mPartiesArray[i];
                                				if (this.mPartiesArray[i].user_id == null && party.x == iparty.x && party.y == iparty.y && party.z == iparty.z)
                                				{
                                        				user.mPartyIDArray.push(this.mPartiesArray[i].id);
                                				}
                        				}
							//console.log('url:' + worldDirection.url + ' url_last:' + worldDirection.url_last);
							var sendUrl = false;
							var sendPartyIDArray = false;
							if (worldDirection.url != worldDirection.url_last)
							{
								sendUrl = true;
							}
							if (this.mUtility.areArraysEqual(user.mPartyIDArray,user.mPartyIDArrayLast == false))
							{	
								sendPartyIDArray = true;	
							}
							if (sendUrl == true && sendPartyIDArray == true)
							{
								user.socket.emit('dm show','' + worldDirection.url,'' + partyIDArray);
                        					worldDirection.url_last = worldDiretion.url;
								user.mPartyIDArrayLast = user.mPartyIDArray;
							}
							else if(sendUrl == true && sendPartyIDArray == false)
							{
								user.socket.emit('show','' + worldDirection.url);
                        					worldDirection.url_last = worldDirection.url;
							}
							else if(sendUrl == false && sendPartyIDArray == true)
							{
								user.socket.emit('dm party','' + partyIDArray);
								user.mPartyIDArrayLast = user.mPartyIDArray;
							}
						}
						else
						{
							if (worldDirection.url != worldDirection.url_last)
							{
	
								user.socket.emit('dm show','' + worldDirection.url,'' + partyIDArray);
	           						//user.socket.emit(' show','' + worldDirection.url);
                        					worldDirection.url_last = worldDiretion.url;
							}
						}
					}
				}
			}
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
							console.log('private collisionCheck if:' + partyJ.id);
                                                        var battle = this.getBattle(partyJ);
                                                        battle.addParty(partyA);
                                                }
                                                else //create new battle
                                                {
							console.log('private collisionCheck else:' + partyJ.id);
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


			if (partyA.inBattle())
			{
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
								console.log('collisionCheck if:' + partyJ.id);
								var battle = this.getBattle(partyJ);
								battle.addParty(partyA);
							}
							else //create new battle
							{
								console.log('collisionCheck else:' + partyJ.id);
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
	
        getUrlByID: function(id)
        {
                for (var p=0; p < this.mPicturesArray.length; p++)
                {
                        var pic = this.mPicturesArray[p];
                        if (pic.id == id)
                        {
                                return pic.url;
                        }
                }
                return 0;
        },

	getWorldPointByID: function(id)
	{
                for (var w=0; w < this.mWorldPointsArray.length; w++)
		{
			var wp = this.mWorldPointsArray[w];
			if (wp.id == id)
			{
				return wp;
			}
		}
		return 0;
	},

	getWorldDirection: function(d,x,y,z)
	{
		var wp = this.getWorldPointByCoordinates(x,y,z);
                for (var w=0; w < this.mWorldDirectionsArray.length; w++)
		{
			var wd = this.mWorldDirectionsArray[w]; 
			
			if (wd.world_point_id == wp.id)
			{
				if (wd.d == d)
				{
					return wd;	
				}
			}
		}
		return 0;
	},
        
	getWorldPointByCoordinates: function(x,y,z)
        {
                for (var w=0; w < this.mWorldPointsArray.length; w++)
                {
                        if (this.mWorldPointsArray[w].x == x && this.mWorldPointsArray[w].y == y && this.mWorldPointsArray[w].z == z)
                        {
				var wp = this.mWorldPointsArray[w];
                                return wp;
                        }
                }
		return 0;
        },

        getWorldDirectionByWorldPointIDAndDirection: function(world_point_id,d)
        {
                for (var w=0; w < this.mWorldDirectionsArray.length; w++)
                {
			var worldDirection = this.mWorldDirectionsArray[w]; 
                        if (worldDirection.world_point_id == world_point_id && worldDirection.d == d)
                        {
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

	addPicture: function(picture)
        {
		this.mPicturesArray.push(picture);
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

        makeWorldPoints: function()
        {
                var conString = "postgres://postgres:mibesfat@localhost/openrpg";
		var queryString = "";
		for (var x = 0; x < 100; x++)
		{
			for (var y = 0; y < 100; y++)
			{
				for (var z = 0; z < 100; z++)
				{
					queryString = queryString + "insert into world_points (x,y,z) values (" + x + "," + y + "," + z + ");";
				}
			}
		}
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
              		//result.addRow(row);
              		//var worldPoint = new WorldPoint(this,row.id,row.x,row.y,row.z);
              		//this.addWorldPoint(worldPoint);
               	}.bind(this));
                query.on("end", function (result)
               	{
               		client.end();
               	}.bind(this));
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

        buildWall: function(socketid,pictureid,passableid)
        {
		var user = this.getUserBySocketID(socketid); 
		var party = this.getPartyByID(user.party_id);
		var worldDirection = this.getWorldDirection(party.d,party.x,party.y,party.z);
	
		//set class
		//worldDirection.picture_id = pictureid;
		//worldDirection.passable = passableid;
		//worldDirection.url = this.getUrlByID(pictureid);
		var url = this.getUrlByID(pictureid);
               
		//set db 
		var conString = "postgres://postgres:mibesfat@localhost/openrpg";
		var queryString = "update world_directions set picture_id = " + pictureid + ", passable = " + passableid + " where id = " + worldDirection.id + ";";   

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

                }.bind(this));
                query.on("end", function (result)
                {
			worldDirection.setWall(pictureid,passableid,url);
                        client.end();
                }.bind(this));
        },


        loadWorldDirections: function()
        {
                var conString = "postgres://postgres:mibesfat@localhost/openrpg";
		var queryString = "select world_directions.id, world_directions.d, world_directions.picture_id, pictures.url, world_directions.passable, world_directions.world_point_id from world_directions JOIN pictures on world_directions.picture_id=pictures.id;";

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
                        var worldDirection = new WorldDirection(this,row.id,row.d,row.picture_id,row.url,row.passable,row.world_point_id);
                        this.addWorldDirection(worldDirection);

                }.bind(this));
                query.on("end", function (result)
                {
                        client.end();
                }.bind(this));
        },
        
	loadPictures: function()
        {
                var conString = "postgres://postgres:mibesfat@localhost/openrpg";
                var queryString = "select * from pictures;";

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
                        var picture = new Picture(this,row.id,row.name,row.url);
                        this.addPicture(picture);

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
                	var user = new User(this,0,row.id,row.username,row.password,row.first_name,row.last_name,row.email,row.banned_id);
       			this.addUser(user);

                }.bind(this));
                query.on("end", function (result)
                {
                        client.end();
                }.bind(this));
	},

	dmAddParty: function(socketid)
	{
                var user = this.getUserBySocketID(socketid);
                var dmParty = this.getPartyByID(user.party_id);
                var worldDirection = this.getWorldDirection(dmParty.d,dmParty.x,dmParty.y,dmParty.z);

                var conString = "postgres://postgres:mibesfat@localhost/openrpg";
                var queryString = "insert into parties (d,x,y,z) values (" +  dmParty.d + "," + dmParty.x + "," + dmParty.y + "," + dmParty.z + ");";

		client = new pg.Client(conString);
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
                }.bind(this));
                query.on("end", function (result)
                {
			this.loadParties();
			var partyIDArray = new Array();
  			for (i=0; i < this.mPartiesArray.length; i++)
                        {
                                var party = this.mPartiesArray[i];
                                if (this.mPartiesArray[i].user_id == null && party.x == dmParty.x && party.y == dmParty.y && party.z == dmParty.z)
                                {
                                        partyIDArray.push(this.mPartiesArray[i].id);
                                }
                        }

	           	user.socket.emit('dm update parties','' + partyIDArray);
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
			var dup = false;
			for (var p = 0; p < this.mPartiesArray.length; p++)
			{
				var party = this.mPartiesArray[p];
				if (party.id == row.id)
				{
					dup = true;
				}
			}	 
			if (dup == false)
			{
				var party = new Party(this,row.id,row.name,row.d,row.x,row.y,row.z,row.user_id);
                        	this.addParty(party);
			}

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
				
				var wd = this.getWorldDirection(cd,cx,cy,cz);		

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
					if (wd.passable == 1)
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
