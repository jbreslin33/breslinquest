var DungeonMasterScreen = new Class(
{
		//send goodies from server in array form with ids
        initialize: function(socket,pictureIDArray,pictureNameArray,partyIDArray,partyNameArray,raceIDArray,raceNameArray)
        {
		this.mSocket = socket;
		var that = this;
		
		/************************************************* 
		PICTURES  
	      	**********************************************/
		
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

	
		//button and emit	
		this.pictureButton.addEventListener('click', function()
		{
			var pictureid = that.mPictureSelect.options[that.mPictureSelect.selectedIndex].value;
			var passableid = that.mPassableSelect.options[that.mPassableSelect.selectedIndex].value;
			that.mSocket.emit('build wall', pictureid, passableid);
		});
		
		/************************************************* 
		ADD PARTY  
	      	**********************************************/
		
		//button
		this.addPartyButton = document.createElement("BUTTON");
    		this.addPartyButtonText = document.createTextNode("ADD PARTY");
    		this.addPartyButton.appendChild(this.addPartyButtonText);
    		document.body.appendChild(this.addPartyButton);        

		//button and emit	
		this.addPartyButton.addEventListener('click', function()
		{
			that.mSocket.emit('dm add party');
		});


		/************************************************* 
		ADD CHARACATER TO PARTY  
	      	**********************************************/
                //button
                this.addCharacterButton = document.createElement("BUTTON");
                this.addCharacterButtonText = document.createTextNode("ADD CHARACTER TO PARTY");
                this.addCharacterButton.appendChild(this.addCharacterButtonText);
                document.body.appendChild(this.addCharacterButton);

                this.mPartySelect = document.createElement("SELECT");
                this.mPartySelect.setAttribute("id","partySelect");
                document.body.appendChild(this.mPartySelect);

                //fill party select
                for (i=0; i < partyIDArray.length; i++)
                {
                        var z = document.createElement("option");
                        z.setAttribute("value", "" + partyIDArray[i]);
                        var t = document.createTextNode("" + partyIDArray[i]);
                        z.appendChild(t);
                        this.mPartySelect.appendChild(z);
                }
                
		this.mRaceSelect = document.createElement("SELECT");
                this.mRaceSelect.setAttribute("id","raceSelect");
                document.body.appendChild(this.mRaceSelect);
                
		//fill race select
                for (i=0; i < raceIDArray.length; i++)
                {
                        var z = document.createElement("option");
                        z.setAttribute("value", "" + raceIDArray[i]);
                        var t = document.createTextNode("" + raceIDArray[i]);
                        z.appendChild(t);
                        this.mRaceSelect.appendChild(z);
                }

                this.addCharacterButton.addEventListener('click', function()
                {
                        var partyid = that.mPartySelect.options[that.mPartySelect.selectedIndex].value;
                        var raceid = that.mRaceSelect.options[that.mRaceSelect.selectedIndex].value;
                        that.mSocket.emit('dm add character to party', partyid, raceid);
                });
	},
	removeDungeonMasterElements: function()
	{
		//need more...
		//picture
        	this.mPictureSelect.parentNode.removeChild(this.mPictureSelect);
        	this.pictureButton.parentNode.removeChild(this.pictureButton);

		//party
        	this.mAddPartyText.parentNode.removeChild(this.mAddPartyText);
        	this.addPartyButton.parentNode.removeChild(this.addPartyButton);
	},

	updateParties: function(partyIDArray)
	{
    		for(var i = this.mPartySelect.options.length - 1 ; i >= 0 ; i--)
    		{
        			this.mPartySelect.remove(i);
    		}

		//fill party select
		var arr = new Array();		
		arr = partyIDArray.split(",");	
                
		for (var i=0; i < arr.length; i++)
		{
			console.log('arr[i]:' + arr[i]);
                        var z = document.createElement("option");
                        z.setAttribute("value", "" + arr[i]);
                        var t = document.createTextNode("" + arr[i]);
                        z.appendChild(t);
                        this.mPartySelect.appendChild(z);
                }
	}
});
