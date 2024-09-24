// Traffic Light Starter Code
// Oleh Pletmintsev
// 9/24/2024

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

let lightState = red;

let someTime = 2000;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  lights
  fill("red");
  ellipse(width/2, height/2 - 65, 50, 50); //top
  fill("yellow");
  ellipse(width/2, height/2, 50, 50); //middle
  fill("green");
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}

function changeLightState(){

}