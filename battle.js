var pg = require('pg');

var Battle = new Class(
{
        initialize: function(bapp,id)
        {
		this.id = id;
		
		//app
		this.mApp = bapp

		// battle parties
		this.mPartiesArray = new Array();
        },

	addParty: function(party)
	{
		this.mPartiesArray.push(party);	
		var user = this.mApp.getUserByID(party.user_id);
		if (user != 0)
		{
			console.log('user.socket_id:' + user.socket_id);
			user.socket.emit('battle');	
		}
	}
});

module.exports = Battle;
	  

//      for (i=0; i < this.mPartiesArray.length; i++)
