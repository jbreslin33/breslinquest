var DungeonMasterScreen = new Class(
{
		//send goodies from server in array form with ids
        initialize: function(socket,pictureIDArray,pictureNameArray)
        {
		this.mSocket = socket;
		
		//button
		this.pictureButton = document.createElement("BUTTON");
    		this.pictureButtonText = document.createTextNode("SET DIRECTION PICTURE");
    		this.pictureButton.appendChild(this.pictureButtonText);
    		document.body.appendChild(this.pictureButton);        

		//picture
                this.mPictureSelect = document.createElement("SELECT");
                this.mPictureSelect.setAttribute("id", "pictureSelect");
                document.body.appendChild(this.mPictureSelect);

                //fill picture select
                for (var i=0; i < pictureNameArray.length; i++)
                {
                	var z = document.createElement("option");
                        z.setAttribute("value", "" + pictureIDArray[i]);
                        var t = document.createTextNode("" + pictureNameArray[i]);
                        z.appendChild(t);
                        this.mPictureSelect.appendChild(z);
                }
		
		//passable
                this.mPassableSelect = document.createElement("SELECT");
                this.mPassableSelect.setAttribute("id", "passableSelect");
                document.body.appendChild(this.mPassableSelect);

                //fill passable select
		var passableIDArray = new Array();
		passableIDArray.push(1);	
		passableIDArray.push(2);	
		
		var passableNameArray = new Array();
		passableNameArray.push("passable");	
		passableNameArray.push("not passable");	

                for (var i=0; i < passableNameArray.length; i++)
                {
                        var z = document.createElement("option");
                        z.setAttribute("value", "" + passableIDArray[i]);
                        var t = document.createTextNode("" + passableNameArray[i]);
                        z.appendChild(t);
                        this.mPassableSelect.appendChild(z);
                }

		var that = this;
	
		//button and emit	
		this.pictureButton.addEventListener('click', function()
		{
			var pictureid = that.mPictureSelect.options[that.mPictureSelect.selectedIndex].value;
			var passableid = that.mPassableSelect.options[that.mPassableSelect.selectedIndex].value;
			that.mSocket.emit('build wall', pictureid, passableid);
		});
	},
	removePickPartyElements: function()
	{
        	this.mPictureSelect.parentNode.removeChild(this.mPictureSelect);
        	this.pictureButton.parentNode.removeChild(this.pictureButton);
	}
});
