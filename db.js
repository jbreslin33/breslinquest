var pg = require('pg');

var DatabaseConnection = new Class(
{
        initialize: function(bapp,query_string)
        {
		this.mApp = bapp;
		this.mConString = "postgres://postgres:mibesfat@localhost/openrpg";
		this.mQueryString = query_string;
	},

        executeQuery: function(usernameAttempt,socketid,socket)
        {
		var qs = this.mQueryString;

		var client = new pg.Client(this.mConString);
		client.connect();

		var login_query = client.query(this.mQueryString, function (err,result)
		{
			if (err)
			{
				throw err;
			}
		});
		login_query.on("row", function (row,result) 
		{
			result.addRow(row);
		});	
		login_query.on("end", function (result)  
		{
    			client.end();
			for (i = 0; i < this.mApp.mUsersArray.length; i++)
			{
				if (this.mApp.mUsersArray[i].username == usernameAttempt)
				{
					this.mApp.mUsersArray[i].mLoggedIn = true;
					this.mApp.mUsersArray[i].socket_id = socketid;
					this.mApp.mUsersArray[i].socket = socket;
				}
			}
		}.bind(this));
	}
});

module.exports = DatabaseConnection;

