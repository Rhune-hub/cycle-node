//Create Ellipse as object
class Ellipse {
    constructor(x,y,rx,ry,rotate,strokeColor,fillColor,lineWidth) {
        this.x = x;
        this.y = y;
        this.rx = rx;
        this.ry = ry;
        this.rotate = rotate;
        this.strokeColor = strokeColor;
        this.fillColor = fillColor;
        this.lineWidth = lineWidth;
    }
    //Draw Ellipse
    draw(ctx){
        ctx.beginPath();
        ctx.ellipse(this.x,this.y,this.rx,this.ry,this.rotate, 0, 2 * Math.PI);
        ctx.closePath();
        if(this.fillColor) {
            ctx.fillStyle = this.fillColor;
            ctx.fill();
        }
        if(this.lineWidth) ctx.lineWidth = this.lineWidth;
        if(this.strokeColor) {
            ctx.strokeStyle = this.strokeColor;
            ctx.stroke();
        }
    }
}
//Draw snowman
function drawSnowman() {
    const head = new Ellipse(150,230,100,100,0,"#2A505B","#91CBD7",4);
    const mouth = new Ellipse(125,276,40,13,0.15,"#2A6693","#91CBD7",3);
    const eye1 = new Ellipse(90,200,16,11,0,"#2A6693","#91CBD7",3);
    const eye2 = new Ellipse(170,200,16,11,0,"#2A6693","#91CBD7",3);
    const pupil1 = new Ellipse(84,200,4,8,0,"#2A6693","#2A6693",3);
    const pupil2 = new Ellipse(164,200,4,8,0,"#2A6693","#2A6693",3);
    head.draw(snowmanContext);
    mouth.draw(snowmanContext);
    eye1.draw(snowmanContext);
    eye2.draw(snowmanContext);
    pupil1.draw(snowmanContext);
    pupil2.draw(snowmanContext);
    drawHat();
    drawNose();
}
//Draw snowman hat
function drawHat() {
    const cylinderDown = new Ellipse(140,140,110,20,0,"#0F2634","#3E658E",3);
    const cylinderUp = new Ellipse(150,30,51,20,0,"#0F2634","#3E658E",3);
    cylinderDown.draw(snowmanContext);
    drawCylinder();
    cylinderUp.draw(snowmanContext);
}
//Draw hat cylinder
function drawCylinder() {
    snowmanContext.beginPath();  
    snowmanContext.moveTo(100,30);
    snowmanContext.lineTo(100,130);
    snowmanContext.bezierCurveTo(110,155,190,150,200,130);
    snowmanContext.lineTo(200,30);
    snowmanContext.restore();
    snowmanContext.closePath();
    snowmanContext.lineWidth = 5;
    snowmanContext.strokeStyle = "#0F2634";
    snowmanContext.fillStyle = "#3E658E";
    snowmanContext.stroke();
    snowmanContext.fill();
}
//Draw snwoman nose
function drawNose() {
    snowmanContext.beginPath();  
    snowmanContext.moveTo(130,200);
    snowmanContext.lineTo(110,240);
    snowmanContext.lineTo(130,240);
    snowmanContext.strokeStyle = "#2A6693";
    snowmanContext.stroke();
}
//Draw bike
function drawBike() {
    let backWheel = new Ellipse(100,200,80,80,0,'#438593','#91CBD7',3);
    let fronWheel = new Ellipse(410,200,80,80,0,'#438593','#91CBD7',3)
    let pedalWheel = new Ellipse(240,200,20,20,0,'#438593','#FFF',3)
    backWheel.draw(bikeContext);
    fronWheel.draw(bikeContext);
    pedalWheel.draw(bikeContext);
    drawLine(bikeContext,140,60,210,60,'#438593');
    drawLine(bikeContext,320,60,390,45,'#438593');
    drawLine(bikeContext,390,45,440,3,'#438593');
    drawLine(bikeContext,390,45,410,200,'#438593');
    drawLine(bikeContext,210,170,225,185,'#438593');
    drawLine(bikeContext,255,215,270,230,'#438593');
    bikeContext.moveTo(180,60);
    bikeContext.lineTo(240,200);
    bikeContext.lineTo(395,95);
    bikeContext.lineTo(195,95);
    bikeContext.lineTo(100,200);
    bikeContext.lineTo(240,200);
    bikeContext.line
    bikeContext.stroke();
}
//Draw line PTP
function drawLine(context,x1,y1,x2,y2,c) {
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
    context.strokeStyle = c;
    context.stroke();
}

//Draw house
function drawHouse() {
    drawBase();
    drawWindow(35,290,60,40,'#000');
    drawWindow(210,290,60,40,'#000');
    drawWindow(210,410,60,40,'#000');
    drawTube();
    drawDoor();
}
//Draw house base
function drawBase() {
    houseContext.beginPath();
    houseContext.moveTo(10,250);
    houseContext.lineTo(360,250);
    houseContext.lineTo(360,550);
    houseContext.lineTo(10,550);
    houseContext.lineTo(10,250);
    houseContext.lineTo(185,10);
    houseContext.lineTo(360,250);
    houseContext.fillStyle = '#975B5B';
    houseContext.lineWidth = 3;
    houseContext.fill();
    houseContext.stroke();
}
//Draw house door
function drawDoor() {
    houseContext.moveTo(50,550);
    houseContext.lineTo(50,440);
    houseContext.bezierCurveTo(55,400,155,400,160,440);
    houseContext.lineTo(160,550);
    houseContext.moveTo(105,550);
    houseContext.lineTo(105,410);
    houseContext.stroke();
    let rightKnob = new Ellipse(90,510,5,5,0,'black','',4);
    let leftKnob = new Ellipse(120,510,5,5,0,'black','',4);
    rightKnob.draw(houseContext);
    leftKnob.draw(houseContext);
}
//Draw house tube
function drawTube() {
    houseContext.beginPath();
    houseContext.moveTo(250,185);
    houseContext.lineTo(250,70);
    houseContext.lineTo(290,70);
    houseContext.lineTo(290,185);
    houseContext.fillStyle = '#975B5B';
    houseContext.fill();
    houseContext.stroke();
    let tubeUp = new Ellipse(270,68,20,5,0,'black','#975B5B');
    tubeUp.draw(houseContext);
}
//Draw house window
function drawWindow(x,y,w,h,c) {
    houseContext.fillStyle = c;
    houseContext.fillRect(x,y,w,h);
    houseContext.fillRect(x+w+3,y+h+3,w,h);
    houseContext.fillRect(x,y+h+3,w,h);
    houseContext.fillRect(x+w+3,y,w,h);
}
//Get context of canvases and execute drawing functions
let snowmanContext = snowman.getContext('2d');
let bikeContext = bike.getContext('2d');
let houseContext = house.getContext('2d');
drawSnowman();
drawBike();
drawHouse();