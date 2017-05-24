var db    = require('./db');

var GameClient = new Class(
{
        initialize: function(bapp,socketid,clientUsername,clientPassword)
        {
		this.mApplication = bapp
        	this.mSocketID = socketid;
        	this.mUserID = 0;
        	this.mClientUsername = clientUsername;
        	this.mClientPassword = clientPassword;
        	this.mServerUsername = 0;
        	this.mServerPassword = 0;

		//movement
		this.mD = 0;
		this.mX = 0;
		this.mY = 0;
		this.mZ = 0;

        	this.mLoggedIn = false;
        }
});

module.exports = GameClient;
