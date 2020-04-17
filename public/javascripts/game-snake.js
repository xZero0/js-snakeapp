sysBlocksize = 10;
sysWidth = 400;
sysHight = 400;

function setup() {
  var canvas = createCanvas(sysWidth, sysHight);
  canvas.parent('div-display');
  frameRate(10);

  score = 0;
  maxscore = 0;

  initSnake(sysBlocksize);
  initFood(sysBlocksize);
}

function draw() {
  background(40);

  sn1.draw();
  sn1.update();

  fl1.draw();

  if(sn1.getFood(fl1)){
    score = score + fl1.score;
    initFood(sysBlocksize);
  }

  checkOutScreen();
  checkDeath();
  checkLavel();
}

function checkDeath(){
  if(sn1.isTail(sn1.x, sn1.y)){
    initSnake();
  } 
}

function isFoodOnSnake(){
  return sn1.isTail(fl1.x, fl1.y);
}

function checkOutScreen(){
  if(sn1.x < 0){
    sn1.setLocation(sysWidth-sysBlocksize, sn1.y);
  } else if (sn1.x > sysWidth-sysBlocksize){
    sn1.setLocation(0, sn1.y);
  }

  if(sn1.y < 0){
    sn1.setLocation(sn1.x, sysWidth-sysBlocksize);
  } else if (sn1.y > sysWidth-sysBlocksize){
    sn1.setLocation(sn1.x, 0);
  }
}

function checkLavel(){
  if(score >= 10){
    frameRate(11);
  } else if(score >= 20){
    frameRate(15);
  } else if(score >= 50){
    frameRate(20);
  } else if(score >= 100){
    frameRate(25);
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    sn1.move(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    sn1.move(1, 0);
  } else if (keyCode === UP_ARROW) {
    sn1.move(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    sn1.move(0, 1);
  }
}

function initSnake(){
  snHeadx = int(random(0, 40)*sysBlocksize);
  snHeady = int(random(0, 40)*sysBlocksize);

  sn1 = new snake(2);
  sn1.setBlockSize(sysBlocksize);
  sn1.setLocation(snHeadx, snHeady);

  if(score > maxscore){
    maxscore = score;
  }
  score = 0;
}

function initFood(){
  fl1 = new food(sysBlocksize);
  if(isFoodOnSnake()){
    fl1 = new food(sysBlocksize);
  }
}

class food {
  constructor(size){
    this.bsize = size;
    this.score = 1;

    this.x = int(random(0, 40))*sysBlocksize;
    this.y = int(random(0, 40))*sysBlocksize;
  }
  draw(){
    fill(color(255,0,0));
    rect(this.x, this.y, 10, 10);
  }
}
