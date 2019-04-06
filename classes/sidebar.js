class Sidebar {
    constructor() {
        this.rectWidth = width < 640 ? width : 350;
        console.log(this.rectWidth)
        this.leftX = this.rectWidth / 2;

        this.expanded = true;
    }

    draw() {
        if (this.expanded) {
            let spacer = 30;
            let subspacer = 20;
            let topY = 25;

            fill('#444');
            rect(0, 0, this.rectWidth, height);

            fill('orange');
            // translate(-width / 2, -height / 2);
            textFont(font);
            textSize(title);
            textAlign(CENTER, CENTER);

            text('Jordan Porter', leftX, topY);
            topY += spacer;
            textSize(content);
            fill('lightblue');
            text('Senior Software Developer', leftX, topY);
            topY += spacer + 15;

            image(headshot, 25, topY - 10, 300, 400)
            topY += spacer + 400;




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
        }
    }
}