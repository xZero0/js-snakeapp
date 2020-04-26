class snake {
  constructor(){
    this.bsize = 10;
    this.tail = [];
    this.x = 0;
    this.y = 0;

    this.infect = 0;

    this.xmove = 1;
    this.ymove = 0;

    this.length = 2;
    for(let i = 0; i < this.length; i++){
      append(this.tail, createVector(this.x, this.y));
    }
  }
  
  setLocation(setx, sety){
    this.x = setx;
    this.y = sety;
  }

  setBlockSize(inSize){
    this.bsize = inSize;
  }

  isTail(inx, iny){
    for(let i=0; i<this.tail.length; i++){
      if(dist(inx, iny, this.tail[i].x, this.tail[i].y) < this.bsize*0.8){
        return true;
      }
    }
    return false;
  }

  getFood(food){
    var dis = dist(this.x, this.y, food.x, food.y);
    if(dis < food.bsize){
      this.length++;
      return true;
    } else {
      return false;
    }
  }

  move(inx, iny){
    if((this.xmove + inx) != 0){
      this.xmove = inx;
      this.ymove = 0;
    }

    if((this.ymove + iny) != 0){
      this.xmove = 0;
      this.ymove = iny;
    }  
  }
  
  movec(){
    if(this.xmove == 0){
      if(this.ymove > 0){
        this.xmove = -1;
        this.ymove = 0;
      } else {
        this.xmove = 1;
        this.ymove = 0;
      } 
    } else {
      if(this.xmove < 0 ){
        this.xmove = 0;
        this.ymove = -1;
      } else {
        this.xmove = 0;
        this.ymove = 1;
      } 
    }
  }

  movecc(){
    if(this.xmove == 0){
      if(this.ymove > 0){
        this.xmove = 1;
        this.ymove = 0;
      } else {
        this.xmove = -1;
        this.ymove = 0;
      } 
    } else {
      if(this.xmove < 0 ){
        this.xmove = 0;
        this.ymove = 1;
      } else {
        this.xmove = 0;
        this.ymove = -1;
      } 
    }
  }

  setInfection(innum){
    this.infect=innum;
  }
  
  getInfection(){
    if(this.infect > 0){
      return this.infect;
    } else {
      return 0;
    }
  }

  cleanInfection(){
    this.infect = 0;
  }

  heal(score){
    this.infect = this.infect - score;

    if(this.infect < 0){
      this.cleanInfection();
    }
  }

  update(){
    for(let i = 0; i < this.tail.length-1; i++){
      this.tail[i] = this.tail[i+1];
    }
    this.tail[this.length-1] = createVector(this.x, this.y);

    if(this.infect > 0){
      this.infect = this.infect+1;
    }

    this.x = this.x + this.xmove*this.bsize;
    this.y = this.y + this.ymove*this.bsize;
  }

  
  draw(){
    fill(200);
    let c = color(100, 50, 150);

    for(let i = 0; i < this.tail.length; i++){
      if(this.getInfection() > 0){
        c.setAlpha(128 + 128 * sin(this.infect));
        fill(c);
      }
      rect(this.tail[i].x, this.tail[i].y, this.bsize, this.bsize);
    }
    
    fill(255);
    rect(this.x, this.y, this.bsize, this.bsize);
  }
}

class food {
  constructor(blocksize){
    this.bsize = blocksize;
    this.score = 1;

    this.x = 0;
    this.y = 0;
  }

  setLocation(inx, iny) {
    this.x = inx;
    this.y = iny;
  }

  draw(){
    fill(color(255,0,0));
    rect(this.x, this.y, this.bsize, this.bsize);
  }
}

class bonusfood extends food {
  constructor(blocksize){
    super(blocksize)
    this.score = 3;
    this.bring = 0;
    this.time = 0;
  }

  draw(){
    let c = color(255, 204, 0);

    if(this.bring > 3){
      c = color(51);
      this.bring = 0;
    } else {
      c = color(255, 204, 0);
      this.bring++;
    }
    
    fill(c);
    rect(this.x, this.y, this.bsize+this.bring, this.bsize+this.bring);

  }
}

class covid19food extends food {
  constructor(totalblock, blocksize){
    super(totalblock, blocksize)
    this.score = 5;
    this.bring = 0;
    this.time = 0;
  }

  draw(){
    let c = color('rgba(100%,0%,100%,0.5)');

    if(this.bring > 3){
      c = color(51);
      this.bring = 0;
    } else {
      c = color('rgba(100%,0%,100%,0.5)');
      this.bring = this.bring + 2;
    }
    
    fill(c);
    rect(this.x, this.y, this.bsize+this.bring, this.bsize+this.bring);
    
    
    c = color('rgba(100%,0%,100%,0.3)');
    fill(c);
    let b = this.bsize*0.3;
    rect(this.x-b, this.y-b, b*2, b*2);
    rect(this.x-b+this.bsize+this.bring, this.y-b, b*2, b*2);
    rect(this.x-b+this.bsize+this.bring, this.y-b+this.bsize+this.bring, b*2, b*2);
    rect(this.x-b, this.y-b+this.bsize+this.bring, b*2, b*2);
  }
}