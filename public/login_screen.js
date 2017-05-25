var LoginScreen = new Class(
{
        initialize: function()
        {
		this.button = document.createElement("BUTTON");
    		this.buttonText = document.createTextNode("LOGIN");
    		this.button.appendChild(this.buttonText);
    		document.body.appendChild(this.button);        

		this.button.onclick = this.loginClicked;
	},

	loginClicked: function()
	{
		console.log('login be clicked');
	}

	
});

