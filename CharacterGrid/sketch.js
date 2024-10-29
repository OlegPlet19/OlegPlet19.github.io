// Character In Grid Demo
// Oleh
// Oct 29, 2024

let grid;
let cellSize;
const GRID_SIZE = 10;
const OPEN_TILE = 0;
const IMPOSSIBLE = 1;
const PLAYER = 9;
let thePlayer = {
  x: 0,
  y: 0,
};
let grassIMG;
let pathIMG;

function preload() {
  grassIMG = loadImage("grass.jpg");
  pathIMG = loadImage("path.jpg");
}

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);

  // Add player to thr grid
  grid[thePlayer.y][thePlayer.x] = PLAYER;
}

function windowResized() {
  if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  }
  else {
    resizeCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
}

function draw() {
  background(220);
  displayGrid();
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  //toggle self
  toggleCell(x, y);
}

function toggleCell(x, y) {
  //make sure the cell you're toggling is in the grid
  if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
    if (grid[y][x] === OPEN_TILE) {
      grid[y][x] = IMPOSSIBLE;
    }
    else if (grid[y][x] === IMPOSSIBLE) {
      grid[y][x] = OPEN_TILE;
    }
  }
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "e") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "s") { // Move down
    movePlayer(thePlayer.x, thePlayer.y + 1);
  }
  if (key === "w") { // Move up
    movePlayer(thePlayer.x, thePlayer.y - 1);
  }
  if (key === "a") { // Move left
    movePlayer(thePlayer.x - 1, thePlayer.y);
  }
  if (key === "d") { // Move right
    movePlayer(thePlayer.x + 1, thePlayer.y);
  }
}

function movePlayer(x, y) {
  //
  if (x >= 0 && x < GRID_SIZE &&
      y >= 0 && y < GRID_SIZE &&
      grid[y][x] === OPEN_TILE
  ) {
    // Player's previous location
    let oldX = thePlayer.x;
    let oldY = thePlayer.y; 
  
    // Keeping track of where thePlayer is
    thePlayer.x = x;
    thePlayer.y = y;
  
    //keep track of where I came from
    grid[oldY][oldX] = OPEN_TILE;
  
    // Put thePlayer in the grid
    grid[thePlayer.y][thePlayer.x] = PLAYER;
  }
}

function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === IMPOSSIBLE) {
        //fill("black");
        image(grassIMG, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === OPEN_TILE) {
        //fill("white");
        image(pathIMG, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === PLAYER) {
        fill("red");
        square(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      //make it a 1 half the time, a 0 half the time
      if (random(100) < 50) {
        newGrid[y].push(IMPOSSIBLE);
      }
      else {
        newGrid[y].push(OPEN_TILE);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(OPEN_TILE);
    }
  }
  return newGrid;
}