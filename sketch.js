let canvas;
let font;
let fa;
let headshot;

let perspective = {
	x: 0,
	y: 0,
	z: 0
};

const title = 36;
const subtitle = 28;
const content = 20;
const subcontent = 16;

const leftX = 25;

let positions = [];

let orb;

let centerGraphic;

let stars = [];

let shootingStars = [];

let particles = [];

let shouldAnimate;
let menuTags = [
	{
		name: 'Speed Rockets',
		url: 'https://metal-messiah.github.io/speed_rockets/',
		metadata: `A pure HTML 5 game featuring built on a custom JavaScript physics engine.`,
		stack: 'HTML5 | P5.js | CSS'
	},
	{
		name: 'JopeBot',
		url: 'https://www.jopebot.com',
		metadata: `A three-platform software suite for managing streaming request queues on Twitch.tv`,
		stack: `Desktop: ElectronJS/jQuery | Server: NodeJS/Express/PostgreSQL | Extension: ReactJS`
	},
	{
		name: 'Murray Surgical',
		url: 'https://metal-messiah.github.io/murray_surgical/',
		metadata: `A business suite utilizing a texting & email server with public website.`,
		stack: `NodeJS | PostgreSQL | jQuery`
	},
	{
		name: 'AMP',
		url: 'http://astro.ngacres.com/gis',
		metadata: `A commercial Web-GIS suite`,
		stack: `ArcGIS Server | Sqlite | Python`
	}
];

let menuItems = [];
let menuPositions = [];

let socialTags = [
	{
		txt: '',
		url: 'https://www.linkedin.com/in/jordan-porter/'
	},
	{
		txt: '',
		url: 'https://www.github.com/metal-messiah'
	}
];
let socialLinks = [];

preload = () => {
	font = loadFont('./assets/AGENCYB.otf');
	fa = loadFont('./assets/Font Awesome 5 Brands-Regular-400.otf');
	// fa = 'FontAwesome';

	headshot = loadImage('./assets/headshot.JPG');
	console.log(headshot);
};

setup = () => {
	canvas = createCanvas(windowWidth, windowHeight, WEBGL);
	console.log(canvas);

	translate(-width / 2, -height / 2);

	perspective.z = PI / 8;

	orb = new Sphere(width / 2, height / 2, 0);
	// centerGraphic = new CenterGraphic();

	for (let i = 0; i < 100; i++) {
		stars.push(new Star());
	}

	shootingStars.push(new ShootingStar());

	shouldAnimate = new SmoothAnimation();

	socialTags.forEach((sl, i) => {
		let pos = createVector(width - leftX, i * 50 + 25);
		socialLinks.push(new SocialLink(sl.txt, pos));
	});

	menuTags.forEach((tag, i) => {
		menuItems.push(new MenuItem(0, 0, 0, tag.name, tag.metadata, tag.stack, i, tag.url));
	});

	const total = menuItems.length;

	const menuItem1 = {
		x: windowWidth * 0.3,
		y: windowHeight * 0.4,
		shouldShow: true,
		scale: 24
	};

	const menuItem2 = {
		x: windowWidth * 0.55,
		y: windowHeight * 0.75,
		shouldShow: true,
		scale: 36
	};

	const menuItem3 = {
		x: windowWidth * 0.7,
		y: windowHeight * 0.6,
		shouldShow: true,
		scale: 24
	};

	const menuItem4 = {
		x: windowWidth * 0.5,
		y: windowHeight * 0.45,
		shouldShow: false,
		scale: 16
	};

	positions = [ menuItem1, menuItem2, menuItem3, menuItem4 ];

	menuItems.forEach((item, i) => {
		let { x, y } = positions[i];
		item.pos = { x, y };
	});

	console.log(positions);
};

draw = () => {
	background(0);
	// orbitControl();

	let locX = mouseX - height / 2;
	let locY = mouseY - width / 2;

	pointLight(255, 255, 255, width, height, 100);

	if (shouldAnimate.frames) {
		shouldAnimate.smoothAnimations();
	}

	orb.draw();

	stars.forEach((star) => {
		star.draw();
	});

	if (random() < 0.002) {
		console.log('create shooting star');
		shootingStars.push(new ShootingStar());
	}
	shootingStars.forEach((star, i) => {
		if (star.pos.x > width || star.pos.x < 0 || star.pos.y > height || star.pos.y < 0) {
			star.destroy();
		} else {
			star.update();
			star.draw();
		}
	});

	particles.forEach((p) => {
		if (p.a > 0) {
			p.update();
			p.draw();
		} else {
			p.destroy();
		}
	});

	// centerGraphic.draw();

	menuItems.forEach((item) => {
		item.draw();
	});

	socialLinks.forEach((sl) => {
		sl.draw();
	});

	push();

	let spacer = 30;
	let subspacer = 20;
	let topY = 25;

	fill('orange');
	translate(-width / 2, -height / 2);
	textFont(font);
	textSize(title);
	textAlign(LEFT, CENTER);
	text('Jordan Porter', leftX, topY);
	topY += spacer;

	textSize(content);
	fill('lightblue');
	text('Senior Software Developer', leftX, topY);
	topY += spacer + 15;

	fill('orange');
	textSize(subtitle);
	text('Languages', leftX, topY);
	topY += spacer;

	fill('lightblue');
	textSize(subcontent);
	text('• HTML 5', leftX + 5, topY);
	topY += subspacer;
	text('• JavaScript', leftX + 5, topY);
	topY += subspacer;
	text('• Python', leftX + 5, topY);
	topY += subspacer;
	text('• SQL', leftX + 5, topY);
	topY += spacer;

	fill('orange');
	textSize(subtitle);
	text('Frontend', leftX, topY);
	topY += spacer;

	fill('lightblue');
	textSize(subcontent);
	text('• Angular 6+', leftX + 5, topY);
	topY += subspacer;
	text('• React', leftX + 5, topY);
	topY += subspacer;
	text('• Electron', leftX + 5, topY);
	topY += spacer;

	fill('orange');
	textSize(subtitle);
	text('Backend', leftX, topY);
	topY += spacer;

	fill('lightblue');
	textSize(subcontent);
	text('• NodeJS', leftX + 5, topY);
	topY += subspacer;
	text('• Flask', leftX + 5, topY);
	topY += subspacer;
	text('• Django', leftX + 5, topY);
	topY += spacer;

	fill('orange');
	textSize(subtitle);
	text('Databases', leftX, topY);
	topY += spacer;

	fill('lightblue');
	textSize(subcontent);
	text('• PostgreSQL', leftX + 5, topY);
	topY += subspacer;
	text('• MySQL', leftX + 5, topY);
	topY += subspacer;
	text('• MongoDB', leftX + 5, topY);
	topY += subspacer;

	pop();

	// push();
	// texture(image);
	// translate(width - 25, 50);
	// plane(200, 200);
	// pop();
};

mousePressed = (evt) => {
	evt.preventDefault();

	if (orb.intersectsGeom(mouseX, mouseY, true)) {
		shouldAnimate = new SmoothAnimation();

		shouldAnimate.frames = 90; // 1.5 second
		shouldAnimate.yTarget = -0.9;
		shouldAnimate.yRate = shouldAnimate.yTarget / shouldAnimate.frames;
	}

	menuItems.forEach((item) => {
		if (item.intersectsGeom(mouseX, mouseY)) {
			window.open(item.url, '_blank');
		}
	});
};

mouseMoved = (evt) => {
	if (orb.intersectsGeom(mouseX, mouseY, true)) {
		cursor('pointer');
	} else {
		cursor('default');
	}

	menuItems.forEach((item, i) => {
		if (item.intersectsGeom(mouseX, mouseY)) {
			item.showMetadata = true;
			item.showStack = true;
			cursor(HAND);
		} else {
			if (item.showMetadata || item.showStack) {
				item.showMetadata = false;
				item.showStack = false;
			}
			cursor(ARROW);
		}
	});
};

rotateOrb = () => {};
