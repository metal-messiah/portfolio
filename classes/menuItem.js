class MenuItem {
	constructor(x, y, z, text, metadata, stack, index, url) {
		this.pos = { x, y, z };
		this.scale = 1;
		this.text = text;
		this.metadata = metadata;
		this.stack = stack;

		this.index = index;

		this.nextLocation = null;

		this.ts = 24;

		this.bounds;

		this.highlighted = false;

		this.url = url;

		this.showMetadata = false;
		this.showStack = false;
	}

	getBounds() {
		return font.textBounds(this.text, this.pos.x, this.pos.y, this.ts);
	}

	intersectsGeom(x, y) {
		if (x < this.bounds.x + this.bounds.w) {
			if (x > this.bounds.x) {
				if (y < this.bounds.y + this.bounds.h) {
					if (y > this.bounds.y) {
						this.highlighted = true;
						return true;
					}
				}
			}
		}
		this.highlighted = false;
		return false;
	}

	getNextLocation() {
		this.updateIndex();

		this.nextLocation = Object.assign({}, positions[this.index]);
	}

	updateIndex() {
		if (this.index < menuItems.length - 1) {
			this.index++;
		} else {
			this.index = 0;
		}
	}

	shouldHide() {
		const { x, y } = this.pos;
		return x > width * 0.4 && x < width * 0.53 && y > height * 0.45 && y < height * 0.5;
	}

	draw() {
		push();
		// translate(-width / 2, -height / 2);

		if (this.highlighted) {
			fill('orange');
		} else {
			fill('lightblue');
		}
		textFont(font);

		const targetTs = positions[this.index].scale;
		const smoothTs = lerp(this.ts, targetTs, 0.1);
		this.ts = smoothTs;
		textSize(this.ts);

		noStroke();

		textAlign(CENTER, CENTER);

		if (this.nextLocation) {
			const lerpx = lerp(this.pos.x, this.nextLocation.x, 0.05);
			const lerpy = lerp(this.pos.y, this.nextLocation.y, 0.05);

			this.pos.x = lerpx;
			this.pos.y = lerpy;

			if (abs(this.pos.x - this.nextLocation.x) < 1 && abs(this.pos.y - this.nextLocation.y) < 1) {
				this.nextLocation = null;
			}
		}
		text(`${this.text}`, this.pos.x, this.pos.y);

		if (this.showMetadata) {
			textSize(this.ts * 0.75);
			text(`${this.metadata}`, this.pos.x, this.pos.y + this.ts);
		}

		if (this.showStack) {
			textSize(this.ts * 0.5);
			text(`${this.stack}`, this.pos.x, this.pos.y + this.ts * 2);
		}

		this.bounds = this.getBounds();
		pop();
	}
}
