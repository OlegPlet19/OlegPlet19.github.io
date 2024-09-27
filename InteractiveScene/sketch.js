// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Ball
let ball_x = 200;
let ball_y = 200;

let ball_dx = 4;
let ball_dy= 2;

let ballRadius = 30;
let r = 0;
let g = 255;
let b = 255;

// player 1
let playerOneX = 50;
let playerOneY = 250;

//player 2
let playerTwoX = 750;
let playerTwoY = 250;

let playerHeight = 100;
let playerWidth = 25;

let bounceSideRight = true;

let playerOneScore = 0;
let playerTwoScore = 0;

let speedIncrease = 1;

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(220);

  text("Player 1 score: " + playerOneScore, 100, 50);
  text("Player 2 score: " + playerTwoScore, 650, 50);
  
  moveBall();
  bounceBall();
  displayBall();
  displayPlayer1();
  displayPlayer2();

  // Moves Player 1 up or down
  if (keyIsDown(87) && playerOneY > 0){
    playerOneY -= 5; 
  }
  else if (keyIsDown(83) && playerOneY < 500 - playerHeight){
    playerOneY += 5;
  } 

  // Moves Plater 2 up or down
  if (keyIsDown(UP_ARROW) && playerTwoY > 0){
    playerTwoY -= 5; 
  }
  else if (keyIsDown(DOWN_ARROW) && playerTwoY < 500 - playerHeight){
    playerTwoY += 5;
  } 
}

// Function that moves ball
function moveBall() {
  ball_x += ball_dx;
  ball_y += ball_dy;
}

function bounceBall() {
  // Checking collision with player
  if (!bounceSideRight){
    if (ball_x <= playerOneX + ballRadius + playerWidth){
      console.log("On line of hit with player 1");

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
    if (ball_x >= playerTwoX - ballRadius){
      console.log("On line of hit with player 2");

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
    ball_dy = ball_dy * -1 * speedIncrease;
    pickRandomColor();
  }
}

// Function that picks random color for ball
function pickRandomColor() {
  r = random(255);
  g = random(255);
  b = random(255);
}

// Show Ball
function displayBall() {
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
}