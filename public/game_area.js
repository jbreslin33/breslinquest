var GameArea = new Class(
{
        initialize: function()
        {
                console.log('test const');
		this.canvas = document.createElement("canvas"); 
        },

	start: function()
	{
		this.canvas.width = 300;
        	this.canvas.height = 300;
        	this.context = this.canvas.getContext("2d");
        	document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        	this.frameNo = 0;
        	this.interval = setInterval(updateGameArea, 20); 

        	//window.addEventListener('keypress', function (e) 
        	window.addEventListener('keydown', function (e) 
		{
            		e.preventDefault();
            		gameArea.keys = (gameArea.keys || []);
            		gameArea.keys[e.keyCode] = (e.type == "keypress");

        		if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40)
        		{
                		//server
                		socket.emit('move attempt', e.keyCode);

				//dead reckoning????
        		}
        	})

        	window.addEventListener('keyup', function (e) 
		{
       		})
	},
    
	stop : function() 
	{
        	clearInterval(this.interval);
    	},
    	clear : function() 
	{
        	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    	}
});
