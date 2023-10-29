function debounce(callback, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(context, args), wait);
  }
}


(function () {
  let body = document.querySelector('body');
  let sectionArr = document.querySelectorAll('.section');
  let sectionOb;
  // 섹션 초기화 함수
  let init = function () {
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
  init();
  
  function VideoFunc () {
    this.stopVd=function(notPlay){
      for (let x = 0; x < objArr.length; x += 1) {
        if (x !== notPlay) {
          objArr[x].pauseVideo();
        }
      }
    }
    this.sectionChk = function(idx){ 
      for (let i = 0; i < objArr.length; i += 1) {
        if (curr >= sectionOb[i].sectionOffsetTop && curr < sectionOb[i].sectionOffsetBottom) {
          if (idx === i) return;
          this.stopVd(i);
          idx = i;
          objArr[i].playVideo();
          break;
        }
      }
    }
  }
  const effectOb= new VideoFunc();
  // ** youtube API 불러오기 **
  // 태그 생성
  let scriptTag = document.createElement('script');
  // script tag의 src 속성 할당
  scriptTag.src = "https://www.youtube.com/iframe_api";
  // 생성된 script 태그를 script태그들의 첫번째에 위치시키기
  let firstScriptTag = document.querySelector('.ytb_script');
  firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
  // ** 플레이어 설정 **
  let ytbArr = document.querySelectorAll('.youtube');
  let idArr = [], videoIdArr = [], objArr = [];
  // 아이디 추가, 생성될객체 아이디배열생성, 가져올 11자리 아이디 배열 생성 
  ytbArr.forEach((item, index) => {
    item.setAttribute("id", "player" + index); // 아이디 값 추가
    idArr.push("player" + index); // 아이디 값 배열에 넣기
    videoIdArr.push(item.getAttribute("data-videoid")); // 동영상 url 배열에 넣기
  });
  let curr = window.scrollY;
  let player, idx;
  // iframe을 만들어주는 함수, onReady에서 실행할 함수에 들어가는 함수나 요소들은 이 함수 안에 만들어 주기 => 객체 생성 완료시점을 컨트롤하기 어렵기 때문
  let onYouTubeIframeAPIReady = function () {
    objArr = [];

    for (var i = 0; i < ytbArr.length; i += 1) {
      player = new YT.Player(idArr[i], {
        height: '360', // 영상의 높이 값
        width: '640', // 영상의 너비 값
        videoId: videoIdArr[i], // 유튜브 임베드 고유의 id (11자)
        playerVars: {
          'autoplay': i==0? 1 : 0, // autoplay false
          'controls': 1, // constrol false
          'mute': 1, // 음소거
          'loop': 0,   // 반복재생 true
          'playsinline': 1, // ios환경에서 전체화면으로 재생하지 않기
        },
        events: {
          'onReady': onPlayerReady,  // onReady 상태일 때 작동하는 function이름
          // 'onStateChange':onPlayerReady// 영상상태체크함수 : onStateChange 상태일 때 작동하는 function이름
        },
      });
      objArr.push(player);
      
    }

  }

  let onPlayerReady = function () {
    window.addEventListener('resize', debounce(() => {
      init();
    }, 600),{passive:true});
    window.addEventListener('scroll', debounce(() => {
      // 현재 스크롤 위치
      curr = window.scrollY;
      effectOb.sectionChk(idx);
    }, 200),{passive:true});
  }

  window.addEventListener('load', onYouTubeIframeAPIReady);
})();