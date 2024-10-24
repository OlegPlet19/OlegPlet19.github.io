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
let shouldToggleNeighnours = false;

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

function windowResized() {
  if (windowWidth > windowHeight) {
    resizeCanvas(windowWidth, windowHeight);
  } 
  else {
    resizeCanvas(windowWidth, windowHeight);
  }

  cellSize = width/GRID_SIZE;
}

function draw() {
  background(220);

  displayGrid();
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  // Center
  toggleCell(x, y);

  // Neighbours
  if (shouldToggleNeighnours) {
    toggleCell(x + 1, y);
    toggleCell(x - 1, y);
    toggleCell(x, y + 1);
    toggleCell(x, y - 1);
  }
}

function toggleCell(x, y) {
  // Make sure the cell you toggeling is in the grid
  if (x >= 0 && 
     x < GRID_SIZE && 
     y >= 0 && 
     y < GRID_SIZE
  ) {
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    } 
    else {
      grid[y][x] = 0;
    }
  }
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
  if (key === "n") {
    shouldToggleNeighnours = !shouldToggleNeighnours;
  }  
  if (key === "space") {
    updateGrid();
  }
}

function updateGrid() {
  // Make another array to hold the term
  let nextTerm =  generateEmptyGrid(GRID_SIZE, GRID_SIZE);

  // Look at every cell
  for (ley = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      let neighbours = 0;

      // Look at every neighbour around
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          // Do not fall of the edge

          if (x + j >= 0 && x + j < GRID_SIZE && y + 1 >= 0 && y + i < GRID_SIZE) {
            neighbours += grid[y+i][x+j];
          }
        }

        if(grid[y][x] === 1) {

        }
      }
    }
  }
  return nextTerm;
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