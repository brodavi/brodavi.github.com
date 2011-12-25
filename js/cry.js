var cry1 = new Audio("sounds/cry1.mp3");
var cry2 = new Audio("sounds/cry2.mp3");
var cry3 = new Audio("sounds/cry3.mp3");
var cry4 = new Audio("sounds/cry4.mp3");

var cry = {
    cryrand: 0,
    cancry: true,
    crycountup: 5000,
    showmsg: false,

    init: function () {
        cryrand = 0;
        cancry: true;
        crycountup: 5000;
    },

    showMsg: function () {
        cry.showmsg = true;
    },

    cry: function () {
        if (timeleft < 20) {
            cry4.play();
        } else {
            this.cryrand = Math.random();
            if (this.cryrand < 0.3) {
                cry1.play();
            } else if (this.cryrand < 0.6) {
                cry2.play();
            } else {
                cry3.play();
            }
        }
        setTimeout(this.showMsg, 1000); // show response after 1 second
    },

    update: function () {
        if (crying) { // Player crying
            if (this.cancry) { // only cry once every 5 seconds
                this.cancry = false;
                this.crycountup = 0; // reset counter
                this.cry();
            }
        }
        if (this.cancry === false) { // if we can't cry again yet
            if (this.crycountup > 5000) { // check to see if we really can
                this.cancry = true;
            }
            if (this.crycountup > 1000) {
                this.showmsg = false;
            }
        }
        this.crycountup += 30; // because we're at 30fps
    },

    draw: function () {
        var blah = 0;
        var blah2 = 0;
        var mamay = 240;
        if (this.crycountup > 5000) {
            blah = 0;
            blah2 = 200;
        } else {
            blah = parseInt(255 - (this.crycountup + 1) / 30);
            blah2 = parseInt((this.crycountup + 1)/25);
        }

        if (this.crycountup < 1000) { // player currently crying
            if (lookingup) {
                mamay += 100;
            } else {
                mamay = 240;
            }
            ctx.save();
            ctx.fillStyle = "#000000";
            ctx.fillRect(275, mamay - 30, 115, 35);
            ctx.fillStyle = "#FFFFFF";
            ctx.font = "27pt Courier";
            ctx.fillText("Mama?", 280, mamay);
            ctx.restore();
        }

        if (this.showmsg) { // response message is showing
            ctx.save();
            var msg = "";
            ctx.fillStyle = "#000000";
            if (hiddenmother.y < 400) {
                msg = "I'm here honey";
                ctx.fillRect(200, 100, 180, 40);
            } else {
                msg = "your mother is not on this aisle";
                ctx.fillRect(200, 100, 330, 40);
            }
            ctx.fillStyle = "#FFFFFF";
            ctx.font = "24px Helvetica";
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillText(msg, 205, 105);
            ctx.restore();
        }

        ctx.save();
        ctx.fillStyle = "rgba(" + blah + "," + blah2 + "," + blah2  + ",1)"; 
        ctx.fillRect(600, 90, 20, blah2);
        ctx.fillStyle = "#000000";
        ctx.lineWidth = 2;
        ctx.strokeRect(600, 90, 20, blah2);
        ctx.restore();
    }
}