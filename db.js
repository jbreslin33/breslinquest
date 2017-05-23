var pg = require('pg');
//var conString = "postgres://postgres:mibesfat@localhost/openrpg";
var resp = [];

var DatabaseConnection = new Class(
{
        initialize: function(query_string)
        {
		this.mConString = "postgres://postgres:mibesfat@localhost/openrpg";
		this.mQueryString = query_string;
		console.log('this.mQueryString:' + this.mQueryString);
	},

        executeQuery: function(callback)
        {
		var qs = this.mQueryString;
		console.log('qs:' + qs);
               	pg.connect
		(
			this.mConString, 

			function(err, client, done,qs)
        		{
				console.log('qs:' + qs);
                		if(err)
                		{
                        		return console.error('error fetching client', err);
                		}
                		//var clientUsername = 'jbreslin';
                		//var query_string = "SELECT username, password FROM users where username = '" + clientUsername + "';";
                		client.query(qs, function(err, result)
                		{
                        		done();
                        		if(err)
                        		{
                                		return console.error('error running query', err);
                        		}
                        		resp.push(result.rows[0]);
                        		callback(resp);
                		});
        		}
		);
	}
});

module.exports = DatabaseConnection;

