import Particle from './components/Particle3.js';
const canvas=document.querySelector('.canvas');
const context = canvas.getContext('2d');
const dpr = window.devicePixelRatio>1? 2:1;

let canvasWidth = innerWidth;
let canvasHeight = innerHeight;
const interval = 1000/60;
let particles=[];

function init (){
  canvasWidth = innerWidth;
  canvasHeight = innerHeight;
  canvas.style.width=canvasWidth + 'px';
  canvas.style.height=canvasHeight + 'px';
  canvas.width= canvasWidth * dpr;
  canvas.height= canvasHeight * dpr;
  context.scale(dpr,dpr);

}

function confetti({x,y,count,degree}){
    for(let i = 0; i< count; i+=1){
        particles.push(new Particle(x,y, degree));
    }
}

function render(){
    let now, delta;
    let then = Date.now();

    const frame = ()=>{
        requestAnimationFrame(frame);
        now = Date.now();
        delta = now - then;
        if(delta< interval) return;
        context.clearRect(0,0,canvasWidth,canvasHeight);

        for(let i = particles.length-1; i>=0; i-=1){
            particles[i].update();
            particles[i].draw(context);

        }

        then = now - (delta % interval);

    }
    requestAnimationFrame(frame);
}

window.addEventListener('load',()=>{
    init();
    render();
});
window.addEventListener('resize', init());
window.addEventListener('click', ()=>{
    confetti({
        x : 0,
        y: canvasHeight/2,
        count:100,
        degree:-50

    })

});

