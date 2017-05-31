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
			console.log('' + character.name + ' of party ' + character.party_id + ' swings his sword!');	
		}
		//console.log('parties in battle:' + this.mPartiesArray.length);
/*
		for (i=0; i < this.mPartiesArray.length; i++)
		{
			this.attackingParty(this.mPartiesArray[i]);
		}
*/
	},

	attack: function()
	{
		for (i=0; i < this.mApp.mCharactersArray.length; i++)
		{

		}
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
	},

	attackingParty: function(party)
	{
		console.log('party id:' + party.id);
/*
		for (i=0; i < this.mApp.mCharactersArray.length; i++)
		{
			if (this.mApp.mCharactersArray[i].party_id == party.id)
			{
				//console.log('' + this.mApp.mCharactersArray[i].name + ' swings his sword!');	
			}
		}
		this.mAttackerIndex++;
		if (this.mAttackerIndex >= this.mApp.mPartiesArray.length)
		{
			this.mAttackerIndex = 0;
		}
*/
	}
});

module.exports = Battle;
	  

//      for (i=0; i < this.mPartiesArray.length; i++)
