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

		var that = this;

		//this.button.onclick = loginClicked(this);
		

		//username input
		this.usernameInput = document.createElement("INPUT");	
		this.usernameInput.setAttribute("type","text");
		this.usernameInput.id = "usernameInputID";
		document.body.appendChild(this.usernameInput);
		
		//password input
		this.passwordInput = document.createElement("INPUT");	
		this.passwordInput.setAttribute("type","text");
		document.body.appendChild(this.passwordInput);
	/*	
		function loginClicked()
		{
			console.log('id:' + that.usernameInput.value);
		}	 
*/
		
		this.button.addEventListener('click', function()
		{
			//this.loginClicked(this);
			console.log('login be clicked:' + that.usernameInput.value);
		});
	}
/*
 setInterval(() => {
    this.age++; // |this| properly refers to the person object
  }, 1000);
*/
/*
	loginClicked: function() 
	{
		console.log('id:' + that.usernameInput.value);
		//socket.emit('login attempt', $('#u').val(), $('#p').val());
		//socket.emit('login attempt', param.usernameInput.value,param.passwordInput.value);
	}
*/
});

