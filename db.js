var pg = require('pg');
var conString = "postgres://postgres:mibesfat@localhost/openrpg";

var resp = [];

//function executeQuery (callback,query_string) 
function executeQuery (callback) 
{
	pg.connect(conString, function(err, client, done) 
	{
        	if(err) 
		{
            		return console.error('error fetching client', err);
        	}
		var clientUsername = 'jbreslin';
		var query_string = "SELECT username, password FROM users where username = '" + clientUsername + "';";
        	client.query(query_string, function(err, result) 
		{
        		done();
        		if(err) 
			{
            			return console.error('error running query', err);
        		}

        		resp.push(result.rows[0]);
        		callback(resp);
       		});
   	});
};

exports.executeQuery = executeQuery;
