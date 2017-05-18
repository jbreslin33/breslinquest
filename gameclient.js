
var gameClient = function(clientUsername,clientPassword,serverUsername,serverPassword)
{
	this.mSocketID = 0;
	this.mUserID = 0;
	this.mClientUsername = clientUsername;
	this.mClientPassword = clientPassword;
	this.mServerUsername = serverUsername;
	this.mServerPassword = serverPassword;
	
	this.mLoggedIn = true;
};

module.exports = gameClient;

