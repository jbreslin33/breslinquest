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
			//this.loginClicked(this);
			console.log('login be clicked:' + that.usernameInput.value);
		});
	}
});

