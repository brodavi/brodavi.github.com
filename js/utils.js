// Keyboard 'buffer'
var keysDown = {};
var lookingup = false;
var walkingleft = false;
var walkingright = false;
var walkingup = false;
var walkingdown = false;
var crying = false;

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
    if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 32) {
    e.preventDefault(); // stops browser from scrolling!
    }
    if (e.keyCode === 32) {
        lookingup = true;
    }
    if (e.keyCode === 37) {
        walkingleft = true;
    }
    if (e.keyCode === 39) {
        walkingright = true;
    }
    if (e.keyCode === 38) {
        walkingup = true;
    }
    if (e.keyCode === 40) {
        walkingdown = true;
    }
    if (e.keyCode === 88) {
        crying = true;
    }
    
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
    if (e.keyCode === 32) {
        lookingup = false;
    }
    if (e.keyCode === 37) {
        walkingleft = false;
    }
    if (e.keyCode === 39) {
        walkingright = false;
    }
    if (e.keyCode === 38) {
        walkingup = false;
    }
    if (e.keyCode === 40) {
        walkingdown = false;
    }
    if (e.keyCode === 88) {
        crying = false;
    }
}, false);

function drawEllipse(ctx, color, centerX, centerY, width, height) {
    
    ctx.beginPath();
  
    ctx.moveTo(centerX, centerY - height/2);
  
    ctx.bezierCurveTo(
        centerX + width/2, centerY - height/2,
        centerX + width/2, centerY + height/2,
        centerX, centerY + height/2);

    ctx.bezierCurveTo(
        centerX - width/2, centerY + height/2,
        centerX - width/2, centerY - height/2,
        centerX, centerY - height/2);
 
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function object (o) {
    function F() {}
    F.prototype = o;
    return new F();
}