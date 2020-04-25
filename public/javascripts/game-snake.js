
sysTotalBlock = 60;
sysBlocksize = 10;
sysWidth = 500;
sysWidth = 500;

sysBonusFag = 0;

function setup() {
  var w = innerWidth;
  var h = innerHeight;

  if(w > h){
    sysWidth = h;
    sysHeight = h;
  } else {
    sysWidth = w;
    sysHeight = w;
  }

  maxscore = 0;

  initGame();
 
  initSnake();
  initFood();
  initBonusFood();
}

function draw() {
  background(40);

  sn1.draw();
  fl1.draw();
  if(sysBonusFag == 2){
    bo1.draw();
  }

  if(sn1.getFood(fl1)){
    score = score + fl1.score;
    initFood();
  }

  if(sysBonusFag == 2){
    if(sn1.getFood(bo1)){
      score = score + bo1.score;
      initBonusFood();
    }
  }

  updateBonus();

  checkOutScreen();
  checkLavel();

  checkDeath();
  sn1.update();
}

function updateLabels(score){
  var sLabel = document.getElementById('score-label');
  sLabel.innerHTML = 'HI : ' + maxscore + ",   " + score;			
}

function checkDeath(){
  var x = sn1.x;
  var y = sn1.y;
  if(sn1.isTail(x, y)){
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
    frameRate(13);
  } else if(score >= 20){
    frameRate(22);
  } else if(score >= 50){
    frameRate(28);
  } else if(score >= 100){
    frameRate(33);
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
  } else if (keyCode === 190) { //Clockwise play by '.' ( > key)
    sn1.movec();
  } else if (keyCode === 32) { //Clockwise play by ' ' or space bar
    sn1.movec();
  } else if (keyCode === 188) { //Counter clockwise play by ',' ( < key)
    sn1.movecc();
  } else if (key === 's') { 
    initGame();
    initSnake();
  }
}

//Clockwise play by mouseClicked
function mouseClicked() {
  sn1.movec();
}

function initGame(){
  sysBlocksize = 10*window.devicePixelRatio;
  if(sysWidth/sysBlocksize > 60){
    sysWidth = 600;
    sysHeight = 600;
  }

  sysTotalBlock = sysWidth/sysBlocksize;
  canvas = createCanvas(sysWidth, sysHeight);
  canvas.parent('sketch-div');
  frameRate(10);

  score = 0;
  sysOverGame = 0;
  sysBonusFag = 0;
  
  loop();
}

function initSnake(){
  snHeadx = int(random(0, sysTotalBlock)*sysBlocksize);
  snHeady = int(random(0, sysTotalBlock)*sysBlocksize);

  sn1 = new snake();
  sn1.setBlockSize(sysBlocksize);
  sn1.setLocation(snHeadx, snHeady);

  if(score > maxscore){
    maxscore = score;
  }
  score = 0;
}

function initFood(){
  fl1 = new food(sysTotalBlock, sysBlocksize);
  if(isFoodOnSnake()){
    fl1 = new food(sysTotalBlock, sysBlocksize);
  }
}

function initBonusFood(){  
  bo1 = new bonusfood(sysTotalBlock, sysBlocksize);
  if(isFoodOnSnake(bo1)){
    bo1 = new bonusfood(sysTotalBlock, sysBlocksize);
  }
  bo1.time = int(random(80,120));
  sysBonusFag = 1;
}

function updateBonus(){
  if(score > 1) {
    if(bo1.time == 60){
      sysBonusFag = 2;
    } else if(bo1.time == 0){
      initBonusFood();
    }

    bo1.time = bo1.time - 1;
  } 
}