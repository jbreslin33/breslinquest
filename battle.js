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

		this.mCurrentCharacter = 0;

		this.mRound = 0;

		this.mWaitingOn = 0;

		// wait time for user
		this.mWaitTimeThreshold = 5000;
		this.mWaitTime = 0;
        },
	
	update: function()
	{
		for (var i=0; i < this.mApp.mCharactersArray.length; i++)
		{
			var character = this.mApp.mCharactersArray[i];
			if (this.inBattle(character))
			{
				console.log('' + character.name + ' performs ' + character.action + '!');
			}
		}
	},

	inBattle: function(character)
	{
		for (var i=0; i < this.mPartiesArray.length; i++)
		{
			var party = this.mPartiesArray[i];
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
