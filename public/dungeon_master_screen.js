var DungeonMasterScreen = new Class(
{
		//send goodies from server in array form with ids
        initialize: function(socket,partyNameArray,partyIDArray)
        {
		this.mSocket = socket;
		
		//button
		this.button = document.createElement("BUTTON");
    		this.buttonText = document.createTextNode("PICK PARTY");
    		this.button.appendChild(this.buttonText);
    		document.body.appendChild(this.button);        

                this.mSelect = document.createElement("SELECT");
                this.mSelect.setAttribute("id", "partySelect");
                document.body.appendChild(this.mSelect);

                //fill party select
                for (i=0; i < partyNameArray.length; i++)
                {
                	var z = document.createElement("option");
                        z.setAttribute("value", "" + partyIDArray[i]);
                        var t = document.createTextNode("" + partyNameArray[i]);
                        z.appendChild(t);
                        this.mSelect.appendChild(z);
                }
		
		var that = this;
		
		this.button.addEventListener('click', function()
		{
			var partyid = that.mSelect.options[that.mSelect.selectedIndex].value;
			that.mSocket.emit('build', partyid);
		});
	},
	removePickPartyElements: function()
	{
        	this.mSelect.parentNode.removeChild(this.mSelect);
        	this.button.parentNode.removeChild(this.button);
	}
});
