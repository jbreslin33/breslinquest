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

        partyInBattle: function(party)
        {
                for (var i=0; i < this.mPartiesArray.length; i++)
                {
                        var p = this.mPartiesArray[i];
                        if (p.party_id == party.id)
                        {
                                return true;
                        }
                }
                return false;
        },

       	characterInBattle: function(character)
        {
		var party = this.mApp.getPartyByID(character.party_id);
                for (var i=0; i < this.mPartiesArray.length; i++)
                {
                        var p = this.mPartiesArray[i];
                        if (p.id == party.id)
                        {
                                return true;
                        }
                }
                return false;
        },
	
	update: function()
	{
		if (this.mWaitTime > this.mWaitTimeThreshold)
		{
			console.log('ROUND: ' + this.mRound);
			this.handleCombat();
			this.mRound++;
			this.mWaitTime = 0;
			console.log('------------------------------------------------');
		}
		this.mWaitTime++;
	},
	
	handleCombat: function()
	{
		for (var a=0; a < this.mApp.mCharactersArray.length; a++) //loop thru characters to pick next attacker
		{
			var potentialAttacker = this.mApp.mCharactersArray[a];
	
			if (potentialAttacker.current_hitpoints > 0)
			{
				if (this.characterInBattle(potentialAttacker))
				{
					var attacker = potentialAttacker;
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
						var potentialDefender = this.mApp.mCharactersArray[c]; 
						if (potentialDefender.party_id == partyToAttack.id && potentialDefender.current_hitpoints > 0) //is potential defender in same party as party you wish to attack AND alive?
						{
							defender = this.mApp.mCharactersArray[c]; 
							console.log('' + attacker.name + ' performs ' + attacker.action + ' on ' + defender.name);
							if (attacker.action == 1) 
							{
								var damage = Math.floor((Math.random() * 10) + 0);	
								defender.setDamage(damage);
								console.log('' + attacker.name + ' does ' + damage + ' points of damage to ' + defender.name);
								if (defender.current_hitpoints < 1)
								{
									console.log('' + attacker.name + ' kills ' + defender.name);
								}
							}
						}		
						c++;
					}
				}
			}
		}
	},

	addParty: function(party)
	{
		this.mPartiesArray.push(party);	
		var user = this.mApp.getUserByID(party.user_id);
		if (user != 0)
		{
			//console.log('user.socket_id:' + user.socket_id);
			user.socket.emit('battle');	
		}
	}
});

module.exports = Battle;
