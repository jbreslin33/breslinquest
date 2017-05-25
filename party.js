var Party = new Class(
{
        initialize: function(bapp,userid)
        {
		this.id = 0;
		this.name = 0;

		//party coordinates should overide characters in a party like a boat?
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.d = 0;

		this.user_id = 0;

		//app
		this.mApp = bapp
        }
});

module.exports = Users;
