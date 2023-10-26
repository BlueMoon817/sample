function debounce(callback, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(context, args), wait);
  }
}
let body = document.querySelector('body');
let sectionArr = document.querySelectorAll('.section');
let sectionOb;
let makeSectionOb = function () {
  body = document.querySelector('body');
  sectionArr = document.querySelectorAll('.section');
  sectionOb = [];
  for (let i = 0; i < sectionArr.length; i += 1) {
    sectionOb.push({
      sectionOffsetTop: sectionArr[i - 1] ? sectionArr[i].offsetTop - sectionArr[i].clientHeight * 0.4 : sectionArr[i].offsetTop,
      sectionOffsetBottom: sectionArr[i + 1] && i !== 5 ? sectionArr[i + 1].offsetTop - sectionArr[i].clientHeight * 0.4 : body.clientHeight
    });
  }
}
makeSectionOb();
function ytbFunc(win){
  //구현
  // 재생중일 때 배경 인터렉션
  // 재생 시점 컨트롤 버튼 구현
  // 중간 부터 1분만 재생
  // 재생 종료 시 다시 보기 버튼 출력
  let player1, player2, player3, player4, player5, player6;
  let playOb=[], state=false, stop;
  // ** youtube API 불러오기 **
  // 태그 생성
  let scriptTag = document.createElement('script');
  // script tag의 src 속성 할당
  scriptTag.src = "https://www.youtube.com/iframe_api";
  // 생성된 script 태그를 script태그들의 첫번째에 위치시키기
  let firstScriptTag = document.querySelector('.ytb_script');
  firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);

  // ** 플레이어 설정 **

  function onYouTubeIframeAPIReady() {
    
    let p2 = new Promise(function(resolve, reject){
      player1 = new YT.Player('player1', {
        height: '360', // 영상의 높이 값
        width: '640', // 영상의 너비 값
        videoId: 'EjvSTsFnWKY', // 유튜브 임베드 고유의 id (11자)
        playerVars: {
          'autoplay': 0, // autoplay false
          'controls': 0, // constrol false
          'mute': 1, // 음소거
          'loop': 1,   // 반복재생 true
          'playsinline': 1 // ios환경에서 전체화면으로 재생하지 않기
        },
        // events: {
        // 'onReady': playVideoFunc,  // onReady 상태일 때 작동하는 function이름
        // 'onStateChange': onPlayerStateChange // 영상상태체크함수 : onStateChange 상태일 때 작동하는 function이름
        // }
      });
      player2 = new YT.Player('player2', {
        height: '360',
        width: '640',
        videoId: 'EjvSTsFnWKY',
        playerVars: {
          'autoplay': 0,
          'controls': 0,
          'mute': 1,
          'loop': 1,
          'playsinline': 1
        },
      });
      player3 = new YT.Player('player3', {
        height: '360',
        width: '640',
        videoId: 'EjvSTsFnWKY',
        playerVars: {
          'autoplay': 0,
          'controls': 0,
          'mute': 1,
          'loop': 1,
          'playsinline': 1
        },
      });
      player4 = new YT.Player('player4', {
        height: '360',
        width: '640',
        videoId: 'EjvSTsFnWKY',
        playerVars: {
          'autoplay': 0,
          'controls': 0,
          'mute': 1,
          'loop': 1,
          'playsinline': 1
        },
      });
      player5 = new YT.Player('player5', {
        height: '360',
        width: '640',
        videoId: 'EjvSTsFnWKY',
        playerVars: {
          'autoplay': 0,
          'controls': 0,
          'mute': 1,
          'loop': 1,
          'playsinline': 1
        },
      });
      player6 = new YT.Player('player6', {
        height: '360',
        width: '640',
        videoId: 'EjvSTsFnWKY',
        playerVars: {
          'autoplay': 0,
          'controls': 0,
          'mute': 1,
          'loop': 1,
          'playsinline': 1
        },
      });
      resolve();
    });
    p2.then((resolve)=>{
      playOb=[player1,player2,player3,player4,player5,player6];
      console.log('in');
    }).then((resolve)=>{
      console.log(playOb[0].)
    })
  }
  let done = false;
  function onPlayerStateChange(e) {
    if (e.data == YT.PlayerState.PLAYING && !done) {
      done = true;
      //YT.PlayerState.PLAYING 플레이어가 재생중일 때 작성한 동작이 실행된다.
      //원하는 시간만큼만 재생되고 멈추게 하는 것도 가능하다.
      //YT.PlayerState.ENDED 플레이어가 끝났을 때 작성한 동작이 실행된다.
    }
  }
  let curr;
  let playVideoFunc = function () {
    for (let i = 0; i <= sectionOb.length; i += 1) {
      if (curr >= sectionOb[i].sectionOffsetTop && curr < sectionOb[i].sectionOffsetBottom) {
        stop();
        playOb[i].playVideo();
        break;
      }
    }
  }
  let stateCheck;
  let p1 = new Promise((resolve, reject)=>{
    win.addEventListener('load', onYouTubeIframeAPIReady);
    setInterval(stateCheck);
    stateCheck = setInterval(function () {
    if (state) { resolve('in'); clearInterval(stateCheck); return}
    }, 200);
  });
  p1.then((resolve) => {
    win.addEventListener('resize', debounce(() => {
      makeSectionOb();
    }, 600));
    win.addEventListener('scroll', debounce(() => {
      // 현재 스크롤 위치
      curr = win.scrollY;
      playVideoFunc();
    }, 300));
  })
};

ytbFunc(window)

