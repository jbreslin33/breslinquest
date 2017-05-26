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
        },
	
	setPosition: function(d,x,y,z)
	{
		this.d = d;
		this.x = x;
		this.y = y;
		this.z = z;
		console.log('d:' + d + ' x:' + x + 'y:' + y + 'z:' + z);  
	},

	getd: function()
	{
		return this.d;
	},
	getx: function()
	{
		return this.x;
	},
	gety: function()
	{
		return this.y;
	},
	getz: function()
	{
		return this.z;
	},

	setd: function(d)
	{
		this.d = d;
	},
	setx: function(x)
	{
		this.x = x;
	},
	sety: function(y)
	{
		this.y = y;
	},
	setz: function(z)
	{
		this.z = z;
	}	
});

module.exports = Party;
