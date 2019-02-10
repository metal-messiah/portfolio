class SocialLink {
	constructor(txt, pos) {
		this.txt = txt;
		this.pos = pos;
	}

	draw() {
		push();
		fill('orange');
		translate(-width / 2, -height / 2);
		textFont(fa);
		textSize(title);
		textAlign(CENTER, CENTER);
		text(this.txt, this.pos.x, this.pos.y);
		pop();
	}
}
