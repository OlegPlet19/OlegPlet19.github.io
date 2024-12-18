// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  recursiveCircles(width/2, height/2, width*2);
}

function recursiveCircles(x, y, radius) {
  circle(x, y, radius*2);

  // Escape cause
  if (radius > 50) {
    // Pattern
    recursiveCircles(x, y - radius/2, radius/2);
    recursiveCircles(x, y + radius/2, radius/2);
    recursiveCircles(x + radius/2, y, radius/2);
    recursiveCircles(x - radius/2, y, radius/2);
  }
}