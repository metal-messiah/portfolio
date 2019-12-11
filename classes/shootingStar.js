class ShootingStar {
  constructor() {
    let xOrigin;
    if (random() < 0.5) {
      xOrigin = 0;
    } else {
      xOrigin = width;
    }
    this.pos = createVector(xOrigin, random(0, height));

    const xVel = xOrigin === 0 ? random(0, 3) : random(-3, 0);
    this.vel = createVector(xVel, random(0, 3));
    this.acc = createVector();

    this.history = [];
    this.historyLength = 2;

    this.maxSpeed = 3;
    this.maxForce = 0.01;

    this.orbitRadius = orb.radius * 4;

    this.id = random();

    this.state = 1;
    this.d;

    this.willDestroy = false;
  }

  shouldSeekPlanet() {
    if (this.pos.x > orb.pos.x - this.orbitRadius) {
      if (this.pos.x < orb.pos.x + this.orbitRadius) {
        if (this.pos.y > orb.pos.y - this.orbitRadius) {
          if (this.pos.y < orb.pos.y + this.orbitRadius) {
            if (orb.intersectsGeom(this.pos.x, this.pos.y)) {
              if (!this.willDestroy) {
                for (let i = 0; i < 25; i++) {
                  particles.push(new Particle(this.pos.x, this.pos.y));
                }
                this.destroy();
              }
              this.willDestroy = true;

              return false;
            }
            return true;
          }
        }
      }
    }
    return false;
  }

  rotation() {
    return this.vel.heading() + radians(90);
  }

  seek(target) {
    let speed = this.maxSpeed;
    let desired = p5.Vector.sub(target, this.pos);
    desired.setMag(speed);

    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  }

  arrive(target) {
    let speed = this.maxSpeed;
    let desired = p5.Vector.sub(target, this.pos);
    let d = desired.mag();
    if (d < 100) {
      speed = map(d, 0, 100, 0, this.maxSpeed);
    }
    desired.setMag(speed);

    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  }

  destroy() {
    let idx = shootingStars.findIndex(s => s.id === this.id);
    shootingStars.splice(idx, 1);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    if (this.history.length > this.historyLength) {
      this.history.shift();
    }
    this.history.push(Object.assign({}, this.pos));

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    if (this.shouldSeekPlanet()) {
      const target = createVector(orb.pos.x, orb.pos.y);
      const seek = this.seek(target);
      this.applyForce(seek);
    }

    this.updateState();
  }

  updateState() {
    this.d = dist(this.pos.x, this.pos.y, orb.pos.x, orb.pos.y);

    if (this.d < this.orbitRadius * 0.75) {
      this.state = 3;
      this.historyLength = lerp(this.historyLength, 15, 0.01);
    }
    if (this.d < this.orbitRadius) {
      this.state = 2;
      this.historyLength = lerp(this.historyLength, 10, 0.01);
    }
    if (this.d > this.orbitRadius) {
      this.state = 1;
      this.historyLength = lerp(this.historyLength, 2, 0.01);
    }
  }

  getColor() {
    let a = map(this.d, 0, width / 2, 255, 0);
    if (this.state === 3) {
      return color(255, 100, 100, a);
    }

    if (this.state === 2) {
      return color(255, 255, 100, a);
    }

    if (this.state === 1) {
      return color(255, 255, 255, a);
    }
  }

  draw() {
    push();
    // translate(-width / 2, -height / 2);

    fill(255);
    stroke(this.getColor());
    strokeWeight(1);

    ellipse(this.pos.x, this.pos.y, 2);

    line(
      this.history[this.history.length - 1].x,
      this.history[this.history.length - 1].y,
      this.history[0].x,
      this.history[0].y
    );

    pop();
  }
}
