// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let circleX = 300;
let circleY = 200;
let circleSize = 50;

let squareX = 600;
let squareY = 175;

// left corner
let triangeX1 = 900;
let triangeY1 = 250;
// right corner
let triangeX2 = 1100;
let triangeY2 = 250;
// top corner
let triangeX3 = 1000;
let triangeY3 = 100;

//let quadX1 = 0;
//let quadY1 = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  circle(circleX, circleY, circleSize)

  square(squareX, squareY, 50)

  triangle(triangeX1, triangeY1, triangeX2, triangeY2, triangeX3, triangeY3)
 
  //quad(50, 62, 86, 50, 50, 38, 14, 50);

  if (mouseX && mouseY === circleX, circleY){
    if (mouseIsPressed === true){
      circle(mouseX, mouseY, circleSize);
      //if (mouseWheel )
    }
  }

}
