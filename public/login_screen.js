var LoginScreen = new Class(
{
        initialize: function(socket)
        {
		this.mSocket = socket;

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
	},
	
	removeLoginElements: function()
	{
        	this.usernameInput.parentNode.removeChild(this.usernameInput);
        	this.passwordInput.parentNode.removeChild(this.passwordInput);
        	this.button.parentNode.removeChild(this.button);
	}

/*

function removeLoginElements()
{
        //remove login
        var ue = document.getElementById('u');
        ue.parentNode.removeChild(ue);

        var pe = document.getElementById('p');
        pe.parentNode.removeChild(pe);

        var lbe = document.getElementById('loginbutton');
        lbe.parentNode.removeChild(lbe);
}

*/
});

