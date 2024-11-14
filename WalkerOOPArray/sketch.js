// Walker OOP Array demo
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Walker {
  constructor(x, y, theColor) {
    this.x = x;
    this.y = y;
    this.color = theColor;
    this.speed = 15;
    this.radius = 5;
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius*2);
  }

  move() {
    let choice = random(100);
    if (choice < 25) {
      // up
      this.y -= this.speed; 
    }
    else if (choice < 50) {
      // down
      this.y += this.speed;
    }
    else if (choice < 75) {
      // right
      this.x -= this.speed;
    }
    else {
      this.x += this.speed;
    }
  }
}

let walkerArray = []; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  let walker1 = new Walker(width/2, height/2, "black");
  walkerArray.push(walker1);
}

function draw() {
  for (let theWalker of walkerArray) {
    theWalker.display();
    theWalker.move();
  }
}

function mousePressed() {
  let randomColor = color(random(255), random(255), random(255));
  let someWalker = new Walker(mouseX, mouseY, random);
  walkerArray.push(someWalker);
}