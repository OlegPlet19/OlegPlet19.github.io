// Array And Object Notation Assigment
// Oleh Pletmintsev
// 08/10/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let player;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  drawPlayer();

  rect(player.playerX, player.playerY, player.playerWidth, player.playerHeight);
}

function drawPlayer() {
  player = {
    playerWidth : 50,
    playerHeight : 50,
    playerX : 50,
    playerY : 50,
    playerSpeed : 0,
    playerMass : 10,
  } ;

  return player;
}