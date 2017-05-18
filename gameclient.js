
var gameClient = function(username,password)
{
	this.mUsername = username;
	this.mPassword = password;
	this.mLoggedIn = true;

	console.log('username:' + this.mUsername + ' password:' + password);
};

module.exports = gameClient;

