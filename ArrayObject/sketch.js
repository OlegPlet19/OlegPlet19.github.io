// Array And Object Notation Assigment
// Oleh Pletmintsev
// 08/10/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let player;
let walls = [];
let groundHeight = 100;
let amountOfWalls = 5;
let minDistanceBetweenWalls = 200;

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnPlayer();

  // Creating some amount of walls with checkiong on minimum distance
  for (let i = 0; i < amountOfWalls; i++) {
    let newWall = spawnWalls();

    // Checking too close distance betwwen walls
    while (!isValidWallPosition(newWall)) {
      newWall = spawnWalls(); // If too close creating again
    }

    walls.push(newWall);
  }
}

function draw() {
  background(220);

  isOnGroundOrWall(); 
  applyGravity();
  playerMovement();
  checkCollision();

  // Draw all wals
  for (let theWall of walls) {
    rect(theWall.x, theWall.y, theWall.width, theWall.height);
  }

  // Draw Player
  rect(player.x, player.y, player.width, player.height);

  // Draw Line
  line(0, height - groundHeight, width, height - groundHeight);
}

function spawnPlayer() {
  // Player's values
  player = {
    width : 50,
    height : 50,
    x : 50,
    y : 250,
    speed : 5, 
    jumpHeight : -15,
    isJumping : false,
    onGround : false,
    gravity : 0.8,
    velocity : 0,
    onWall : false, 
  };

  return player;
}

function playerMovement() {
  //Move right
  if (keyIsDown(68) && player.x < width - player.width) {
    if (player.onWall) {
      player.x += player.speed;
    } else {
      let canMoveRight = true;
      for (let theWall of walls) {
        if (checkCollisionRight(theWall)) {
          canMoveRight = false;
          break;
        }
      }
      if (canMoveRight) player.x += player.speed;
    }
  }

  //Move left
  if (keyIsDown(65) && player.x > 0) {
    if (player.onWall) {
      player.x -= player.speed; 
    } else {
      let canMoveLeft = true;
      for (let theWall of walls) {
        if (checkCollisionLeft(theWall)) {
          canMoveLeft = false;
          break;
        }
      }
      if (canMoveLeft) player.x -= player.speed;
    }
  }

  // Jumping is possible if the player is on the ground or on a wall
  if ((player.onGround || player.onWall) && keyIsDown(32) && !player.isJumping) {
    player.velocity = player.jumpHeight;
    player.isJumping = true;
    player.onWall = false; 
  }
}

function applyGravity() {
  player.y += player.velocity;
  player.velocity += player.gravity;

  if (player.y + player.height + groundHeight > height) {
    player.y = height - player.height - groundHeight;
    player.velocity = 0;
  }
}

function isOnGroundOrWall() {
  // Check if the player is standing on the ground or on a wall
  player.onGround = player.y + player.height + groundHeight >= height;
  player.onWall = false; 

  for (let i = 0; i < walls.length; i++) {
    let theWall = walls[i];

    // Check for collision with the top of the wall
    if (
      player.x + player.width > theWall.x &&
      player.x < theWall.x + theWall.width &&
      player.y + player.height > theWall.y &&
      player.y < theWall.y + theWall.height
    ) {
      player.y = theWall.y - player.height; 
      player.velocity = 0;
      player.isJumping = false;
      player.onWall = true; 
    }
  }

  if (player.onGround) {
    player.isJumping = false;
  }
}

function spawnWalls() {
  let wallHeight = random(50, 150); // Height of the wall
  let wallWidth = random(50, 150);   // Width of  the wall
  let wallX = random(100, width - wallWidth - 100); // X pos of the wall
  let wallY = height - groundHeight - wallHeight; // X pos of the wall + above ground

  return {
    height: wallHeight,
    width: wallWidth,
    x: wallX,
    y: wallY
  };
}

// Function to check for collision with the right side of the wall
function checkCollisionRight(theWall) {
  return (
    player.x + player.width > theWall.x &&
    player.x < theWall.x + theWall.width &&
    player.y + player.height > theWall.y &&
    player.y < theWall.y + theWall.height
  );
}

// Function to check for collision with the left side of the wall
function checkCollisionLeft(theWall) {
  return (
    player.x < theWall.x + theWall.width &&
    player.x + player.width > theWall.x &&
    player.y + player.height > theWall.y &&
    player.y < theWall.y + theWall.height
  );
}

// Checking that the distance between the walls is not less than the specified value
function isValidWallPosition(newWall) {
  for (let existingWall of walls) {
    let distX = abs(newWall.x - existingWall.x);
    let distY = abs(newWall.y - existingWall.y);

    // Check that wall is at a minimum distance.
    if (distX < minDistanceBetweenWalls && distY < minDistanceBetweenWalls) {
      return false; 
    }
  }
  return true; 
}

function checkCollision() {
  player.onGround = false; // Imagine player on ground

  for (let i = 0; i < walls.length; i++) {
    let theWall = walls[i];

    // Checking for above colision with wall
    if (
      player.x + player.width > theWall.x &&
      player.x < theWall.x + theWall.width &&
      player.y + player.height > theWall.y &&
      player.y < theWall.y + theWall.height
    ) {
      player.y = theWall.y - player.height;
      player.velocity = 0;
      player.isJumping = false;
      player.onGround = true;
    }
  }
}
