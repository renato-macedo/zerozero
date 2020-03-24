var video = document.querySelector(
  '#movie_player > div.html5-video-container > video'
);
var progressBar = document.querySelector(
  '#movie_player > div.ytp-chrome-bottom > div.ytp-progress-bar-container'
);

progressBar.addEventListener('click', e => {
  console.log(video.getCurrentTime());
});
video.addEventListener();
