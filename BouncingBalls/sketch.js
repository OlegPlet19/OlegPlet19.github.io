// Bouncing-Balls
// Oleh Pletmintsev
// 03/10/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  for (let theBall of ballArray) {
    // Move the ball
    theBall.x += theBall.dx;
    theBall.y += theBall.dy;

    // Bounce if needed
    if (theBall.x > width - theBall.radius || theBall.x < 0 + theBall.radius){
      theBall.dx *= -1;
      spawnBall(theBall.x, theBall.y);
    }

    if (theBall.y > height - theBall.radius || theBall.y < 0 + theBall.radius){
      theBall.dy *= -1;
      spawnBall(theBall.x, theBall.y);
    }

    // Show the ball
    noStroke();
    fill(theBall.red, theBall.green, theBall.blue);
    circle(theBall.x, theBall.y, theBall.radius*2);
  }
}

function mousePressed(){
  for (let i = 0; i <= 10; i++){
    spawnBall(mouseX, mouseY);
  }
}

function spawnBall(theX, theY){
  let theBall = {
    x : theX, 
    y : theY,
    radius : random(30, 60),
    dx : random(-5, 5),
    dy : random(-5, 5),
    red : random(0, 255),
    green : random(0, 255),
    blue : random(0, 255),
  } ;

  ballArray.push(theBall);
}
