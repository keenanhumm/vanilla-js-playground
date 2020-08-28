// dom
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// init
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];
let randomWord;
let score = 0;
let time = 10;
let difficulty = localStorage.getItem("difficulty")
  ? localStorage.getItem("difficulty")
  : "medium";
difficultySelect.value = difficulty;
const timeInterval = setInterval(updateTime, 1000);

addWordToDOM();
text.focus();

// helpers
function updateTime() {
  time--;
  timeEl.innerHTML = `${time}s`;
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out!</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Play again</button>
  `;
  endgameEl.style.display = "flex";
}
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

function updateScore(amount) {
  score += amount;
  scoreEl.innerHTML = score;
}

function handleTextInput(e) {
  const {
    target: { value },
  } = e;

  if (value === randomWord) {
    updateScore(randomWord.length);
    addWordToDOM();
    text.value = "";
    let incr;
    switch (difficulty) {
      case "medium":
        incr = 2;
        break;
      case "hard":
        incr = 1;
        break;
      default:
        incr = 3;
    }
    time += incr;
  }
}

function handleClickSettings() {
  settings.classList.toggle("hide");
}

function handleDifficultyChange(e) {
  localStorage.setItem("difficulty", e.target.value);
}

function handleKeyPress(e) {
  if (e.key === "Enter") {
    location.reload();
  }
}

// events
text.addEventListener("input", handleTextInput);
settingsBtn.addEventListener("click", handleClickSettings);
difficultySelect.addEventListener("change", handleDifficultyChange);
window.addEventListener("keypress", handleKeyPress);
