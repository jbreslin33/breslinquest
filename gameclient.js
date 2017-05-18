
var gameClient = function(socketid)
{
	this.mSocketID = socketid;
	this.mUserID = 0;
	this.mClientUsername = 0;
	this.mClientPassword = 0;
	this.mServerUsername = 0;
	this.mServerPassword = 0;
	
	this.mLoggedIn = false;
};

module.exports = gameClient;

