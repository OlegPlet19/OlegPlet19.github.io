// Array And Object Notation Assigment
// Oleh Pletmintsev
// 08/10/2024
//
// Extra for Experts:
// learned a the ternary operator in JavaScript: return laserChance < 50 ? theLaser.vertical : theLaser.horizontal;
// Sound effects

let player;
let layerHit = false;

let wall;
let walls = [];
let amountOfWalls = 5;
let minDistanceBetweenWalls = 200;

let laserWeight = 0;
let laser;
let timeBetweenLasers = 0.5;
let currentTimeBetweenLasers = 0.5;

let groundHeight = 100;

function preload(){
  bounceFx = loadSound("Jump.mp3");
  endGameFx = loadSound("EndGame.wav");
}

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
  laser  = spawnLaser();  
}

function draw() {
  background(220);

  displayPlayer();
  displayWalls();
  displayLine();
  displayLaser();

  isOnGroundOrWall(); 
  applyGravity();
  playerMovement();
  checkCollision();
  checkCollisionWithLaser();
}

// Draw Player
function displayPlayer() {
  // Player color stands green when able to jump and red when not
  if (player.isJumping) {
    fill("red");
  } else {
    fill("green");
  }
  
  strokeWeight(1);
  stroke("black");
  rect(player.x, player.y, player.width, player.height);
}

// Draw all wals
function displayWalls() {
  fill("black");
  for (let theWall of walls) {
    rect(theWall.x, theWall.y, theWall.width, theWall.height);
  }
}

// Draw Line (ground)
function displayLine() {
  line(0, height - groundHeight, width, height - groundHeight);
}

// Function that displayes laser
function displayLaser() {
  currentTimeBetweenLasers -= 0.01;

// Check if time has passed between laser movements
if (currentTimeBetweenLasers <= 0) {
// Check if the player is inside the current laser before moving it
  if (
      (laser.x1 === laser.x2 && // If laser is vertical
        player.x + player.width >= laser.x1 &&
        player.x <= laser.x1 &&
        player.y + player.height >= laser.y1 &&
        player.y <= laser.y2) ||
      (laser.y1 === laser.y2 && // If laser is horizontal
        player.y + player.height >= laser.y1 &&
        player.y <= laser.y1 &&
        player.x + player.width >= laser.x1 &&
        player.x <= laser.x2)
    ) {
      // If the player is in the laser, pause the game
      console.log("GAME OVER!!!!");
      endGameFx.play();
      noLoop(); // Stop the game
    } else {
      // Move the laser to a new position
      laser = spawnLaser();
    }

    // Reset the current time between lasers
    currentTimeBetweenLasers = timeBetweenLasers;
  }

  // Updating the weight of laser's stroke
  if (laserWeight >= 10) {
    laserWeight = 0;
  }
  laserWeight += 0.2;
  strokeWeight(laserWeight);
  stroke('red');

  // Draw laser
  line(laser.x1, laser.y1, laser.x2, laser.y2);
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
    isJumping : true,
    onGround : false,
    gravity : 0.8,
    velocity : 0,
    onWall : false, 
  };

  return player;
}

// Function that sets and returns wall's values
function spawnWalls() {
  let wallHeight = random(75, 150); // Height of the wall
  let wallWidth = random(75, 150);   // Width of  the wall
  let wallX = random(100, width - wallWidth - 100); // X pos of the wall
  let wallY = random(0 + wallHeight, height - groundHeight - wallHeight); // Y pos of the wall + above ground

  return {
    height: wallHeight,
    width: wallWidth,
    x: wallX,
    y: wallY
  };
}

// Function that sets and returns laser's values
function spawnLaser() {
  let minDistanceOfLaser = 50;

  let x1 = random(minDistanceOfLaser, width - minDistanceOfLaser); // Setting up x1 for vertical laser 
  let y1 = random(minDistanceOfLaser, height - minDistanceOfLaser - groundHeight); // Setting up y1 for horizontal laser 

  theLaser = {
    vertical : { 
      y1 : 0,
      y2 : height,
      x1 : x1,
      x2: x1, 
    },

    horizontal : {
      x1 : 0,
      x2 : width,
      y1 : y1,
      y2: y1,
    },
  };

  let laserChance = random(100);

  return laserChance < 50 ? theLaser.vertical : theLaser.horizontal;
}

// Function that moves player 
function playerMovement() {
  //Move right
  if (keyIsDown(68) && player.x < width - player.width) {
    if (player.onWall) {
      player.x += player.speed;
    } 
    else {
      let canMoveRight = true;
      for (let theWall of walls) {
        if (checkCollisionRight(theWall)) {
          canMoveRight = false;
          break;
        }
      }
      if (canMoveRight){
        player.x += player.speed;
      } 
    }
  }

  //Move left
  if (keyIsDown(65) && player.x > 0) {
    if (player.onWall) {
      player.x -= player.speed; 
    } 
    else {
      let canMoveLeft = true;
      for (let theWall of walls) {
        if (checkCollisionLeft(theWall)) {
          canMoveLeft = false;
          break;
        }
      }
      if (canMoveLeft) {
        player.x -= player.speed;
      }
    }
  }

  // Jumping is possible if the player is on the ground or on a wall
  if (keyIsDown(32) && !player.isJumping) {
    player.velocity = player.jumpHeight;
    player.isJumping = true;
    player.onWall = false;
    bounceFx.play();
  }
}

// Function that creates gravity
function applyGravity() {
  player.y += player.velocity;
  player.velocity += player.gravity;

  if (player.y + player.height + groundHeight > height) {
    player.y = height - player.height - groundHeight;
    player.velocity = 0;
  }
}

// Check if the player is standing on the ground or on a wall
function isOnGroundOrWall() {
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

// Fucntion that checks collison between player and wall
function checkCollision() {
  player.onGround = false; // Imagine player on ground

  for (let i = 0; i < walls.length; i++) {
    let theWall = walls[i];

    // Checking for above colision with wall
    if (
      player.x + player.width > theWall.x && // player's X pos + width is bigger than wall's X pos
      player.x < theWall.x + theWall.width && // player's X pos is less than wall's X pos + width of wall
      player.y + player.height > theWall.y && // player's Y pos + player's height is bigger than wall's Y pos
      player.y < theWall.y + theWall.height // player's Y pos is less than wall's Y pos + wall's heght
    ) {
      player.y = theWall.y - player.height;
      player.velocity = 0;
      player.isJumping = false;
      player.onGround = true;
    }
  }
}

function checkCollisionWithLaser() {
  // Vertical laser collision check
  if (laser.x1 === laser.x2) { // Vertical laser
    if (
      player.x + player.width >= laser.x1 &&  // Player's right side crosses x1 laser
      player.x <= laser.x1 &&                 // Player's left side crosses x1 laser
      player.y + player.height >= laser.y1 && // Player's bottom is below the laser's top border
      player.y <= laser.y2                    // The top of the player is above the bottom of the laser
    ) {
      playerHit = true; // Player was hit by the laser
    }
  }

  // Check for collision with horizontal laser
  if (laser.y1 === laser.y2) { // Horizontal laser
    if (
      player.y + player.height >= laser.y1 &&  // Player's bottom intersects y1 laser
      player.y <= laser.y1 &&                  // The player's top crosses the y1 laser
      player.x + player.width >= laser.x1 &&   // The player's right side is behind the start of the laser
      player.x <= laser.x2                     // Player's left side before the end of the laser
    ) {
      playerHit = true; // Player was hit by a laser
    }
  }
}