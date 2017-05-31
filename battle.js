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

		//mAttackerIndex
		this.mAttackerIndex = 0;
        },
	
	update: function()
	{
		for (i=0; i < this.mApp.mCharactersArray.length; i++)
		{
			var character = this.mApp.mCharactersArray[i]; 
			if (this.inBattle(character))
			{
				console.log('' + character.name + ' of party ' + character.party_id + ' swings his sword!');	
			}
		}
		//console.log('parties in battle:' + this.mPartiesArray.length);
	},

	inBattle: function(character)
	{
		for (p=0; p < this.mPartiesArray.length; p++)
		{
			var party = this.mPartiesArray[p];
			if (character.party_id == party.id)
			{
				return true;
			}	
		}
		return false;
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
