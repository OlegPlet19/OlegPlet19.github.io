// Tic Tac Toe Game
// Oleh
// 10/28/24
//
// neural net
// Extra for Experts:

let grid = [[0, 0, 0], [0, 0, 0], [0, 0, 0],];
let cellSize;
const GRID_SIZE = 3;
let playerTurn = true;

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
}

// Creating changeble screen
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
  // checkThreeInARow();
  // checkTie();
}

// Getting the x and y pos 
function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  //toggle self
  toggleCell(x, y);
}

function toggleCell(x, y) {
  //make sure the cell you're toggling is in the grid
  if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) { // To not get off the screen
    if (grid[y][x] === 0 && playerTurn) { // Player X
      grid[y][x] = 1;
      playerTurn = !playerTurn;
    }
    else if (grid[y][x] === 0 && !playerTurn) { // Player O
      grid[y][x] = 2;
      playerTurn = !playerTurn;
    }
  }
  checkWin(x, y);
}

function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) { // Vertical
    for (let x = 0; x < GRID_SIZE; x++) { // Horizontal
      if (grid[y][x] === 1) { // Player X
        fill("black");
      }
      else if (grid[y][x] === 0) { // Empty spot
        fill("white");
      } 
      else if (grid[y][x] === 2) { // Player O
        fill("green");
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function checkWin(x, y) {
  if (grid[y][x] === 2) {
    console.log("that spot is green, y: " + y + ", and x: " + x);
  }
  if (grid[y][x] === 1) {
    console.log("that spot is black, y: " + y + ", and x: " + x);
  }
}

// function checkThreeInARow() {
//   for (let i = 0; i < 3; i++) {
//     if (grid[0][i] === 1 && grid[1][i] === 1 && grid[2][i] === 1 || 
//         grid[i][0] === 1 && grid[i][1] === 1 && grid[i][2] === 1 || 
//         grid[0][0] === 1 && grid[1][1] === 1 && grid[2][2] === 1 || 
//         grid[0][2] === 1 && grid[1][1] === 1 && grid[2][0] === 1
//     ) { 
//       return true;
//     }
//     else if (grid[0][i] === 2 && grid[1][i] === 2 && grid[2][i] === 2 || 
//             grid[i][0] === 2 && grid[i][1] === 2 && grid[i][2] === 2 ||
//             grid[0][0] === 2 && grid[1][1] === 2 && grid[2][2] === 2 || 
//             grid[0][2] === 2 && grid[1][1] === 2 && grid[2][0] === 2
//     ) { 
//       return true;
//     }
//   }
// }

// function checkTie() {
//   // check whether all squares are full and nobody has 3 in a row
//   for (let y = 0; y < 3; y++) {
//     for (let x = 0; x < 3; x++) {
//       if (grid[y][x] === 0) {
//         return false;
//       }   
//     }
//   }

//   if (checkThreeInARow()) {
//     console.log("X wins");
//     return false;
//   }
//   console.log("O wins");
//   return true;
// }