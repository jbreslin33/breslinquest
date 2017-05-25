var Application = new Class(
{
        initialize: function()
        {
      		this.mUsersArray = new Array(); 
      		this.mCharactersArray = new Array(); 
	},

        addUser: function(user)
        {
		this.mUsersArray.push(user);
        },

	updateUser: function(move_key_code,socket_id)
	{
                //let loop thru clients and update this guy
                for (i = 0; i < this.mUsersArray.length; i++)
                {
                        if (this.mUsersArray[i].socket_id == socket_id)
                        {
                                console.log('found client and updating move:' + socket_id);
                                /*
                                        0
                                       3 1
                                        2
                                */
                                if (move_key_code == 37)
                                {
                                        this.mUsersArray[i].d = this.mUsersArray[i].d - 1;
                                        if (this.mUsersArray[i].d < 0)
                                        {
                                                 this.mUsersArray[i].d = 3;
                                        }
                                }
                                if (move_key_code == 39)
                                {
                                        this.mUsersArray[i].d = this.mUsersArray[i].d + 1;
                                        if (this.mUsersArray[i].d > 3)
                                        {
                                                 this.mUsersArray[i].d = 0;
                                        }
                                }
                                if (move_key_code == 38)
                                {
                                        if (this.mUsersArray[i].d == 0)
                                        {
                                                 this.mUsersArray[i].y = this.mUsersArray[i].y + 1 ;
                                        }
                                        if (this.mUsersArray[i].d == 1)
                                        {
                                                 this.mUsersArray[i].x = this.mUsersArray[i].x + 1 ;
                                        }
                                        if (this.mUsersArray[i].d == 2)
                                        {
                                                 this.mUsersArray[i].y = this.mUsersArray[i].y - 1 ;
                                        }
                                        if (this.mUsersArray[i].d == 3)
                                        {
                                                 this.mUsersArray[i].x = this.mUsersArray[i].x - 1 ;
                                        }
                                }

                                if (move_key_code == 40)
                                {
                                        if (this.mUsersArray[i].d == 0)
                                        {
                                                 this.mUsersArray[i].y = this.mUsersArray[i].y - 1 ;
                                        }
                                        if (this.mUsersArray[i].d == 1)
                                        {
                                                 this.mUsersArray[i].x = this.mUsersArray[i].x - 1 ;
                                        }
                                        if (this.mUsersArray[i].d == 2)
                                        {
                                                 this.mUsersArray[i].y = this.mUsersArray[i].y + 1 ;
                                        }
                                        if (this.mUsersArray[i].d == 3)
                                        {
                                                 this.mUsersArray[i].x = this.mUsersArray[i].x + 1 ;
                                        }
                                }
                                console.log('id:' + socket_id + ' D:' + this.mUsersArray[i].d + ' X:' + this.mUsersArray[i].x + ' Y:' + this.mUsersArray[i].y + ' Z:' + this.mUsersArray[i].z );
                        }
                }
	}
});
module.exports = Application;
