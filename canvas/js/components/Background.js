import App from '../App';

export default class Background{
    constructor(){
        this.img = config.img
        this.height = App.height;
        this.width = App.height *(this.img.width / this.img.height);
        this.leftPos={
            x:0,y:0
        }
        this.rightPos={ x:this.width,y:0}
        this.speed=config.speed;
    }
    update(){
        if(this.leftPos.x + this.width < 0){
            this.leftPos.x = this.rightPos.x + this.width -4
        }
        if(this.rightPos.x + this.width < 0){
            this.rightPos.x = this.leftPos.x + this.width -4
        }
        this.leftPos.x += this.speed;
        this.rightPos.x += this.speed;
        // this.pos.x -=20
    }
    draw(){
        App.context.drawImg(
            this.img,
            this.leftPos.x, this.leftPos.x, this.img.width, this.img.height
        )
        App.context.drawImg(
            this.img,
            this.rightPos.x, this.rightPos.x, this.img.width, this.img.height
        )
    }

}