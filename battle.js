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

		//send emit to clients
		 //io.sockets.socket(savedSocketId).emit(...)

		var userA = this.mApp.getUserByID(this.mPartyA.user_id);
		if (userA != 0)
		{
		 	//socket.emit('load game');
			console.log('userA.socket_id:' + userA.socket_id);
			//socket.broadcast.to(socketid).emit('message', 'for your eyes only');
			//this.mApp.mIO.sockets.socket(userA.socket_id).emit('battle');	
			userA.socket.emit('battle');	
		}
		
		var userB = this.mApp.getUserByID(this.mPartyB.user_id);
		if (userB != 0)
		{
			console.log('userB.socket_id:' + userB.socket_id);
			//this.mApp.mIO.sockets.socket(userB.socket_id).emit('battle');	
			userB.socket.emit('battle');	
		}
		
        },

	rollInitiative: function()
	{
		
	},

});

module.exports = Battle;
