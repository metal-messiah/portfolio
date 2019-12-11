class CenterGraphic {
  constructor() {
    this.txt = '🚀';
    this.size = 36;

    this.points = [];
  }

  setText(text) {
    this.txt = text;
  }

  toUTF16(codePoint) {
    var TEN_BITS = parseInt('1111111111', 2);
    function u(codeUnit) {
      return '\\u' + codeUnit.toString(16).toUpperCase();
    }

    if (codePoint <= 0xffff) {
      return u(codePoint);
    }
    codePoint -= 0x10000;

    // Shift right to get to most significant 10 bits
    var leadSurrogate = 0xd800 + (codePoint >> 10);

    // Mask to get least significant 10 bits
    var tailSurrogate = 0xdc00 + (codePoint & TEN_BITS);

    return u(leadSurrogate) + u(tailSurrogate);
  }

  draw() {
    push();
    textFont(font);
    textSize(this.size);
    textAlign(CENTER, CENTER);
    fill(0);
    var context = canvas.canvas.getContext('2d');

    context.font = '96px serif';
    context.fillText(this.txt, windowWidth / 2, windowHeight / 2);

    pop();
  }
}
