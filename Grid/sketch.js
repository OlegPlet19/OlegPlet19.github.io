// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// If hardcoding the grid
// let grid = [[1, 0, 0, 1],
//             [0, 1, 1, 0], 
//             [0, 0, 1, 1], 
//             [1, 1, 1, 0]];

let grid;
let cellSize;
const GRID_SIZE = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);

  if (windowWidth > windowHeight) {
    cellSize = height/GRID_SIZE;
  } 
  else {
    cellSize = width/GRID_SIZE;
  }

  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
}

function draw() {
  background(220);

  displayGrid();
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }

  if (key === "w") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }

  if (key === "b") {
    grid = generateFilledGrid(GRID_SIZE, GRID_SIZE);
  }
}

function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === 1) {
        fill("black");
      } 
      else if (grid[y][x] === 0) {
        fill("white");
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function generateRandomGrid(colms, rows) {
  let newGrid = [];
  for (y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < colms; x++) {
      if (random(100) < 50) {
        newGrid[y].push(1);
      } 
      else {
        newGrid[y].push(0);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(colms, rows) {
  let newGrid = [];
  for (y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < colms; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}

function generateFilledGrid(colms, rows) {
  let newGrid = [];
  for (y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < colms; x++) {
      newGrid[y].push(1);
    }
  }
  return newGrid;
}