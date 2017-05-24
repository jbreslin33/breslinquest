var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 300;
        this.canvas.height = 300;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keypress', function (e) {
            e.preventDefault();
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keypress");

        if (e.keyCode == 37)
        {
                //server
                socket.emit('move attempt', e.keyCode);

                //client
                mD = mD - 1;
                if (mD < 0)
                {
                        mD = 3;
                }
                document.getElementById("hud").innerHTML = "mD:" + mD;
        }

        if (e.keyCode == 39)
        {
                mD = mD + 1;
                if (mD > 3)
                {
                        mD = 0;
                }
                document.getElementById("hud").innerHTML = "mD:" + mD;
        }

        })

        window.addEventListener('keyup', function (e) {
        })
    },
    stop : function() {
        clearInterval(this.interval);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

