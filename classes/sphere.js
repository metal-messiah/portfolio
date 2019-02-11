class Sphere {
	constructor(x, y, z) {
		this.pos = { x, y, z };
		this.radius = 75;
		this.highlighted = false;
		this.label = 'Rotate';
	}

	intersectsGeom(x, y, highlight) {
		if (x < this.pos.x + this.radius - 10) {
			if (x > this.pos.x - this.radius + 10) {
				if (y < this.pos.y + this.radius - 10) {
					if (y > this.pos.y - this.radius + 10) {
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
		push();

		try {
			normalMaterial();

			// Orange point light on the right
			pointLight(150, 100, 0, 500, 0, 200);

			// Blue directional light from the left
			directionalLight(0, 102, 255, -1, 0, 0);

			if (this.highlighted) {
				// Red spotlight from the front
				pointLight(255, 0, 0, 0, 0, 300);
			} else {
				// Yellow
				pointLight(255, 255, 109, 0, 0, 300);
			}

			rotateZ(perspective.z);
			rotateX(perspective.x);
			rotateY(perspective.y);

			sphere(this.radius);

			if (this.highlighted) {
				// console.log('label: ', this.label);
				fill('maroon');
				noStroke();
				textSize(16);
				textFont(font);
				textAlign(CENTER, CENTER);
				rotateY(-perspective.y);
				translate(-width / 2, -height / 2);

				text(this.label, this.pos.x, this.pos.y + this.radius + 10);
			}
		} catch (err) {
			translate(-width / 2, -height / 2);
			ellipse(this.pos.x, this.pos.y, this.radius);

			if (this.highlighted) {
				// console.log('label: ', this.label);
				fill('maroon');
				noStroke();
				textSize(16);
				textFont(font);
				textAlign(CENTER, CENTER);
				rotateY(-perspective.y);

				text(this.label, this.pos.x, this.pos.y + this.radius + 10);
			}
		}
		pop();
	}
}
