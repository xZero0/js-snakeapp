class snake {
  constructor(){
    this.bsize = 10;
    this.tail = [];
    this.x = 0;
    this.y = 0;

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

  getFood(po){
    var dis = dist(this.x, this.y, po.x, po.y);
    if(dis < this.bsize){
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

  update(){
    for(let i = 0; i < this.tail.length-1; i++){
      this.tail[i] = this.tail[i+1];
    }
    this.tail[this.length-1] = createVector(this.x, this.y);

    this.x = this.x + this.xmove*this.bsize;
    this.y = this.y + this.ymove*this.bsize;
  }

  draw(){
    fill(200);
    for(let i = 0; i < this.tail.length; i++){
      rect(this.tail[i].x, this.tail[i].y, this.bsize, this.bsize);
    }
    
    fill(255);
    rect(this.x, this.y, this.bsize, this.bsize);
  }
}

class food {
  constructor(totalblock, blocksize){
    this.bsize = blocksize;
    this.score = 1;

    this.x = int(random(0, totalblock-1))*this.bsize;
    this.y = int(random(0, totalblock-1))*this.bsize;
  }

  draw(){
    fill(color(255,0,0));
    rect(this.x, this.y, this.bsize, this.bsize);
  }
}

class bonusfood extends food {
  constructor(totalblock, blocksize){
    super(totalblock, blocksize)
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