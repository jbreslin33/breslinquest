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
		this.mWaitTimeThreshold = 100;
		this.mWaitTime = 0;
        },
	
	update: function()
	{
		if (this.mWaitTime > this.mWaitTimeThreshold)
		{
			for (var a=0; a < this.mApp.mCharactersArray.length; a++) //loop thru characters to pick next attacker
			{
				var attacker = this.mApp.mCharactersArray[a];
				if (this.inBattle(attacker))
				{
					//get party to attack
					var partyToAttack = 0;
					for (var b=0; b < this.mPartiesArray.length; b++) //check parties in battle in grab one not same as attacker
					{
						if (this.mPartiesArray[b].id != attacker.party_id)
						{
							partyToAttack = this.mApp.getPartyByID(this.mPartiesArray[b].id);
						}
					}

					//loop thru characters and find a defender to attack with attacker
					var c = 0; 	
					var defender = 0;
					while (c < this.mApp.mCharactersArray.length && defender == 0)
					{
						if (this.mApp.mCharactersArray[c].party_id == partyToAttack.id) //is potential defender in same party as party you wish to attack?
						{
							defender = this.mApp.mCharactersArray[c]; 
							console.log('' + attacker.name + ' performs ' + attacker.action + ' on ' + defender.name);
						}		
						c++;
					}
				}
			}
			this.mWaitTime = 0;
			this.mRound++;

			console.log('ROUND: ' + this.mRound);
		}
		this.mWaitTime++;
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
