import App from '../App.js';
import Coin from '../Coin.js';

export default class Score{
  constructor(){
      this.coin =new Coin(App.width -50, 50, 0);
      
      //거리 상태값
      this.distCount = 0;
      this.coinCount = 0;
  } 
  
  update(){
    this.distCount +=0.015;
    
  }
  
  draw(){
    this.coin.draw();
    
    App.context.fillStyle = '#f1f1f1';
    App.context.font= '55px Jua';
    App.context.textAlign = 'right';
    App.context.fillText(this.coinCount, App.width - 90, 69);
    App.context.textAlign = 'left';
    App.context.fillText(Math.floor(this.distCount)+'m', 25,69);
    
  }
}