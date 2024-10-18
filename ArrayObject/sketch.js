// Array And Object Notation Assigment
// Oleh Pletmintsev
// 08/10/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let player;
let wall;
let groundHeight = 100;
let amountOfWalls = 3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnPlayer();
  spawnWalls();
}

function draw() {
  background(220);

  isOnGround();
  applyGravity();
  playerMovement();

  // Rect that represents Player
  rect(player.x, player.y, player.width, player.height);
  //rect that represents Wall
  rect(wall.x, wall.y, wall.width, wall.height);
  // Line that represents Ground Line
  line(0, height - groundHeight, width, height - groundHeight);
}

function spawnPlayer() {
  // Player's values
  player = {
    width : 50,
    height : 50,
    x : 50,
    y : 250,
    speed : 10,
    jumpHeight : -15,
    jumpSpeed: 15,
    isJumping: true,
    onGround : false,
    gravity : 0.8,
    velocityy : 0,
  } ;

  return player;
}

function playerMovement() {
  // Function that moves Player
  if (// Move player to the right
    keyIsDown(68) && 
    player.x < width - player.width &&
    player.x + player.width < wall.x) { 
    player.x += player.speed;
  }

  if (keyIsDown(65) && player.x > 0 ) { // Move player to the left
    player.x -= player.speed;
  }

  if (keyIsDown(32) && player.onGround === true && player.isJumping === false) { // Jumping
    player.velocityy = player.jumpHeight;
    player.isJumping = true;
  }
}

function applyGravity() {
  // Move player downwards
  player.y += player.velocityy;
  player.velocityy += player.gravity;
  
  if (player.y + player.height + groundHeight> height) {
    player.y = height - player.height - groundHeight;
    player.velocityy = 0;
  }
}

function isOnGround() { 
  // Check is Player on ground
  player.onGround = player.y + player.height + groundHeight >= height;
  if (player.onGround) {
    player.isJumping = false;
  }
  console.log("on ground" + player.onGround);
}

function spawnWalls() {
  // Wall's values 
  wall = {
    height : player.height*2,
    width : player.width*2,
    x : 200,
    y : height - player.height*2 - groundHeight,
  } ;

  return wall;
}