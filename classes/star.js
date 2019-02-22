class Star {
	constructor(x, y) {
		this.radius = random(0.1, 3);
		this.movementSpeed = this.radius > 2 ? this.radius * -0.03 : this.radius * -0.02;

		this.pos = createVector(x, y);
		this.vel = createVector(this.movementSpeed, 0.1);
		this.acc = createVector(0, 0);

		this.pulseRadius = this.radius + 1.5;
		this.smoothRadius = this.radius;
		this.isLerping = false;
		this.c = random([ 'white', 'lightyellow', 'gray' ]);

		this.id = random();
	}

	destroy() {
		let idx = stars.findIndex((s) => s.id === this.id);
		stars.splice(idx, 1);
	}

	applyForce(f) {
		this.acc.add(f);
	}

	update() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	draw() {
		push();
		fill(this.c);
		noStroke();

		ellipse(this.pos.x, this.pos.y, this.radius);
		pop();
	}
}
