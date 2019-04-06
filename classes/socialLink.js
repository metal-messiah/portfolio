class SocialLink {
	constructor(txt, pos, url) {
		this.txt = txt;
		this.pos = pos;
		this.url = url;
		this.bounds
		this.color = 'orange'
	}

	getBounds() {
		return fa.textBounds(this.txt, this.pos.x, this.pos.y, title);
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

	setColor(color) {
		this.color = color;
	}

	draw() {
		push();
		fill(this.color);
		// translate(-width / 2, -height / 2);
		textFont(fa);
		textSize(title);
		textAlign(CENTER, CENTER);
		text(this.txt, this.pos.x, this.pos.y);
		this.bounds = this.getBounds();
		pop();
	}
}
