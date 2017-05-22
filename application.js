var Application = new Class(
{
        initialize: function()
        {
      		this.mGameClientsArray = new Array(); 
	},

        addGameClient: function(gc)
        {
		this.mGameClientsArray.push(gc);
        }
	

});

module.exports = Application;
