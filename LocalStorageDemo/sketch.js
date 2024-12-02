// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let counter = 0;
let highestClick = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Only gets the highest number if it exist
  if (getItem("highest")) {
    highestClick = getItem("highest");
  }
}

function draw() {
  background(220);

  displayClicks();
  displayHighest();
}

function mousePressed() {
  counter++;
  if (counter > highestClick) {
    highestClick = counter;
    storeItem("highest" , highestClick);
  }
}

function displayClicks() {
  fill("black");
  textSize(50);
  text(counter, 100, height/2);
}

function displayHighest() {
  fill("green");
  textSize(50);
  text(highestClick, 400, height/2);
}