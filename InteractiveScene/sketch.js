// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let circleX = 400;
let circleY = 480;

let circleSpeed = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  circle(circleX, circleY, 50)

  if (keyIsDown(LEFT_ARROW)){
      circleX = circleX - circleSpeed;
  }

  if (keyIsDown(RIGHT_ARROW)){
    circleX = circleX + circleSpeed;
  }

}
