var pg = require('pg');
//var conString = "postgres://postgres:mibesfat@localhost/openrpg";

var DatabaseConnection = new Class(
{
        initialize: function(ba,query_string)
        {
		this.mBreslinApplicationInstance = ba;
		this.mConString = "postgres://postgres:mibesfat@localhost/openrpg";
		this.mQueryString = query_string;
	},

        executeQuery: function()
        {
		var qs = this.mQueryString;
		console.log('this.mQueryString:' + this.mQueryString);

		var client = new pg.Client(this.mConString);
		client.connect();

		var login_query = client.query(this.mQueryString, function (err,result)
		{
			if (err)
			{
				throw err;
			}
			//console.log(result.rows[0]);
		});
		login_query.on("row", function (row,result) 
		{
			result.addRow(row);
		});	
		login_query.on("end", function (result)  
		{
    			console.log(JSON.stringify(result.rows, null, "    "));
    			//console.log('username:' + result.rows.username);
    			client.end();
			console.log('l:' + this.mBreslinApplicationInstance.mGameClientsArray[0].mClientUsername);
			for (i = 0; i < this.mBreslinApplicationInstance.mGameClientsArray.length; i++)
			{
				this.mBreslinApplicationInstance.mGameClientsArray[i].mLoggedIn = true;
			}
		}.bind(this));
	}
});

module.exports = DatabaseConnection;

