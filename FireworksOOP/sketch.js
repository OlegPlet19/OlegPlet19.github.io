// Fireworks OOP demo

const NUMBER_OF_FIREWORKS_PER_CLICK = 100;

class Particle {
  constructor(x, y, ) {
    this.x = x;
    this.y = y;
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.size = 5;
    this.r = 255; // Red
    this.g = 0; // Green
    this.b = 0; // Blue
    this.opacity = 255;
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b, this.opacity);
    circle(this.x, this.y, this.size);
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    // Fade away over time
    this.opacity -= 3;
  }

  isDead() {
    return this.opacity <= 0;
  }
}

let theFireworks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("black");

  for (let fireworks of theFireworks) {
    if (fireworks.isDead()) {
      let index = this.fireworks.isDead(fireworks);
      theFireworks.splice(fireworks[index], 1);
    }
    else {
      fireworks.update();
      fireworks.display();
    }
  }
}

function mousePressed() {
  for (let i = 0; i < NUMBER_OF_FIREWORKS_PER_CLICK; i++) {
    let someFirework = new Particle(mouseX, mouseY);
    theFireworks.push(someFirework);
  }
}