var pg = require('pg');
var User  = require('./user');
var Party  = require('./party');
var Character  = require('./character');

var Application = new Class(
{
        initialize: function()
        {
      		this.mUsersArray = new Array(); 
		this.mPartiesArray = new Array();
      		this.mCharactersArray = new Array(); 

		this.loadUsers();
		this.loadParties();
		this.loadCharacters();
	},

        getPartyByID: function(partyid)
        {
                for (i=0; i < this.mPartiesArray.length; i++)
                {
                        if (this.mPartiesArray[i].id == partyid)
                        {
				var party = this.mPartiesArray[i];
				console.log('partyname:' + party.name);
                                return party;
                        }
                }
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
//        initialize: function(bapp,id,name,userid,raceid,classid,d,x,y,z,fullhitpoints,currenthitpoints,level,experience,partyid)
                        var character = new Character(this,row.id,row.name,row.user_id,row.race_id,row.class_id,row.d,row.x,row.y,row.z,row.full_hitpoints,row.current_hitpoints,row.level,row.experience,row.party_id);

                        this.addCharacter(character);

                }.bind(this));
                query.on("end", function (result)
                {
                        client.end();
                }.bind(this));
        },

	userMove: function(move_key_code,socket_id)
	{
		console.log('mk:' + move_key_code + ' for ' + socket_id);
                //let loop thru clients and update this guys party
		var user = this.getUserBySocketID(socket_id);	
		console.log('user.pid:' + user.party_id);
		var party = this.getPartyByID(user.party_id);	
                if (move_key_code == 37)
                {
                	party.d = party.d - 1;
                        if (party.d < 0)
                        {
                        	party.d = 3;
                        }
                }
                if (move_key_code == 39)
                {
                	party.d = party.d + 1;
                        if (party.d > 3)
                        {
                        	party.d = 0;
                        }
                }
                if (move_key_code == 38)
                {
                	if (party.d == 0)
                        {
                        	party.y = party.y + 1 ;
                        }
                        if (party.d == 1)
                        {
                        	party.x = party.x + 1 ;
                        }
                        if (party.d == 2)
                        {
                        	party.y = party.y - 1 ;
                        }
                        if (party.d == 3)
                        {
                        	party.x = party.x - 1 ;
                        }
                }
                if (move_key_code == 40)
                {
                	if (party.d == 0)
                        {
                        	party.y = party.y - 1 ;
                        }
                        if (party.d == 1)
                        {
                        	party.x = party.x - 1 ;
                        }
                        if (party.d == 2)
                        {
                        	party.y = party.y + 1 ;
                        }
                        if (party.d == 3)
                        {
                        	party.x = party.x + 1 ;
                        }
		}
                console.log('id:' + socket_id + ' d:' + party.d + ' x:' + party.x + ' y:' + party.y + ' z:' + party.z );
	}
});
module.exports = Application;
