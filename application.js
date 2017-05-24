var Application = new Class(
{
        initialize: function()
        {
      		this.mGameClientsArray = new Array(); 
	},

        addGameClient: function(gc)
        {
		this.mGameClientsArray.push(gc);
        },

	updateSocketObject: function(move_key_code,socket_id)
	{
                //let loop thru clients and update this guy
                for (i = 0; i < this.mGameClientsArray.length; i++)
                {
                        if (this.mGameClientsArray[i].mSocketID == socket_id)
                        {
                                console.log('found client and updating move:' + socket_id);
                                /*
                                        0
                                       3 1
                                        2
                                */
                                if (move_key_code == 37)
                                {
                                        this.mGameClientsArray[i].mD = this.mGameClientsArray[i].mD - 1;
                                        if (this.mGameClientsArray[i].mD < 0)
                                        {
                                                 this.mGameClientsArray[i].mD = 3;
                                        }
                                }
                                if (move_key_code == 39)
                                {
                                        this.mGameClientsArray[i].mD = this.mGameClientsArray[i].mD + 1;
                                        if (this.mGameClientsArray[i].mD > 3)
                                        {
                                                 this.mGameClientsArray[i].mD = 0;
                                        }
                                }
                                if (move_key_code == 38)
                                {
                                        if (this.mGameClientsArray[i].mD == 0)
                                        {
                                                 this.mGameClientsArray[i].mY = this.mGameClientsArray[i].mY + 1 ;
                                        }
                                        if (this.mGameClientsArray[i].mD == 1)
                                        {
                                                 this.mGameClientsArray[i].mX = this.mGameClientsArray[i].mX + 1 ;
                                        }
                                        if (this.mGameClientsArray[i].mD == 2)
                                        {
                                                 this.mGameClientsArray[i].mY = this.mGameClientsArray[i].mY - 1 ;
                                        }
                                        if (this.mGameClientsArray[i].mD == 3)
                                        {
                                                 this.mGameClientsArray[i].mX = this.mGameClientsArray[i].mX - 1 ;
                                        }
                                }

                                if (move_key_code == 40)
                                {
                                        if (this.mGameClientsArray[i].mD == 0)
                                        {
                                                 this.mGameClientsArray[i].mY = this.mGameClientsArray[i].mY - 1 ;
                                        }
                                        if (this.mGameClientsArray[i].mD == 1)
                                        {
                                                 this.mGameClientsArray[i].mX = this.mGameClientsArray[i].mX - 1 ;
                                        }
                                        if (this.mGameClientsArray[i].mD == 2)
                                        {
                                                 this.mGameClientsArray[i].mY = this.mGameClientsArray[i].mY + 1 ;
                                        }
                                        if (this.mGameClientsArray[i].mD == 3)
                                        {
                                                 this.mGameClientsArray[i].mX = this.mGameClientsArray[i].mX + 1 ;
                                        }
                                }
                                console.log('id:' + socket_id + ' D:' + this.mGameClientsArray[i].mD + ' X:' + this.mGameClientsArray[i].mX + ' Y:' + this.mGameClientsArray[i].mY + ' Z:' + this.mGameClientsArray[i].mZ );
                        }
                }
	}
});
module.exports = Application;
