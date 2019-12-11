class Sphere {
  constructor(x, y, z) {
    this.pos = { x, y, z };
    this.radius = 75;
    this.highlighted = false;
    this.label = 'Rotate';

    this.rotation = 0;
  }

  intersectsGeom(x, y, highlight) {
    if (x < this.pos.x + this.radius - 15) {
      if (x > this.pos.x - this.radius + 15) {
        if (y < this.pos.y + this.radius - 15) {
          if (y > this.pos.y - this.radius + 15) {
            if (highlight) this.highlighted = true;
            return true;
          }
        }
      }
    }
    if (highlight) this.highlighted = false;
    return false;
  }

  draw() {
    this.rotation += 0.001;
    push();
    translate(width / 2, height / 2);

    rotate(0);
    if (this.highlighted) {
      fill(color(255, 165, 0, 100));

      ellipse(0, 0, this.radius * 2 + 10);
      noStroke();
      textSize(16);
      textFont(font);
      textAlign(CENTER, CENTER);

      text(this.label, 0, 0 + this.radius + 10);
    }

    rotate(this.rotation);
    image(planet, 0 - this.radius, 0 - this.radius, this.radius * 2, this.radius * 2);

    pop();
  }
}
