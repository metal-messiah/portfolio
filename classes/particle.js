class Particle {
	constructor(x, y) {
		this.pos = createVector(x, y);
		this.vel = createVector(random(-1, 1), random(-1, 1));
		this.acc = createVector(0, 0);

		this.a = 255;

		this.id = random();
	}

	destroy() {
		let idx = particles.findIndex((s) => s.id === this.id);
		particles.splice(idx, 1);
	}

	decay() {
		this.a -= 3;
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
		// translate(-width / 2, -height / 2);
		fill(color(255, 255, 255, this.a));
		noStroke();
		ellipse(this.pos.x, this.pos.y, 2);
		pop();

		this.decay();
	}
}
