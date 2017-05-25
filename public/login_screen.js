var LoginScreen = new Class(
{
        initialize: function()
        {
		this.btn = document.createElement("BUTTON");
    		this.btnText = document.createTextNode("YO CLICK ME");
    		this.btn.appendChild(this.btnText);
    		document.body.appendChild(this.btn);        
	}
});

