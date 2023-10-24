  (function(){
  
  // ** youtube API 불러오기 **
  // 태그 생성
  let tag = document.createElement('script');
  // script tag의 src 속성 할당
  tag.src = "https://www.youtube.com/iframe_api";
  // 생성된 script 태그를 script태그들의 첫번째에 위치시키기
  let firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // ** 플레이어 설정 **
  let player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('video1', {
      height: '360', // 영상의 높이 값
      width: '640', // 영상의 너비 값
      videoId: 'EjvSTsFnWKY', // 유튜브 임베드 고유의 id (11자)
      playerVars: {
        'autoplay': 0, // autoplay false
        'controls': 0, // constrol false
        'loop': 1   // 반복재생 true
      },
      events: {
        'onReady': onPlayerReady,  // 실행 함수
        'onStateChange': onPlayerStateChange // 영상상태체크함수
      }
    });
  }
  let curr;
  let section05 = document.querySelector('.section_05').clientHeight;
  function onPlayerReady() {
    // 로딩된 후에 실행될 동작을 작성한다(소리 크기,동영상 속도를 미리 지정하는 것등등...)
    // event.target.playVideo(); //자동재생

    // ex) 스크롤 이벤트의 경우
    window.addEventListener('scroll', function () {
      // 자동재생 되지 않을 범위값 구하기  
      let v_section1 = section05 * 4 - 200;
      let v_section2 = section05 * 5 - 350;
      // 현재 스크롤 위치
      curr = window.scrollY;
      // 플레이 중지 될 조건
      if (curr > v_section2 || curr < v_section1) {
        player.stopVideo();
      } // 재생될 조건
      else if (curr < v_section2 && curr > v_section1) {
        player.playVideo();
        player.mute();  // 자동재생시 mute 처리
      }
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
  window.addEventListener('load', onYouTubeIframeAPIReady);
  })();