// Translating Rotating Demo

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background(220);

  push();
  // Moves the origin
  translate(200 ,200);
  rotate(mouseX);
  fill("red");
  square(0, 0, 50);
  pop();

  fill("green");
  rect(width/2, 400, width * 2, 200);
}
