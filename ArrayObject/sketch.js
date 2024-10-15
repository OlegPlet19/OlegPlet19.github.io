// Array And Object Notation Assigment
// Oleh Pletmintsev
// 08/10/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let player;

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnPlayer();
}

function draw() {
  background(220);

  playerMovement();
  gravity();

  // Rect that represents Player
  rect(player.playerX, player.playerY, player.playerWidth, player.playerHeight);
  line(0, height - 100, width, height -100);
}

function spawnPlayer() {
  // Player's values
  player = {
    playerWidth : 50,
    playerHeight : 50,
    playerX : 50,
    playerY : 250,
    playerSpeed : 10,
    playerMass : 10,
    playerJumpHeight : 100,
    isOnGround : false,
  } ;

  return player;
}

function playerMovement() {
  // Function that moves Player
  if ((keyIsDown(68)) && player.playerX < width - player.playerWidth /*=== true*/) {
    player.playerX += player.playerSpeed;
  }

  if ((keyIsDown(65)) /*&& player.playerX > width - player.playerWidth /*=== true*/) {
    player.playerX -= player.playerSpeed;
  }

  if ((keyIsDown(32)) && isOnGround === true) {
    player.playerY -= player.playerJumpHeight;
  }
}

function gravity() {
  if (player.playerY < height - 100 - player.playerHeight) {
    isOnGround = false;
    player.playerY += 5;
  } else {
    isOnGround = true;
  }
}