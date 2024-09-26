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
let playerTwoX = 0;
let playerTwoY = 0;

let playerHeight = 100;
let playerWidth = 25;

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(220);
  
  moveBall();
  bounceBall();
  displayBall();
  displayPlayer1();

  if (keyIsDown(87) && playerOneY > 0){
    playerOneY -= 5; 
  }
  else if (keyIsDown(83) && playerOneY < 500 - playerHeight){
    playerOneY += 5;
  } 
}

function moveBall() {
  //move
  ball_x += ball_dx;
  ball_y += ball_dy;
}

function bounceBall() {
  // checking collision with player
  if (ball_x <= playerOneX + ballRadius + playerWidth / 2){
    console.log("On line of hit");

    if (ball_y >= playerOneY && ball_y <= playerOneY + playerHeight) {
      console.log("bounce");

      ball_dx *= -1;
      pickRandomColor();
    }
  }

  //bounce if needed
  if (ball_x >= width - ballRadius || ball_x <= 0 + ballRadius) {
    ball_dx = ball_dx * -1;
    pickRandomColor();
  }

  if (ball_y >= height - ballRadius || ball_y <= 0 + ballRadius) {
    ball_dy = ball_dy * -1;
    pickRandomColor();
  }
}

function pickRandomColor() {
  r = random(255);
  g = random(255);
  b = random(255);
}

function displayBall() {
  //display
  fill(r, g, b);
  circle(ball_x, ball_y, ballRadius * 2);
}

function displayPlayer1(){
  fill("black");
  rect(playerOneX, playerOneY, playerWidth, playerHeight);
}