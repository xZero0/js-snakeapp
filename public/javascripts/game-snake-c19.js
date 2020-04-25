function setup() {
  sysWidth = 0;
  sysHeight = 0;
  sysBonusFag = 0;
  sysC19Fag = 0;
  maxscore = 0;

  var w = innerWidth;
  var h = innerHeight;

  //Set 4:3 sceen
  if(w > h){
    sysWidth = h;
    sysHeight = h*0.75;
  } else {
    sysWidth = w;
    sysHeight = w*0.75; 
  }
  
  // block 2x2 mm, 1 pixcel/mm 
  sysBlocksize = 10;

  sysTotalBlock = sysWidth/sysBlocksize;
  canvas = createCanvas(sysWidth, sysHeight);
  canvas.parent('sketch-div');
  frameRate(10);

  initGame();
  initSnake();
  initFood();
  initBonusFood();
  initCovidFood();
}

function draw() {
  background(40);

  sn1.draw();
  fl1.draw();
  if(sysBonusFag == 2){
    bo1.draw();
  }
  if(sysC19Fag == 2){
    c19.draw();
  }

  if(sn1.getFood(fl1)){
    score = score + fl1.score;
    initFood();
  }

  if(sysBonusFag == 2){
    if(sn1.getFood(bo1)){
      score = score + bo1.score;
      sn1.heal(bo1.score*30);
      initBonusFood();
    }
  }

  if(sysC19Fag == 2){
    if(sn1.getFood(c19)){
      score = score + c19.score;
      sn1.setInfection();
      initCovidFood();
    }
  }

  updateBonus();
  updateCovid();

  checkOutScreen();
  checkLavel();

  checkDeath();
  sn1.update();
}

function initGame(){
  sysOverGame = 0;
  sysBonusFag = 0;
  sysC19Fag = 0;
  score = 0;
}

function initSnake(){
  bw = sysWidth/sysBlocksize;
  bh = sysHeight/sysBlocksize;
  snHeadx = int(random(0, bw-1)*sysBlocksize);
  snHeady = int(random(0, bh-1)*sysBlocksize);

  sn1 = new snake();
  sn1.setBlockSize(sysBlocksize);
  sn1.setLocation(snHeadx, snHeady);

  if(score > maxscore){
    maxscore = score;
  }

  score = 0;
  sn1.infect = 0;
}

function initFood(){
  bw = sysWidth/sysBlocksize;
  bh = sysHeight/sysBlocksize;
  setx = int(random(0, bw-1)*sysBlocksize);
  sety = int(random(0, bh-1)*sysBlocksize);

  fl1 = new food(sysBlocksize);
  if(isFoodOnSnake()){
    fl1 = new food(sysBlocksize);
  }
  fl1.setLocation(setx, sety);
}

function initBonusFood(){  
  bw = sysWidth/sysBlocksize;
  bh = sysHeight/sysBlocksize;
  setx = int(random(0, bw-1)*sysBlocksize);
  sety = int(random(0, bh-1)*sysBlocksize);
  
  bo1 = new bonusfood(sysBlocksize*1.2);
  if(isFoodOnSnake(bo1)){
    bo1 = new bonusfood(sysBlocksize*1.2);
  }
  bo1.setLocation(setx, sety);
  bo1.time = int(random(80,120));
  sysBonusFag = 1;
}


function initCovidFood(){
    bw = sysWidth/sysBlocksize;
    bh = sysHeight/sysBlocksize;
    setx = int(random(0, bw-1)*sysBlocksize);
    sety = int(random(0, bh-1)*sysBlocksize);
    
    c19 = new covid19food(sysBlocksize*1.2);
    if(isFoodOnSnake(c19)){
      c19 = new covid19food(sysBlocksize*1.2);
    }
    c19.setLocation(setx, sety);
    c19.time = int(random(120,140));
    sysC19Fag = 1;
}

function gameOver(){
    initGame();
    initSnake();
    initFood();
    initBonusFood();
    initCovidFood();
}

function updateBonus(){
  //The bonus food will enable after you gain more than 5 score.
    if(score > 5) {
        if(bo1.time == 60){
            sysBonusFag = 2;  
        } else if(bo1.time < 0){
            initBonusFood();
        }

        bo1.time = bo1.time - 1;
    } 
}

function updateCovid(){
    if(score > 10) {
        if(c19.time == 60){
            sysC19Fag = 2;
        } else if(c19.time < 0){
            initCovidFood();
        }

        c19.time = c19.time - 1;
    } 
}
  
function checkDeath(){
  var x = sn1.x;
  var y = sn1.y;
  if(sn1.isTail(x, y)){
    gameOver();
  }

  if(sn1.infect > 200){
    gameOver();
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
    sn1.setLocation(sn1.x, sysHeight-sysBlocksize);
  } else if (sn1.y > sysHeight-sysBlocksize){
    sn1.setLocation(sn1.x, 0);
  }
}

function checkLavel(){
  if(score >= 10){
    frameRate(13);
  } else if(score >= 20){
    frameRate(22);
  } else if(score >= 50){
    frameRate(38);
  } else if(score >= 100){
    frameRate(43);
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
    gameOver();
  }
}

//Clockwise play by mouseClicked
function mouseClicked() {
  sn1.movec();
}