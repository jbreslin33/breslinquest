var pg = require('pg');

var Users = new Class(
{
// var user = new User(this,0,row.id,row.username,row.password,row.first_name,row.last_name,row.email,row.banned_id);

        initialize: function(bapp,socketid,id,clientUsername,clientPassword,firstname,lastname,email,bannedid)
        {
		this.id = id;
		this.username = clientUsername;
		this.password = clientPassword;
		this.first_name = firstname;
		this.last_name = lastname;
		this.email = email;
        	this.socket_id = socketid;
        	this.socket = 0;
		this.banned_id = bannedid;

		//if there is a party id then the pary is active
		this.party_id = 0;

		//partyid array sent
		this.mPartyIDArray = new Array();
		this.mPartyIDArrayLast = new Array();

		//app
		this.mApp = bapp

        	this.mLoggedIn = false;

		this.loadDatabase();

		//movement
		this.mMovesArray = new Array();
        },

	setPartyID: function(id)
	{
		this.party_id = id;
	},	

        loadDatabase: function()
        {
                var conString = "postgres://postgres:mibesfat@localhost/openrpg";
		var queryString = "select * from users where username = '" + this.username + "';";
		console.log('loading user ' + this.username + ' stats from db');

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
                });
                query.on("end", function (result)
                {
			this.id = result.rows[0].id; 
			this.first_name = result.rows[0].first_name; 
			this.last_name = result.rows[0].last_name; 
			this.email = result.rows[0].email; 
			this.banned_id = result.rows[0].banned_id; 

                        client.end();
                }.bind(this));
        }

});

module.exports = Users;
