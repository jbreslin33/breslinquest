var DungeonMasterScreen = new Class(
{
		//send goodies from server in array form with ids
        initialize: function(socket,pictureIDArray,pictureNameArray)
        {
		this.mSocket = socket;
		
		//button
		this.button = document.createElement("BUTTON");
    		this.buttonText = document.createTextNode("SET");
    		this.button.appendChild(this.buttonText);
    		document.body.appendChild(this.button);        

                this.mSelect = document.createElement("SELECT");
                this.mSelect.setAttribute("id", "setSelect");
                document.body.appendChild(this.mSelect);

                //fill picture select
                for (i=0; i < pictureNameArray.length; i++)
                {
                	var z = document.createElement("option");
                        z.setAttribute("value", "" + pictureIDArray[i]);
                        var t = document.createTextNode("" + pictureNameArray[i]);
                        z.appendChild(t);
                        this.mSelect.appendChild(z);
                }
		
		var that = this;
		
		this.button.addEventListener('click', function()
		{
			var pictureid = that.mSelect.options[that.mSelect.selectedIndex].value;
			that.mSocket.emit('build', pictureid);
		});
	},
	removePickPartyElements: function()
	{
        	this.mSelect.parentNode.removeChild(this.mSelect);
        	this.button.parentNode.removeChild(this.button);
	}
});
