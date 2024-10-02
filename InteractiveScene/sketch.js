// A simple adaptation of the table tennis game
// Oleh Pletmintsev
// 30.09.2024
//
// Extra for Experts:
// Lists for using random explored and used, no cursor on game canvas, text on game canvas, using mousewheel to change background color
//
//How to play:
//"W" and "S" for Player 1 movement, UP_ARROW and DOWN_ARROW for Player 2 movement, buy pressing buttons "1", "2", "3" you can chooose ball's speed
// scroll mousewheel to change background color

// Ball
let ball_x = 960;
let ball_y = 540;

let ball_dx = 4;
let ball_dy= 2;

let ballRadius = 30;
let r = 0;
let g = 255;
let b = 255;

let  ballSpeed = 1;

// player 1
let playerOneX = 50;
let playerOneY = 250;

//player 2
let playerTwoX = 1800;
let playerTwoY = 250;

let playerHeight = 100;
let playerWidth = 25;

// Debug
let bounceSideRight = true;

// Statistics
let playerOneScore = 0;
let playerTwoScore = 0;

let speedIncrease = 1;

let ballXDirection = [-5, -4, -3, 3, 4, 5];
let ballYDirection = [-2, -1, 1, 2];

// Background
let rColor = 255;
let gColor = 255;
let bColor = 255;

function setup(){
  createCanvas(windowWidth, windowHeight);

  ball_x = windowWidth/2;
  ball_y = windowHeight/2;

  playerWidth = windowWidth/35;
  playerHeight = windowHeight/4;

  ballRadius = (windowHeight + windowWidth)/60;

  ball_dx = random(ballXDirection);
  ball_dy = random(ballYDirection);
  noCursor();
}

function draw(){

  background(rColor, gColor, bColor);

  text("Player 1 score: " + playerOneScore, 150, 50);
  text("Player 2 score: " + playerTwoScore, windowWidth - 250, 50);
  text("Ball's speed: " + ballSpeed, windowWidth / 2 - 50, 50);
  
  moveBall();
  bounceBall();
  displayBall();
  displayPlayer1();
  displayPlayer2();
  setBallSpeed();

  // Moves Player 1 up or down
  if (keyIsDown(87) && playerOneY > 0){
    playerOneY -= 5; 
  }
  else if (keyIsDown(83) && playerOneY < windowHeight - playerHeight){
    playerOneY += 5;
  } 

  // Moves Plater 2 up or down
  if (keyIsDown(UP_ARROW) && playerTwoY > 0){
    playerTwoY -= 5; 
  }
  else if (keyIsDown(DOWN_ARROW) && playerTwoY < windowHeight - playerHeight){
    playerTwoY += 5;
  } 
}

// Function that moves ball
function moveBall(){
  ball_x += ball_dx * ballSpeed;
  ball_y += ball_dy * ballSpeed;
}

// Function that makes ball bounce from platforms and ends game if one of players loses
function bounceBall(){
  if (ball_dx > 0){
    bounceSideRight = true;
  } else {
    bounceSideRight = false;
  }

  // Checking collision with player
  if (!bounceSideRight){
    // Checking collision with wall
    if (ball_x < playerOneX){
      console.log("Game end");

      text("Player 2 Won! Update the page to play again.", windowWidth/2 - 150, windowHeight/2);

      pause();
    }

    // Checking X-coordinate of ball to collide with moving brick
    if (ball_x <= playerOneX + ballRadius + playerWidth){
      console.log("On line of hit with player 1");

      // Checking Y-coordinate of ball to collide with moving brick
      if (ball_y >= playerOneY && ball_y <= playerOneY + playerHeight) {
        console.log("bounce");

        ball_dx *= -1;
        pickRandomColor();

        bounceSideRight = !bounceSideRight;

        playerOneScore++;
        speedIncrease += 0.1;
      }
    }
  }
  else{
    // Checking collision with wall
    if (ball_x > playerTwoX + playerWidth){
      console.log("Game end");

      text("Player 1 Won! Update the page to play again.", windowWidth/2 - 150, windowHeight/2);

      pause();
    }
    
    // Checking X-coordinate of ball to collide with moving brick
    if (ball_x >= playerTwoX - ballRadius){
      console.log("On line of hit with player 2");

      // Checking Y-coordinate of ball to collide with moving brick
      if (ball_y >= playerTwoY && ball_y <= playerTwoY + playerHeight) {
        console.log("bounce");

        ball_dx *= -1;
        pickRandomColor();

        bounceSideRight = !bounceSideRight;

        playerTwoScore++;
        speedIncrease += 0.1;
      }
    }  
  }

  // Bounce if needed
  if (ball_x >= width - ballRadius || ball_x <= 0 + ballRadius) {
    ball_dx = ball_dx * -1 * speedIncrease;
    pickRandomColor();
    bounceSideRight = !bounceSideRight;
  }

  // Bounce if needed
  if (ball_y >= height - ballRadius || ball_y <= 0 + ballRadius) {
    ball_dy = ball_dy * -1;
    pickRandomColor();
  }
}

// Function that picks random color for ball
function pickRandomColor(){
  r = random(255);
  g = random(255);
  b = random(255);
}

// Show Ball
function displayBall(){
  //display
  fill(r, g, b);
  circle(ball_x, ball_y, ballRadius * 2);
}

// Show Player 1
function displayPlayer1(){
  fill("black");
  rect(playerOneX, playerOneY, playerWidth, playerHeight);
}

// Show Player 2
function displayPlayer2(){
  fill("black");
  rect(playerTwoX, playerTwoY, playerWidth, playerHeight);
  playerTwoX = windowWidth - playerOneX - playerWidth;
}

// Changes backgroung by pressing mouse wheel
function mouseWheel(){
  rColor = random(0, 255);
  gColorColor = random(0, 255);
  bColor = random(0, 255);
}

// Function that increases ball's speed
function setBallSpeed(){
  if (keyCode === 49){
    ballSpeed = 1;
  }
  if (keyCode === 50){
    ballSpeed = 2;
  }
  if (keyCode === 51){
    ballSpeed = 3;
  }
}