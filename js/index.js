// Game Constant & Variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
let up = document.getElementById('up');
let down = document.getElementById('down');
let left = document.getElementById('left');
let right = document.getElementById('right');
let scoreBox = document.getElementById('scoreBox');
let hiscoreBox = document.getElementById('hiscoreBox');
let speed = 4;
score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
food = { x: 10, y: 15 };
// Game Functions
// Running infinite loop to update the keyframe by calling the function out of the function
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);

    // means if speed is 10 then 1/5 => 0.2 because the function call itselft hence make infinite loop means it after every 0.2 seconds function will run
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself
    for(let i = 1; i < snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x >= 18 || snake[0].x  <= 0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
    return false;
}

function gameEngine() {
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
      gameOverSound.play();
      musicSound.pause();
      inputDir = {x: 0, y: 0};
      alert("Game Over. Press any key to play again!");
      scoreBox.innerHTML = 'Score: ' + 0;
      snakeArr = [{x: 13, y: 15}];
      musicSound.play();
      score = 0;
      speed = 4;
    }
    
    // If you have eaten the food, increamenet the score and regenrate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        speed += 0.1;
        console.log(speed);
        if(score > hiscoreval){
          hiscoreval = score;
          localStorage.setItem('hiscore',JSON.stringify(hiscoreval));
          hiscoreBox.innerHTML = 'HiScore: ' + hiscoreval;
        }
        hiscoreBox.innerHTML = 'HiScore: ' + hiscoreval;
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a) * Math.random()), y: Math.round(a + (b-a) * Math.random())}
    }

    // Moving the snake
    for(let i = snakeArr.length - 2; i >= 0; i--){
        snakeArr[i+1] = {...snakeArr[i]};

  }
  
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;
  
  // Part 2: Display the snake and Food
  // Display the snake
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
  // Display the food
  foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  board.appendChild(foodElement);
}
// Main Logic starts here
window.requestAnimationFrame(main);
let hiscore = localStorage.getItem('hiscore');
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem('hiscore',JSON.stringify(hiscoreval));
    hiscoreBox.innerHTML = 'HiScore: 0';
}
else{
    hiscoreval = JSON.parse(hiscore);
    localStorage.setItem('hiscore',JSON.stringify(hiscoreval));
    hiscoreBox.innerHTML = 'HiScore: ' + localStorage.getItem('hiscore');
}
window.addEventListener("keydown", (e) => {
    inputDir = {x: 0, y: 1} //Start the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            // console.log('ArrowUp');
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            // console.log('ArrowDown');
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            // console.log('ArrowLeft');
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            // console.log('ArrowRight');
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }
});
window.addEventListener("click", (e) => {
    inputDir = {x: 0, y: 1} //Start the game
    moveSound.play();
    switch(e.target.id){
        case "up":
            // console.log('ArrowUp');
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "down":
            // console.log('ArrowDown');
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "left":
            // console.log('ArrowLeft');
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "right":
            // console.log('ArrowRight');
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }
});
