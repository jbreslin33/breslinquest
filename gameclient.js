var db    = require('./db');

var GameClient = new Class(
{
        initialize: function(socketid,clientUsername,clientPassword)
        {
        	this.mSocketID = socketid;
        	this.mUserID = 0;
        	this.mClientUsername = clientUsername;
        	this.mClientPassword = clientPassword;
        	this.mServerUsername = 0;
        	this.mServerPassword = 0;

        	this.mLoggedIn = false;
        },
	
	jesus: function(cb,p)
	{
		//console.log('cb:' + cb);	
	},

        checkLogin: function(clientUsername,clientPassword)
        {
		db.executeQuery(function(resp)
		{
        		console.log(resp);
        		console.log(resp[0].username);
        		//breslinApplicationInstance.set
        		//point2DInstance.set(4,5);
        		//console.log('when returned x:' + point2DInstance.mX + ' y:' + point2DInstance.mY);
			if (resp[0].username == 'jbreslin')
			{
				return true;
			}
			else
			{
				return false;
			}

		});
        },
});

module.exports = GameClient;
