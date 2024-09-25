// Traffic Light Starter Code
// Oleh Pletmintsev
// 9/24/2024

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

let lightState = "green";
let lastSwichTime = 0;

const GREEN_LIGHT_DURATION = 3000;
const YELLOW_LIGHT_DURATION = 1500;
const RED_LIGHT_DURATION = 3000;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
  changeStateIfNeeded();
  changeLightState();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);
  //lights
  fill("grey");
  ellipse(width/2, height/2 - 65, 50, 50); //top
  fill("grey");
  ellipse(width/2, height/2, 50, 50); //middle
  fill("grey");
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}

function changeLightState(){
  if (lightState === "green"){
    fill("green");
    ellipse(width/2, height/2 + 65, 50, 50); //bottom
  } 

  else if (lightState === "yellow"){
    fill("yellow");
    ellipse(width/2, height/2, 50, 50); //middle
  }
  else if (lightState === "red"){
    fill("red");
    ellipse(width/2, height/2 - 65, 50, 50); //top
  }
}

function changeStateIfNeeded(){
  if (lightState === "green" && millis() > lastSwichTime + GREEN_LIGHT_DURATION){
    lightState = "yellow";
    lastSwichTime = millis();
  }

  else if (lightState === "yellow" && millis() > lastSwichTime + YELLOW_LIGHT_DURATION){
    lightState = "red";
    lastSwichTime = millis();
  }

  else if (lightState === "red" && millis() > lastSwichTime + RED_LIGHT_DURATION){
    lightState = "green";
    lastSwichTime = millis();
  }
}