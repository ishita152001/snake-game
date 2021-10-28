// -----Declaring Game variables and constants----------
var inputDir = {
    x: 0,
    y: 0
};
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const backgroundSound = new Audio("music/music.mp3");
var lastPaintTime = 0;
var speed = 5;
var score = 0;
var snakeArr = [{
    x: 10,
    y: 15
}]
var food = {
    x: 5,
    y: 7
}
//--------Game Functions and methods---------------------------------------------
function main(ctime) // for current time
{
    window.requestAnimationFrame(main); //it will render the main function again and again , and will play as game loop
    //console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

//if snake collides
function isCollide(snake) {
    //If you bump into yourself
    for (var i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    //if you hit with walls
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 27 || snake[0].y <= 0) {
        return true;
    }
}

//game main methods
function gameEngine() {
    // update the snake array & food
    backgroundSound.play();
    //if snakes collide  
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        backgroundSound.pause();
        inputDir = {
            x: 0,
            y: 0
        };
        alert("Game over!!!!!!!!..Press any key to start!!!!!!!!!!!!!!!!!");
        snakeArr = [{
            x: 10,
            y: 15
        }];
        backgroundSound.play();
        score = 0;
        document.querySelector("#score").innerHTML = "Score: 0"

    }

    //if snake has eaten the food, increment the score and regenerate the food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        document.querySelector("#score").innerHTML = "Score: " + score;
        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x,
            y: snakeArr[0].y + inputDir.y
        });
        var a = 1;
        var b = 18;
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random()),
        }

    }

    //Move the snake
    for (var i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = {
            ...snakeArr[i]
        };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add("head");
        } else {
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    });


    //display the food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);


}

// ----Main Game logic of program-----

var hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", function (event) {
    inputDir = {
        x: 1,
        y: 0
    } //start the game
    moveSound.play();

    switch (event.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});