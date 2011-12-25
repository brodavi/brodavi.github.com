var people = [];

var person = {
    x: 0,
    y: 0,
    scaleheady: 1,
    scaleheadx: 1,
    scalebodyy: 1,
    scalebodyx: 1,
    scalelegsy: 1,
    scalelegsx: 1,
    translatebodyx: 1,
    translatebodyy: 1,
    translatelegsx: 1,
    translatelegsy: 1,
    offset: 0,
    head: [8, 6, 4, 20, 16, 32, 32, 22, 32, 8, 20, 4],
    body: [3, 0, 0, 14, 10, 14, 9, 0],
    legs: [10, 32, 2, 50, 7, 51, 14, 40, 18, 51, 23, 50, 16, 32],
    bodycolor: "#555555",
    headcolor: "#F5CCB0",
    legscolor: "#555555",
    lookingup: false,
    update: function () {
        if (lookingup) { // Player looking up
            if (!this.islookingup) { // if not already looking up,
                this.islookingup = true;
                this.y += 100;
            }
        }
        if (!lookingup && this.islookingup) { // player not looking up, but we're still looked up
            this.islookingup = false;
            this.y -= 100;
        }
    },
    draw: function (ctx) {

        ctx.save(); // Save Gobal

        ctx.translate(this.x, this.y); // Move everything to this person's x, y

        ctx.save(); // Save Whole-Person Translation

        // Draw the legs
        ctx.translate(this.translatelegsx, this.translatelegsy);
        ctx.scale(this.scalelegsx, this.scalelegsy);
        this.drawFilled(ctx, this.drawLegs, this.legs, this.legscolor);

        // Draw the legs outline
        this.drawOutline(ctx, this.drawLegs, this.legs);

        ctx.restore(); // Restore Whole-Person Translateion
        ctx.save(); // Save it again (for head)

        // Draw the body
        ctx.translate(this.translatebodyx, this.translatebodyy);
        ctx.scale(this.scalebodyx, this.scalebodyy);
        this.drawFilled(ctx, this.drawBody, this.body, this.bodycolor);

        // Draw the body outline
        this.drawOutline(ctx, this.drawBody, this.body);

        ctx.restore(); // Restore Whole-Person Translation

        // Draw the head
        ctx.scale(this.scaleheadx, this.scaleheady);
        this.drawFilled(ctx, this.drawHead, this.head, this.headcolor);

        // Draw the head outline
        this.drawOutline(ctx, this.drawHead, this.head);

        ctx.restore(); // Restore Global

//        drawEllipse(ctx, "blue", this.x, this.y, 20, 40);
//        drawEllipse(ctx, "blue", this.x + 40, this.y, 20, 40);
    },
    drawHead: function (ctx, head) {
        ctx.moveTo(head[0] + Math.cos(Math.PI * 2 * Math.random()) * 0.5, head[1] + Math.sin(Math.PI * 2 * Math.random()) * 0.5);
        ctx.lineTo(head[2] + Math.sin(Math.PI * 2 * Math.random()) * 0.5, head[3] + Math.cos(Math.PI * 2 * Math.random()) * 0.5);
        ctx.lineTo(head[4] + Math.cos(Math.PI * 2 * Math.random()) * 0.5, head[5] + Math.sin(Math.PI * 2 * Math.random()) * 0.5);
        ctx.lineTo(head[6] + Math.sin(Math.PI * 2 * Math.random()) * 0.5, head[7] + Math.cos(Math.PI * 2 * Math.random()) * 0.5);
        ctx.lineTo(head[8] + Math.cos(Math.PI * 2 * Math.random()) * 0.5, head[9] + Math.sin(Math.PI * 2 * Math.random()) * 0.5);
        ctx.lineTo(head[10] + Math.sin(Math.PI * 2 * Math.random()) * 0.5, head[11] + Math.cos(Math.PI * 2 * Math.random()) * 0.5);
    },
    drawBody: function (ctx, body) {
        ctx.scale(1.5, 1.5);
        ctx.moveTo(body[0] + Math.sin(Math.PI * 2 * Math.random()) * 0.5, body[1] + Math.cos(Math.PI * 2 * Math.random()) * 0.5);
        ctx.lineTo(body[2] + Math.cos(Math.PI * 2 * Math.random()) * 0.5, body[3] + Math.sin(Math.PI * 2 * Math.random()) * 0.5);
        ctx.lineTo(body[4] + Math.cos(Math.PI * 2 * Math.random()) * 0.5, body[5] + Math.cos(Math.PI * 2 * Math.random()) * 0.5);
        ctx.lineTo(body[6] + Math.sin(Math.PI * 2 * Math.random()) * 0.5, body[7] + Math.cos(Math.PI * 2 * Math.random()) * 0.5);
    },
    drawLegs: function (ctx, legs) {
        ctx.moveTo(legs[0] + Math.sin(Math.PI * 2 * Math.random()) * 0.5, legs[1] + Math.cos(Math.PI * 2 * Math.random()) * 0.5);
        ctx.lineTo(legs[2] + Math.cos(Math.PI * 2 * Math.random()) * 0.5, legs[3] + Math.sin(Math.PI * 2 * Math.random()) * 0.5);
        ctx.lineTo(legs[4] + Math.cos(Math.PI * 2 * Math.random()) * 0.5, legs[5] + Math.cos(Math.PI * 2 * Math.random()) * 0.5);
        ctx.lineTo(legs[6] + Math.sin(Math.PI * 2 * Math.random()) * 0.5, legs[7] + Math.cos(Math.PI * 2 * Math.random()) * 0.5);   
        ctx.lineTo(legs[8] + Math.cos(Math.PI * 2 * Math.random()) * 0.5, legs[9] + Math.sin(Math.PI * 2 * Math.random()) * 0.5);
        ctx.lineTo(legs[10] + Math.sin(Math.PI * 2 * Math.random()) * 0.5, legs[11] + Math.cos(Math.PI * 2 * Math.random()) * 0.5);
        ctx.lineTo(legs[12] + Math.cos(Math.PI * 2 * Math.random()) * 0.5, legs[13] + Math.sin(Math.PI * 2 * Math.random()) * 0.5);
    },
    drawFilled: function (ctx, partf, partarray, color) {
        ctx.save();
        ctx.beginPath();
        partf(ctx, partarray);
        ctx.fillStyle = color;
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    },
    drawOutline: function (ctx, partf, partarray) {
        ctx.save();
        ctx.scale(1.04, 1.04);
        ctx.translate(-1.3, -1.8);
        ctx.lineWidth = 2;
        ctx.beginPath();
        partf(ctx, partarray);
        ctx.fillStyle = "#000000";
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }
}

// Mother
var mother = object(person);
mother.init = function () {
    mother.name = "I'm the intro mother";
    mother.offset = 2;
    mother.scaleheadx = 2.5;
    mother.scaleheady = 2.5;
    mother.scalebodyx = 3;
    mother.scalebodyy = 6;
    mother.scalelegsx = 2;
    mother.scalelegsy = 7;
    mother.translatebodyx = 20;
    mother.translatebodyy = 60;
    mother.translatelegsx = 15;
    mother.translatelegsy = -70;
    mother.x = 270;
    mother.y = 200;
    mother.bodycolor = "#559421";
    mother.legscolor = "#F5CCB0";
};

// The Player
var player = object(person);
player.init = function () {
    player.name = "I'm the player";
    player.offset = 17;
    player.scaleheadx = 4;
    player.scaleheady = 4;
    player.scalebodyx = 4;
    player.scalebodyy = 4;
    player.scalelegsx = 3;
    player.scalelegsy = 2;
    player.translatebodyx = 30;
    player.translatebodyy = 100;
    player.translatelegsx = 20;
    player.translatelegsy = 100;
    player.x = 256;
    player.y = 250;
    player.islookingup = false;
    player.bodycolor = "#12B5C7";
    player.legscolor = "#12B5C7";
};