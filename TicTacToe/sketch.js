// Tic Tac Toe Game
// Oleh
// 10/28/24
//
// neural net
// Extra for Experts:
/* 
  - In this code, the AI ​​is implemented using a simple algorithm like neural net 
that first tries to find a winning move, then blocks the player's 
potential winning moves, and if there are none, makes a random move.
  - The game uses arrays for displaying Cross Player(X) and Circle Player(O), 
as well as for carrying out logic for player O.
  - Adaptation to screen size.
  - Using Two Dimentional Arrays.
  - Text Usage.
*/

let grid = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let cellSize;
const GRID_SIZE = 3;
let playerTurn = true;
let circleIMG;
let xIMG;
let winner;
let screenMoveDist = 150;
let countXWins = 0;
let countOWins = 0;
let countTies = 0;
let showPlayAgainButton = false;
let buttonX, buttonY, buttonWidth, buttonHeight;
let gameOver = false;
let resultText = "";

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
  cellSize = (height-300)/GRID_SIZE;
}

// Creating changeble screen
function windowResized() {
  if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  }
  else {
    resizeCanvas(windowHeight, windowHeight);
  }
  cellSize = (height-300)/GRID_SIZE;

  buttonX = width / 2 - buttonWidth / 2;
  buttonY = height / 2 + 250;
}

function draw() {
  background(220);
  displayGrid();
  setText();
  checkForWinner();

  if (showPlayAgainButton) {
    displayPlayAgainButton();
  }

  if (gameOver) {
    textAlign(CENTER, CENTER);
    textSize(cellSize/2);
    fill(180);
    text(resultText, width / 2, height / 2 - screenMoveDist);  // Displaying text in the center
  }
}

// Getting the x and y pos 
function mousePressed() {
  if (showPlayAgainButton) {
    // Check for clicking on button
    if (mouseX > buttonX && mouseX < buttonX + buttonWidth &&
        mouseY > buttonY && mouseY < buttonY + buttonHeight) {
      resetGame(); // Reset the game when you press the button
      return;
    }
  }

  if (playerTurn && !showPlayAgainButton) {
    let x = Math.floor((mouseX-screenMoveDist)/cellSize);
    let y = Math.floor(mouseY/cellSize);

    if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE && grid[y][x] === 0) {
      toggleCell(x, y);
      playerTurn = false;

      if (!checkForWinner()) {
        aiMove(); // Player O
      }
    }
  }
  checkForWinner();
}

function toggleCell(x, y) {
  if (grid[y][x] === 0 && playerTurn) {
    grid[y][x] = 1;
  } 
  else if (grid[y][x] === 0 && !playerTurn) {
    grid[y][x] = 2;
  }
  
}

function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) { // Vertical
    for (let x = 0; x < GRID_SIZE; x++) { // Horizontal
      noFill();
      square(x * cellSize + screenMoveDist, y * cellSize, cellSize);
      if (grid[y][x] === 1) { // Player X
        image(xIMG, x * cellSize + screenMoveDist, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === 2) { // Player O
        image(circleIMG, x * cellSize + screenMoveDist, y * cellSize, cellSize, cellSize);
      }
    } 
  }
}

function displayPlayAgainButton() {
  buttonWidth = cellSize*20/6;
  buttonHeight = cellSize*6/20;
  buttonX = width / 2 - buttonWidth / 2;
  buttonY = cellSize*3 + buttonHeight;

  // Drawing button
  fill(0, 200, 100);
  rect(buttonX, buttonY, buttonWidth, buttonHeight, 100);
  fill(255);
  textSize(cellSize/5);
  textAlign(CENTER, CENTER);
  text("Play Again", buttonX + buttonWidth/2, buttonY + buttonHeight / 2);
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
  if (gameOver){
    return; // If the game is already over, do nothing
  } 

  winner = checkThreeInARow();
  if (winner === 1) { // Player X
    resultText = "Player X wins!";
    countXWins++;
    gameOver = true; 
    playAgain();
  } 
  else if (winner === 2) { // Player O
    resultText = "Player O wins!";
    countOWins++;
    gameOver = true; 
    playAgain();
  } 
  else if (checkTie()) {  //No winner
    resultText = "It's a  tie!";
    countTies++;
    gameOver = true; 
    playAgain();
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

function playAgain() {
  // Function that will show smth clickable for playing tic tac toe again, saving previous results of games
  showPlayAgainButton = true; 
}

function resetGame() {
  grid = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]; // Clearing grid
  playerTurn = true; // Player X  turn
  showPlayAgainButton = false; // Hide "Play Again" button
  gameOver = false; 
}

function setText() {
  fill(255);
  stroke(0);
  strokeWeight(4);
  textSize(cellSize/5);
  textAlign(CENTER, BOTTOM);

  text("Ties: " + countTies, screenMoveDist + cellSize * 2.5, height - 100);
  text("O wins: " + countOWins, screenMoveDist + cellSize * 1.5, height - 100);
  text("X wins: " + countXWins, screenMoveDist + cellSize / 2, height - 100);
}