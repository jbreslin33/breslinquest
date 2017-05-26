var PickPartyScreen = new Class(
{
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
			that.mSocket.emit('picked party', '1');
		});

/*
		//button
		this.button = document.createElement("BUTTON");
    		this.buttonText = document.createTextNode("LOGIN");
    		this.button.appendChild(this.buttonText);
    		document.body.appendChild(this.button);        

		//username input
		this.usernameInput = document.createElement("INPUT");	
		this.usernameInput.setAttribute("type","text");
		this.usernameInput.id = "usernameInputID";
		document.body.appendChild(this.usernameInput);
		
		//password input
		this.passwordInput = document.createElement("INPUT");	
		this.passwordInput.setAttribute("type","text");
		document.body.appendChild(this.passwordInput);
		
		var that = this;
		
		this.button.addEventListener('click', function()
		{
			that.mSocket.emit('login attempt', that.usernameInput.value, that.passwordInput.value);
		});
*/
	},
	
	removePickPartyElements: function()
	{
/*
        	this.usernameInput.parentNode.removeChild(this.usernameInput);
        	this.passwordInput.parentNode.removeChild(this.passwordInput);
        	this.button.parentNode.removeChild(this.button);
*/
	}
});
