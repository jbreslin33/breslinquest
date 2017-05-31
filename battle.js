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

		this.mRound = 0;
        },
	
	update: function()
	{
		console.log('attacker userid:' + this.mPartiesArray[this.mAttackerIndex].user_id ); 
		if (this.mPartiesArray[this.mAttackerIndex].user_id > 0)
		{
			console.log('need user response');
		} 
		else
		{
			for (var i=0; i < this.mApp.mCharactersArray.length; i++)
			{
				var character = this.mApp.mCharactersArray[i]; 
				var partyid = this.mPartiesArray[this.mAttackerIndex].id;
				if (partyid == character.party_id)
				{
					console.log('' + character.name + ' of party ' + character.party_id + ' swings his sword!');	
				}
			}
		}

		this.mAttackerIndex++;

		if (this.mAttackerIndex >= this.mPartiesArray.length)
		{
			this.mAttackerIndex = 0;	
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
