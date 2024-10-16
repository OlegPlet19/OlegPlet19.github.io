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

  isOnGround();
  applyGravity();
  playerMovement();

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
    playerJumpHeight : -15,
    playerJumpSpeed: 15,
    isJumping: true,
    OnGround : false,
    gravity : 0.8,
    velocityY : 0,
  } ;

  return player;
}

function playerMovement() {
  // Function that moves Player
  if (keyIsDown(68) && player.playerX < width - player.playerWidth) {
    player.playerX += player.playerSpeed;
  }

  if (keyIsDown(65) && player.playerX > 0) {
    player.playerX -= player.playerSpeed;
  }

  if (keyIsDown(32) && player.OnGround === true && player.isJumping === false) {
    player.velocityY = player.playerJumpHeight;
    player.isJumping = true;
  }
}

function applyGravity() {
  player.playerY += player.velocityY;
  player.velocityY += player.gravity;
  
  if (player.playerY + player.playerHeight > height) {
    player.playerY = height - player.playerHeight;
    player.velocityY = 0;
  }
}

function isOnGround() {
  player.OnGround = player.playerY + player.playerHeight >= height;
  if (player.OnGround) {
    player.isJumping = false;
  }
  console.log("on ground" + player.OnGround);
}