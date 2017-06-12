var pg = require('pg');
var Round  = require('./round');

var Battle = new Class(
{
        initialize: function(bapp,id)
        {
		this.id = id;
		
		//app
		this.mApp = bapp

		// battle parties
		this.mPartiesArray = new Array();

		//rounds
		this.mRoundsArray = new Array();

		// wait time for user
		this.mWaitTimeThreshold = 100;
		this.mWaitTime = 0;
        },
	
	update: function()
	{
		if (this.mWaitTime > this.mWaitTimeThreshold)
		{
			console.log('------------------------------------------------');
			var round = new Round(this.mApp,this);
			this.mRoundsArray.push(round);
			console.log('ROUND: ' + this.mRoundsArray.length);
			this.mWaitTime = 0;
		}
		this.mWaitTime++;
	},

	isNoOneLeftToFight: function()
	{
		var totalParties = 0;
        	for (var p=0; p < this.mPartiesArray.length; p++)
                {
                	var party = this.mPartiesArray[p];
                        if (party.isPartyAlive())
                        {
				totalParties++;
                        }
                }
		if (totalParties <= 1)
		{
			return true;
		}
		else
		{
			return false
		}
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
	
	addParty: function(party)
	{
		this.mPartiesArray.push(party);	
		var user = this.mApp.getUserByID(party.user_id);
		if (user != 0)
		{
			console.log('ADD PARTY user.socket_id:' + user.socket_id);
			if (user.socket)
			{
				user.socket.emit('battle');	
			}
		}
	}
});

module.exports = Battle;
