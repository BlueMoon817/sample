import App from '../App.js';
import BoundingBox from './BoundingBox.js';
export default class Player{
  constructor(){
      this.img = document.querySelector('#bird-img');
      this.x= App.width * 0.1
      this.y= App.height / 2
      this.width = 60;
      this.height = this.width * (this.img.height / (this.img.width / 20))
      
      this.boundingBox = new BoundingBox(this.x + 10, this.y + 20, this.width - 22, this.height-20);
      this.counter =1;
      this.frameX=0;
      
      this.vy= -7;
      this.gravity=0.2;
      App.canvas.addEventListener('click', () =>{
        this.vy += -4;
      });
  }
  
  update(){
    this.counter += 1;
    if(++this.counter%2 ===0){
      // this.frameX +=1;
      // if(this.frameX===15){
      //   this.frameX=0;
      // }
      this.frameX = ++this.frameX % 15;
    }
    this.vy+= this.gravity;
    this.y+= this.vy;
    this.boundingBox.y = this.y + 16;
  }
  
  draw(){
    App.context.drawImage(
      this.img,
      this.img.width/15 * this.frameX ,0,this.img.width/15,this.img.height,
      this.x, this.y, this.width, this.height
    )
    // this.boundingBox.draw();
  }
}