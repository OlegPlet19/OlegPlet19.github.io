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

function draw() {
  background(220);
  displayGrid();
}

// Getting the x and y pos 
function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  // Toggle cell and check for winner or tie after each move
  toggleCell(x, y);
}

function toggleCell(x, y) {
  // Make sure the cell you're toggling is in the grid
  if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) { // To not get off the screen
    if (grid[y][x] === 0 && playerTurn) { // Player X
      grid[y][x] = 1;
      playerTurn = !playerTurn;
    }
    else if (grid[y][x] === 0 && !playerTurn) { // Player O
      grid[y][x] = 2;
      playerTurn = !playerTurn;
    }
    checkForWinner();
  }
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

function checkThreeInARow() {
  for (let i = 0; i < 3; i++) {
    // Check for X win conditions
    if (grid[0][i] === 1 && grid[1][i] === 1 && grid[2][i] === 1 || 
        grid[i][0] === 1 && grid[i][1] === 1 && grid[i][2] === 1 || 
        grid[0][0] === 1 && grid[1][1] === 1 && grid[2][2] === 1 || 
        grid[0][2] === 1 && grid[1][1] === 1 && grid[2][0] === 1
    ) { 
      return 1;
    }
    // Check for O win conditions
    else if (grid[0][i] === 2 && grid[1][i] === 2 && grid[2][i] === 2 || 
            grid[i][0] === 2 && grid[i][1] === 2 && grid[i][2] === 2 ||
            grid[0][0] === 2 && grid[1][1] === 2 && grid[2][2] === 2 || 
            grid[0][2] === 2 && grid[1][1] === 2 && grid[2][0] === 2
    ) { 
      return 2;
    }
  }
  return 0; // No winner
}

function checkTie() {
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (grid[y][x] === 0) {
        return false; // There are still empty spots
      }   
    }
  }
  return true; // All spots are filled
}

function checkForWinner() { 
  let winner = checkThreeInARow();
  if (winner === 1) {
    console.log("Player X wins!");
    noLoop(); // Stop the draw loop to prevent further moves
  }
  else if (winner === 2) {
    console.log("Player O wins!");
    noLoop(); // Stop the draw loop to prevent further moves
  }
  else if (checkTie()) {
    console.log("It's a tie!");
    noLoop(); // Stop the draw loop to prevent further moves
  }
}