function debounce(callback, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    console.log('clear')
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(context, args), wait);
  }
}
let winW=window.innerWidth, winY=window.innerHeight, currWinH, currWinW;
let count=0;
window.addEventListener('resize', debounce(() => {
  currWinW=window.innerWidth;
  if(currWinW!==winW){
    winW= currWinW;
    count++
    console.log('리사이즈 실행됨'+count);
  }
}, 2000));