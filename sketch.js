let canvas;
let font;
let fa;
let headshot;
let planet;

let perspective = {
  x: 0,
  y: 0,
  z: 0
};

const title = 36;
const subtitle = 28;
const content = 20;
const subcontent = 16;

const leftX = 350 / 2;

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
    url: 'https://jopebot-web-beta.herokuapp.com/',
    metadata: `A (beta) Twitch.tv integration app.  Login with "jtmmtest" | "s0ftware_d3m0!"`,
    stack: `NodeJs + Express | PostgreSQL | Angular 6`
  },
  {
    name: 'HobbyPocket',
    url: 'https://metal-messiah.github.io/nike/',
    metadata: `A simple demo for stylistically maintaining a list of hobbies`,
    stack: `ReactJS + Redux`
  },
  {
    name: 'SkiFree',
    url: 'https://metal-messiah.github.io/ceros-ski/',
    metadata: `A pure-javascript clone of the classic "SkiFree" game`,
    stack: `ES6 Javascript | Webpack`
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

let c;

let sidebar;

preload = () => {
  font = loadFont('./assets/AGENCYB.otf');
  fa = loadFont('./assets/Font Awesome 5 Brands-Regular-400.otf');

  planet = loadImage('./assets/planet.png');
};

setup = () => {
  canvas = createCanvas(windowWidth, windowHeight);

  c = c ? c : ARROW;

  perspective.z = PI / 8;

  orb = new Sphere(width / 2, height / 2, 0);

  for (let i = 0; i < 200; i++) {
    stars.push(new Star(random(0, width), random(0, height)));
  }

  shootingStars.push(new ShootingStar());

  shouldAnimate = new SmoothAnimation();

  socialTags.forEach((sl, i) => {
    let pos = createVector(width - 25, height - 50 - i * 50 + 25);
    socialLinks.push(new SocialLink(sl.txt, pos, sl.url));
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

  positions = [menuItem1, menuItem2, menuItem3, menuItem4];

  menuItems.forEach((item, i) => {
    let { x, y } = positions[i];
    item.pos = { x, y };
  });
};

reset = () => {
  canvas = createCanvas(windowWidth, windowHeight);

  // translate(-width / 2, -height / 2);

  c = c ? c : ARROW;

  perspective.z = PI / 8;

  orb = new Sphere(width / 2, height / 2, 0);
  // centerGraphic = new CenterGraphic();

  stars = [];

  for (let i = 0; i < 200; i++) {
    stars.push(new Star(random(0, width), random(0, height)));
  }

  shootingStars = [];
  shootingStars.push(new ShootingStar());

  shouldAnimate = new SmoothAnimation();

  socialLinks = [];

  socialTags.forEach((sl, i) => {
    let pos = createVector(width - 25, height - 50 - i * 50 + 25);
    socialLinks.push(new SocialLink(sl.txt, pos, sl.url));
  });

  menuItems = [];

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

  positions = [menuItem1, menuItem2, menuItem3, menuItem4];

  menuItems.forEach((item, i) => {
    let { x, y } = positions[i];
    item.pos = { x, y };
  });
};

draw = () => {
  background(0);
  cursor(c);
  // orbitControl();

  let locX = mouseX - height / 2;
  let locY = mouseY - width / 2;

  // pointLight(255, 255, 255, width, height, 100);

  if (shouldAnimate.frames) {
    shouldAnimate.smoothAnimations();
  }

  stars.forEach((star, i) => {
    if (star.pos.x < 0 || star.pos.y > height) {
      if (star.pos.y > height) {
        // make sure its off the screen (+5)
        stars.push(new Star(random(0, width), -5));
      } else {
        // make sure its off the screen (+5)
        stars.push(new Star(width + 5, random(0, height)));
      }

      star.destroy();
    } else {
      star.update();
      star.draw();
    }
  });

  if (random() < 0.004) {
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

  particles.forEach(p => {
    if (p.a > 0) {
      p.update();
      p.draw();
    } else {
      p.destroy();
    }
  });

  const mi1 = menuItems.findIndex(m => m.index === 0);
  const mi2 = menuItems.findIndex(m => m.index === 1);
  const mi3 = menuItems.findIndex(m => m.index === 2);
  const mi4 = menuItems.findIndex(m => m.index === 3);

  // item 3 needs to draw on top
  menuItems[mi4].draw();
  menuItems[mi1].draw();
  menuItems[mi2].draw();
  orb.draw();
  menuItems[mi3].draw();

  socialLinks.forEach(sl => {
    sl.draw();
  });
};

mousePressed = evt => {
  if (document.querySelector('#sidebar').style.left !== '0px' || displayWidth > 600) {
    if (orb.intersectsGeom(mouseX, mouseY, true)) {
      shouldAnimate = new SmoothAnimation();

      shouldAnimate.frames = 90; // 1.5 second
      shouldAnimate.yTarget = -0.9;
      shouldAnimate.yRate = shouldAnimate.yTarget / shouldAnimate.frames;
    }

    menuItems.forEach(item => {
      if (item.index !== 3) {
        if (item.intersectsGeom(mouseX, mouseY)) {
          window.open(item.url, '_blank');
        }
      }
    });

    socialLinks.forEach(sl => {
      if (sl.intersectsGeom(mouseX, mouseY)) {
        window.open(sl.url, '_blank');
      }
    });
  }
};

mouseMoved = evt => {
  c = ARROW;
  try {
    if (orb.intersectsGeom(mouseX, mouseY, true)) {
      c = HAND;
    }
  } catch (err) {
    // orb is still loading
  }

  menuItems.forEach((item, i) => {
    if (item.intersectsGeom(mouseX, mouseY)) {
      item.showMetadata = true;
      item.showStack = true;
      c = HAND;
    } else {
      if (item.showMetadata || item.showStack) {
        item.showMetadata = false;
        item.showStack = false;
      }
    }
  });

  socialLinks.forEach((item, i) => {
    if (item.intersectsGeom(mouseX, mouseY)) {
      item.setColor('lightblue');
      c = HAND;
    } else {
      item.setColor('orange');
    }
  });
};

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  reset();
}

rotateOrb = () => {};
