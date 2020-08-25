// dom
const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// init
const songs = ["hey", "summer", "ukulele"];
let songIndex = 1;
loadSong(songs[songIndex]);

// helpers

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add("play");
  const playbackIcon = playBtn.querySelector("i.fas");
  playbackIcon.classList.remove("fa-play");
  playbackIcon.classList.add("fa-pause");

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  const playbackIcon = playBtn.querySelector("i.fas");
  playbackIcon.classList.remove("fa-pause");
  playbackIcon.classList.add("fa-play");

  audio.pause();
}

function handleClickPlayback() {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}

function goToPrevious() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

function goToNext() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const percentProgress = (currentTime / duration) * 100;
  progress.style.width = `${percentProgress}%`;
}

function setProgress(e) {
  const { clientWidth } = this;
  const { offsetX } = e;
  const { duration } = audio;

  audio.currentTime = (offsetX / clientWidth) * duration;
}

// events
playBtn.addEventListener("click", handleClickPlayback);
prevBtn.addEventListener("click", goToPrevious);
nextBtn.addEventListener("click", goToNext);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", goToNext);
