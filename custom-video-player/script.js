// dom
const video = document.getElementById("video");
const playButton = document.getElementById("play");
const stopButton = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

// helpers
function toggleVideoStatus() {
  if (video.paused) video.play();
  else video.pause();
}

function updatePlaybackIcon() {
  if (video.paused) {
    playButton.innerHTML = "<i class='fa fa-play fa-2x'></i>";
  } else {
    playButton.innerHTML = "<i class='fa fa-pause fa-2x'></i>";
  }
}

function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) mins = "0" + String(mins);
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) secs = "0" + String(secs);

  timestamp.innerText = `${mins}:${secs}`;
}

function setVideoProgress() {
  video.currentTime = (+progress.value / 100) * video.duration;
}

function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

// events
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlaybackIcon);
video.addEventListener("play", updatePlaybackIcon);
video.addEventListener("timeupdate", updateProgress);

playButton.addEventListener("click", toggleVideoStatus);

stopButton.addEventListener("click", stopVideo);

progress.addEventListener("change", setVideoProgress);
