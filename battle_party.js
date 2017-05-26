var pg = require('pg');

var BattleParty = new Class(
{
        initialize: function(bapp,id,battleid,partyid)
        {
		this.id = id;
		this.battle_id = battleid;
		this.party_id = partyid;
		
		//app
		this.mApp = bapp
        }
});

module.exports = BattleParty;
