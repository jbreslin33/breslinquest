var pg = require('pg');

var Users = new Class(
{
        initialize: function(bapp,socketid,clientUsername,clientPassword)
        {
		this.id = 0;
		this.username = clientUsername;
		this.password = clientPassword;
		this.first_name = 0;
		this.last_name = 0;
		this.email = 0;
        	this.socket_id = socketid;
		this.banned_id = 0;

		//if there is a party id then the pary is active
		this.party_id = 0;

		//app
		this.mApp = bapp

        	this.mLoggedIn = false;

		this.loadDatabase();
        },

        loadDatabase: function()
        {
                var conString = "postgres://postgres:mibesfat@localhost/openrpg";
		var queryString = "select * from users where username = '" + this.username + "';";
		console.log('queryString:' + queryString);

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
