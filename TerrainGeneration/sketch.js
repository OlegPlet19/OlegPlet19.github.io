// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let terrain = [];
const NUMBER_OF_RECTS = 2000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  let widthOfRects = width / NUMBER_OF_RECTS;
  generateTerrains(widthOfRects);

}

function draw() {
  background(220);

  for (let someRect of terrain){
    //fill(random(0, 255), random(0, 255), random(0,255));
    rect(someRect.x, someRect.y, someRect.w, someRect.h);
  }
}

function generateTerrains(widthOfRects) {
  let time = 0;
  // let deltaTimne = 1;
  let deltaTimne = 0.8;

  for (let x = 0; x < width; x += widthOfRects){
    let theHeight = noise(time) * height; 
    let someRect = spawnRectangle(x, theHeight, widthOfRects);
    terrain.push(someRect);
    time += deltaTimne;
  }
}

function spawnRectangle(leftSide, rectHeight, rectWidth) {
  let theRect = {
    x : leftSide,
    y : height - rectHeight,
    w : rectWidth,
    h : rectHeight,
  } ;

  return theRect;
}