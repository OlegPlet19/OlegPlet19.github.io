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
let circleIMG;
let xIMG;

function preload() {
  circleIMG = loadImage("Circle.png");
  xIMG = loadImage("XImage.png");
}

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = (height-200)/GRID_SIZE;
}

// Creating changeble screen
function windowResized() {
  if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  }
  else {
    resizeCanvas(windowHeight, windowHeight);
  }
  cellSize = (height-200)/GRID_SIZE;
}

function draw() {
  background(220);
  displayGrid();
  displayText();
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
      square(x * cellSize, y * cellSize, cellSize);
      //square((x + 0.5) * cellSize, y * cellSize, cellSize);
      if (grid[y][x] === 1) { // Player X
        //fill("black");
        image(xIMG, x * cellSize, y * cellSize, cellSize, cellSize);
        //image(xIMG, (x + 0.5) * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === 0) { // Empty spot
        fill("white");
      } 
      else if (grid[y][x] === 2) { // Player O
        //fill("grey");
        image(circleIMG, x * cellSize, y * cellSize, cellSize, cellSize);
        //image(circleIMG, (x + 0.5) * cellSize, y * cellSize, cellSize, cellSize);
      }
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
      return 1; // Player X
    }
    // Check for O win conditions
    else if (grid[0][i] === 2 && grid[1][i] === 2 && grid[2][i] === 2 || 
            grid[i][0] === 2 && grid[i][1] === 2 && grid[i][2] === 2 ||
            grid[0][0] === 2 && grid[1][1] === 2 && grid[2][2] === 2 || 
            grid[0][2] === 2 && grid[1][1] === 2 && grid[2][0] === 2
    ) { 
      return 2; // Player O
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
    text("Player X wins!", 50, windowHeight - 100);
    noLoop(); // Stop the draw loop to prevent further moves
  } 
  else if (winner === 2) { // Player O
    console.log("Player O wins!");
    text("Player O wins!", 50, windowHeight - 100);
    noLoop(); // Stop the draw loop to prevent further moves
  } 
  else if (checkTie()) {  //No winner
    console.log("It's a tie!");
    text("It's a tie!", 50, windowHeight - 100);
    noLoop(); // Stop the draw loop to prevent further moves
  }
}

function aiMove() {
  // Check if AI can win with the next move
  let move = findWinningMove(2);  // AI (Player O) is represented by 2
  if (move) {
    toggleCell(move.x, move.y);
    playerTurn = true;
    return;
  }

  // Check if AI needs to block the player from winning
  move = findWinningMove(1);  // Player X is represented by 1
  if (move) {
    toggleCell(move.x, move.y);
    playerTurn = true;
    return;
  }

  // If no winning or blocking move, pick a random empty cell
  let emptyCells = [];
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (grid[y][x] === 0) {
        emptyCells.push({ x, y });
      }
    }
  }

  if (emptyCells.length > 0) {
    let randomIndex = Math.floor(random() * emptyCells.length);
    let randomMove = emptyCells[randomIndex];
    toggleCell(randomMove.x, randomMove.y);
    playerTurn = true;
  }
}

// Helper function to find a winning move for a given player
function findWinningMove(player) {
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (grid[y][x] === 0) {
        // Temporarily place the player's move
        grid[y][x] = player;
        if (checkThreeInARow() === player) {
          // Undo the move and return the winning move
          grid[y][x] = 0;
          return { x, y };
        }
        // Undo the move if it’s not winning
        grid[y][x] = 0;
      }
    }
  }
  return null; // No winning move found
}

function displayText() {
  textSize(32);
  fill(255);
  stroke(0);
  strokeWeight(4); 
}