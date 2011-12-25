// Moving object (something that moves if player holding left/right, or looks up)
var iswalkingleft = false;
var iswalkingright = false;
var iswalkingup = false;
var iswalkingdown = false;
var movingobject = {
    x: 0,
    y: 0,
    dx: 0,
    speed: 15,
    islookingup: false,
    shaketimeout: 0,
    update: function () {
        if (lookingup) { // Player looking up
            if (!this.islookingup) { // if this object is not up yet,
                this.islookingup = true;
                this.y += 100;
            }
        }
        if (!lookingup && this.islookingup) { // player not looking up, but this object is still up
            this.islookingup = false;
            this.y -= 100;
        }
        if (walkingleft) { // Player walking left
            if (!(aisle.x < 16)) { // don't go too far left
                this.x += -this.speed; // move
            }
        }
        if (walkingright) { // Player walking right
            if (!(aisle.x + canvas.width > aisle.width)) { // don't go too far right
                this.x += this.speed; // move
            }
        }
        if (timeleft < 30 && this.shaketimeout > 3) {
            this.dx = Math.sin(Math.random() * 2 * Math.PI) * (30 - timeleft);
            if (!(this.x + this.dx + canvas.width > aisle.width || this.x + this.dx < 16)) {
                this.x +=  this.dx // shake it up
            }
            this.shaketimeout = 0;
        }
        this.shaketimeout += 1;

        if (portal.x < canvas.width/2 && portal.x + portal.width > canvas.width/2) { // we're at the portal
            if (walkingup && !iswalkingup) {
                iswalkingup = true;
            } else if (walkingdown && !iswalkingdown) {
                iswalkingdown = true;
            }
        }

        if (iswalkingup && !walkingup && aisle.row !== 0) { // player is no longer walking up but we're already iswalkinguped
            iswalkingup = false; // basically, key is up now, so trigger event
            aisle.row -= 1;
            hiddenmother.y += 500;
            if (aisle.row%2 === 0) { // even
//                portal.x = 1000;
                aisle.x = 1000;
            } else { // odd
//                portal.x = 3000;
                aisle.x = 3000;
            }
        }
        if (iswalkingdown && !walkingdown && aisle.row !== 7) { // player is no longer walking down but we're already iswalkingdowned
            iswalkingdown = false; // basically, key is down now, so trigger event
            aisle.row += 1;
            hiddenmother.y -= 500;
            if (aisle.row%2 === 0) { // even
//                portal.x = 1000;
                aisle.x = 1000;
            } else { // odd
//                portal.x = 3000;
                aisle.x = 3000;
            }
        }
    }
}

// The Portal object
var portal = object(movingobject);
portal.init = function () {
    portal.name = "I'm the portal!";
    portal.x = 1000;
    portal.y = 0;
    portal.islookingup = false;
    portal.width = 640;
    portal.speed = -15;
}
portal.draw = function (ctx) {
    ctx.save();
    ctx.fillStyle = "#000000";
//    ctx.strokeRect(this.x, this.y, 640, 500);
//    ctx.strokeRect(this.x + 30, this.y + 30, 300, 300);
    ctx.restore();
};

// Aisle image
var aisleReady = false;
var aisleImage = new Image();
aisleImage.onload = function () {
    aisleReady = true;
};
aisleImage.src = "images/aisles.png";

// The aisle object
var aisle = object (movingobject);
aisle.init = function () {
    aisle.name = "i'm the isle";
    aisle.row = 0;
    aisle.width = 4000;
    aisle.x = 0;
    aisle.y = 0;
    aisle.islookingup = false;
    aisle.dx = 0;
};
aisle.draw = function (ctx) {
    //  drawImage(image,      sx,     sy,               sWidth, sHeight, dx,  dy,      dWidth, dHeight)
    ctx.drawImage(aisleImage, this.x, (this.row * 500), 500,    500,     0,   this.y,  640,    400);
};

var rows = {
    bath: -20,
    pets: 480,
    beans: 980,
    snacks: 1480,
    mustard: 1980,
    produce: 2480,
    weapons: 2980,
    bones: 3480,
    random: function () {
        var therand = Math.random();
        if (therand < 0.1) {
            return this.pets;
        } else if (therand < 0.2) {
            return this.beans;
        } else if (therand < 0.3) {
            return this.snacks;
        } else if (therand < 0.4) {
            return this.mustard;
        } else if (therand < 0.5) {
            return this.produce;
        } else if (therand < 0.6) {
            return this.weapons;
        } else if (therand < 0.7) {
            return this.bones;
        } else {
            return this.bones;
        }
    },
    nameof: function (y) {
        if (y < 680) {
            return "bath";
        } else if (y < 1180) {
            return "pets";
        } else if (y < 1680) {
            return "beans";
        } else if (y < 2180) {
            return "snacks";
        } else if (y < 2680) {
            return "mustard";
        } else if (y < 3180) {
            return "produce";
        } else if (y < 3680) {
            return "weapons";
        } else {
            return "bones";
        }
    }
};

// Hiddenmother
var hiddenmother = object(movingobject);
hiddenmother.init = function () {
    hiddenmother.name = "I'm the hidden mother!";
    hiddenmother.speed = -15;
    hiddenmother.offset = 2;
    hiddenmother.scaleheadx = 4;
    hiddenmother.scaleheady = 4;
    hiddenmother.scalebodyx = 4;
    hiddenmother.scalebodyy = 7;
    hiddenmother.scalelegsx = 3;
    hiddenmother.scalelegsy = 13;
    hiddenmother.translatebodyx = 30;
    hiddenmother.translatebodyy = 120;
    hiddenmother.translatelegsx = 19;
    hiddenmother.translatelegsy = -220;
    hiddenmother.y = rows.random();
    hiddenmother.x = 500;
    hiddenmother.islookingup = false;
    hiddenmother.bodycolor = "#559421";
    hiddenmother.headcolor = "#F5CCB0";
    hiddenmother.legscolor = "#F5CCB0";
    hiddenmother.head = person.head;
    hiddenmother.body = person.body;
    hiddenmother.legs = person.legs;
    hiddenmother.draw = person.draw;
    hiddenmother.drawHead = person.drawHead;
    hiddenmother.drawBody = person.drawBody;
    hiddenmother.drawLegs = person.drawLegs;
    hiddenmother.drawOutline = person.drawOutline;
    hiddenmother.drawFilled = person.drawFilled;
    hiddenmother.collision = function () {
        if (Math.abs(this.x + 40 - canvas.width/2) < 40 && (this.y === -20 || this.y === 80)) {
            timeleft = 60;
            gamestate = "won";
        }
    }
};
