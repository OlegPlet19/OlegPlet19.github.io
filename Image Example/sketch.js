// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let spungebob;

function preload(){
  spungebob = loadImage("spungebob.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  image(spungebob, mouseX, mouseY);
}
