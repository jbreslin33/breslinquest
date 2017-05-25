var Users = new Class(
{
        initialize: function(bapp,socketid,clientUsername,clientPassword)
        {
		this.id = 0;
		this.username = 0;
		this.password = 0;
		this.first_name = 0;
		this.last_name = 0;
		this.email = 0;
        	this.socket_id = socketid;
		this.banned_id = 0;

		//if there is a party id then the pary is active
		this.party_id = 0;

		//app
		this.mApp = bapp

        	this.mLoggedIn = false;
        }
});

module.exports = Users;
