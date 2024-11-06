// Tic Tac Toe Game
// Oleh
// 10/28/24
//
// neural net
// Extra for Experts:

let grid = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
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
}

// Getting the x and y pos 
function mousePressed() {
  if (playerTurn) {
    let x = Math.floor(mouseX/cellSize);
    let y = Math.floor(mouseY/cellSize);

    if (grid[y][x] === 0) {
      toggleCell(x, y);
      playerTurn = false;

      if (!checkForWinner()) {
        aiMove(); // Player O
      }
    }
  }
}

function toggleCell(x, y) {
  if (grid[y][x] === 0 && playerTurn) {
    grid[y][x] = 1;
  } 
  else if (grid[y][x] === 0 && !playerTurn) {
    grid[y][x] = 2;
  }
  checkForWinner();
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
        fill("grey");
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
  if (winner === 1) { // Player X
    console.log("Player X wins!");
    noLoop(); // Stop the draw loop to prevent further moves
    return true;
  } 
  else if (winner === 2) { // Player O
    console.log("Player O wins!");
    noLoop(); // Stop the draw loop to prevent further moves
    return true;
  } 
  else if (checkTie()) {  //No winner
    console.log("It's a tie!");
    noLoop(); // Stop the draw loop to prevent further moves
    return true;
  }
  return false; // Game continues
}

function aiMove() {
  let emptyCells = [];

  // Find all empty cells
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (grid[y][x] === 0) {
        emptyCells.push({ x, y });
      }
    }
  }

  // Pick a random cell from the empty cells
  if (emptyCells.length > 0) {
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let move = emptyCells[randomIndex];
    toggleCell(move.x, move.y);
    playerTurn = true;
  }
}