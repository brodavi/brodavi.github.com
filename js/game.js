var FPS = 15;
var gamestate = "stopped";
var introInterval = 9;
var mainInterval = 9;
var timerInterval = 9;
var animInterval = 9;
var timeleft = 0;
var alphavalue = 0;
var timetext = "";
var animcount = 0;

var shopping_mall = new Audio("sounds/shopping_mall.mp3");
var openingmusic = new Audio("sounds/opening.mp3");
var badendingmusic = new Audio("sounds/ending.mp3");
var madness = new Audio("sounds/madness.mp3");
var heartbeat = new Audio("sounds/heartbeat.mp3");
var good_ending = new Audio("sounds/good_ending.mp3");

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 480;

// Update everything
var update = function () {
    for (var i = 0; i < people.length; i++){
        people[i].update();
    };
    player.update();
    aisle.update();
    portal.update();
    cry.update();
    hiddenmother.collision();
};

var updateTimer = function () {
    if (timeleft > 0) {
        timeleft -= 1;
    } else {
        timeleft = 0;
    }
}

// Draw everything
var render = function () {

    // Clear screen
    canvas.width = canvas.width;

    aisle.draw(ctx);
    portal.draw(ctx);

    ctx.lineWidth = 5;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < people.length; i++){
        people[i].draw(ctx);
    };

    player.draw(ctx);

    cry.draw(ctx);

    // Drawing RED
    ctx.save()
    if (timeleft > 1) {
        alphavalue = 1/(timeleft / 2);
    } else {
        alphavalue = 1;
    }
    ctx.fillStyle = "rgba(200,20,70," + alphavalue + ")"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "#FFFFFF"; 
    ctx.fillRect(0, 0, canvas.width, 80); // the white top background
    ctx.fillStyle = "#000000";
    ctx.strokeRect(0, 0, canvas.width, 80);
    ctx.restore();
    // Draw Instructions
    if (gamestate === "started") {
        ctx.save();
        ctx.fillStyle = "#000000";
        ctx.font = "13px Helvetica";
        ctx.textAlign = "right";
        ctx.fillText("Hit SPACE to look up.", canvas.width - 20, 15);
        ctx.fillText("Hit X to call to mommy.", canvas.width - 20, 35);
        ctx.fillText("Use LEFT and RIGHT to walk down aisle.", canvas.width - 20, 55);
        ctx.fillText("When you find an intersection, use UP or DOWN to switch aisles.", canvas.width - 20, 75);
        ctx.restore();
    }

    // Draw Countdown
    ctx.save();
    ctx.fillStyle = "#000000";
    ctx.lineWidth = 10;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.font = "24px Helvetica";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    if (timeleft > 0) {
        ctx.fillText("Time Left: " + timeleft, 100, 32);
    } else {
        ctx.fillText("Your Mother was on the " + rows.nameof(hiddenmother.y) + " aisle.", canvas.width/2, 130);
        ctx.fillText("Now she's gone, and so is everyone else.", canvas.width/2, 232);
        ctx.fillText("You are ALONE.", canvas.width/2, 372);
        endgame();
    }
    ctx.restore();

    if (shopping_mall.volume < 0.1 && timeleft > 30) {
        shopping_mall.volume += 0.001;
    } else {
        shopping_mall.volume = timeleft/480;
    }

    madness.volume = 1/((timeleft/2 + 1));
    heartbeat.volume = 1/((timeleft + 1));

    if (gamestate === "won") {
        startbutton.value = "Start Game";
        gamestate = "stopped";
        clearInterval(mainInterval);
        clearInterval(timerInterval);
        clearInterval(animInterval);
        madness.pause();
        heartbeat.pause();
        shopping_mall.pause();
        good_ending.play();

        ctx.save();
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(16, 105, 350, 30);
        ctx.fillStyle = "#000000";
        ctx.strokeRect(16, 105, 350, 30);
        ctx.font = "23px Helvetica";
        ctx.fillText("Oh, you found me all by yourself!", 20, 130);
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(16, 209, 200, 30);
        ctx.fillStyle = "#000000";
        ctx.strokeRect(16, 209, 200, 30);
        ctx.fillText("Such a silly baby.", 20, 232);
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(16, 350, 246, 30);
        ctx.fillStyle = "#000000";
        ctx.strokeRect(16, 350, 246, 30);
        ctx.fillText("You are never ALONE.", 20, 372);
        ctx.restore();
        init();
    }
};

// The main game loop
var main = function () {
    update();
    render();
};

// Initialize everything
var init = function () {
    lookingup = false;
    walkingleft = false;
    walkingright = false;
    walkingup = false;
    walkingdown = false;
    crying = false;
    animcount = 0;

    people = [hiddenmother];

    for (var i = 0; i < people.length; i++){
        people[i].init();
    };

    player.init();
    aisle.init();
    portal.init();
    cry.init();

    timeleft = 60;
    alphavalue = 0;
    timetext = "";
};

// Let's play this game!
var then = Date.now();

var endgame = function () {
    gamestate = "stopped";
    startbutton.value = "Start Game";
    clearInterval(mainInterval);
    clearInterval(timerInterval);
    clearInterval(animInterval);
    madness.pause();
    heartbeat.pause();
    shopping_mall.pause();
    badendingmusic.volume = 0.3;
    badendingmusic.play();
}

var togglegame = function () {
    good_ending.pause();
    if (gamestate === "stopped") {
        // Start Game (or re-start)
        clearInterval(introInterval);
        badendingmusic.pause();
        init();
        gamestate = "started";
        startbutton.value = "Stop Game";

        // play background sounds
        openingmusic.volume = 0.2;
        openingmusic.play();
        setTimeout(playmadness, 30000); // play madness 30 seconds in
        shopping_mall.volume = 0;
        shopping_mall.play();
        shopping_mall.loop = true;

        mainInterval = setInterval(main, 1000/FPS);
        animInterval = setInterval(anim, 70);
        timerInterval = setInterval(updateTimer, 1000); // Update timer once per second
    } else if (gamestate === "started") {
        init();
        canvas.width = canvas.width;
        gamestate = "stopped";
        startbutton.value = "Start Game";
        clearInterval(mainInterval);
        clearInterval(timerInterval);
        introInterval = setInterval(intro, 1000/FPS); // get intro started again
    }
};

var anim = function () {
    animcount += 1;
}

var playmadness = function () {
    madness.play();
    heartbeat.play();
    heartbeat.loop = true;
    heartbeat.volume = 0.1;
    madness.volume = 0.1;
};

// Make a start button
var buttondiv = document.createElement("div");
var startbutton = document.createElement("input");
startbutton.type = "button";
startbutton.onclick = togglegame;
startbutton.value = "Start Game";
buttondiv.appendChild(startbutton);
document.body.appendChild(buttondiv);
document.body.appendChild(canvas);

// The intro
var intro = function () {
    ctx.save();
    canvas.width = canvas.width;
    ctx.fillStyle = "#000000";
    ctx.lineWidth = 10;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.font = "24px Helvetica";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText("Your Mother was shopping.", canvas.width/2, 32);
    ctx.fillText("She said wait here, she had to go get some crackers.", canvas.width/2, 100);
    ctx.fillText("That was a long time ago. Go look for her.", canvas.width/2, 150);

    mother.init();
    mother.draw(ctx);
    ctx.restore();
}

// Start the intro
introInterval = setInterval(intro, 1000/FPS);