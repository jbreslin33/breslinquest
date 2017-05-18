
var gameClient = function(username,password)
{
	this.mUsername = username;
	this.mPassword = password;
	this.mLoggedIn = true;
};

module.exports = gameClient;

