class Star {
	constructor() {
		this.pos = createVector(random(0, width), random(0, height));
		this.radius = random(1, 3);
		this.pulseRadius = this.radius + 1.5;
		this.smoothRadius = this.radius;
		this.isLerping = false;
		this.c = random([ 'white', 'lightyellow', 'gray' ]);
	}

	draw() {
		push();
		translate(-width / 2, -height / 2);
		fill(this.c);
		noStroke();

		// if (random() < 0.001 || this.isLerping) {
		// 	this.isLerping = true;
		// 	this.smoothRadius = lerp(this.smoothRadius, this.pulseRadius, 0.01);
		// 	if (this.pulseRadius - this.smoothRadius < 0.1) {
		// 		this.isLerping = false;
		// 		this.smoothRadius = this.radius;
		// 	}
		// }
		// ellipse(this.pos.x, this.pos.y, this.smoothRadius);

		ellipse(this.pos.x, this.pos.y, this.radius);
		pop();
	}
}
