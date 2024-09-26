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
let playerX = 50;
let playerY = 250;
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

  if (keyIsDown(87) && playerY > 0){
    playerY -= 5; 
  }
  else if (keyIsDown(83) && playerY < 500 - playerHeight){
    playerY += 5;
  } 
}

function moveBall() {
  //move
  ball_x += ball_dx;
  ball_y += ball_dy;
}

function bounceBall() {
  // checking collision with player


  // if (ball_x === playerX - playerWidth && ball_y === playerY + playerHeight/2 || ball_y === playerY - playerHeight){
  //   ball_dx = ball_dx * -1;
  //   pickRandomColor();
  // }

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
  rect(playerX, playerY, playerWidth, playerHeight);
}