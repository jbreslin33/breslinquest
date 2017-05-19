
var gameClient = function(socketid,clientUsername,clientPassword)
{
	this.mSocketID = socketid;
	this.mUserID = 0;
	this.mClientUsername = clientUsername;
	this.mClientPassword = clientPassword;
	this.mServerUsername = 0;
	this.mServerPassword = 0;
	
	this.mLoggedIn = false;

	checkLogin();
};

var checkLogin = function()
{
	console.log('checkinglogin');
}

module.exports = gameClient;

