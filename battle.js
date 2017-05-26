var pg = require('pg');

var Battle = new Class(
{
        initialize: function(bapp,id,partya,partyb)
        {
		this.id = id;
		
		//app
		this.mApp = bapp

		//parties in battle
		this.mPartyA = partya;
		this.mPartyB = partyb;

		//turns
		this.mAttackingParty = this.mPartyA;
		this.mDefendingParty = this.mPartyB;

		//tell party instances about enemy
		this.mPartyA.mEnemyParty = this.mPartyB;
		this.mPartyB.mEnemyParty = this.mPartyA;
        },

	rollInitiative: function()
	{
		
	},

});

module.exports = Battle;
