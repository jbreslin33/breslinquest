var pg = require('pg');

var Round = new Class(
{
        initialize: function(bapp,battle)
        {
		//this.id = id;
		
		this.mApp = bapp
		this.mBattle = battle;
	
		this.handleCombat();	
        },

	handleCombat: function()
	{
		for (var a=0; a < this.mApp.mCharactersArray.length; a++) //loop thru characters to pick next attacker
		{
			var potentialAttacker = this.mApp.mCharactersArray[a];
	
			if (potentialAttacker.current_hitpoints > 0)
			{
				if (this.mBattle.characterInBattle(potentialAttacker))
				{
					var attacker = potentialAttacker;
					//get party to attack
					var partyToAttack = 0;
					for (var b=0; b < this.mBattle.mPartiesArray.length; b++) //check parties in battle in grab one not same as attacker
					{
						if (this.mBattle.mPartiesArray[b].id != attacker.party_id)
						{
							partyToAttack = this.mApp.getPartyByID(this.mBattle.mPartiesArray[b].id);
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
	}
	
});

module.exports = Round;
