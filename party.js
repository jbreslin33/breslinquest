var Party = new Class(
{
        initialize: function(bapp,id,name,d,x,y,z,userid)
        {
		this.id = id;
		this.name = name;

		//party coordinates should overide characters in a party like a boat?
		this.d = d;
		this.x = x;
		this.y = y;
		this.z = z;

		this.user_id = userid;

		//app
		this.mApp = bapp
        }
});

module.exports = Party;
