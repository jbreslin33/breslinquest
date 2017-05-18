
var gameClient = function(username,password)
{
	this.mSocketID = 0;
	this.mUserID = 0;
	this.mUsername = username;
	this.mPassword = password;
	this.mLoggedIn = true;

	console.log('username:' + this.mUsername + ' password:' + password);
};

module.exports = gameClient;

