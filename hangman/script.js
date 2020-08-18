// dom
const wordElement = document.getElementById("word");
const wrongLettersElement = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const figureParts = document.querySelectorAll(".figure-component");

//init
const words = ["basketball", "garage", "coding", "platform"];
let selectedWord = getRandomWord();
let correctLetters = [];
let wrongLetters = [];
displayWord();

// helpers
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function isValidLetter(keyCode = 0) {
  return keyCode >= 65 && keyCode <= 90;
}
function displayWord() {
  wordElement.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ""}
          </span>
        `
      )
      .join("")}
  `;

  const innerWord = wordElement.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "You win";
    popup.style.display = "flex";
  }
}

function updateWrongLetters() {
  wrongLettersElement.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong:</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`).join("")}
  `;

  figureParts.forEach((part, index) => {
    const { length: errors } = wrongLetters;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "You lose";
    popup.style.display = "flex";
  }
}

function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

function handleKeyPress(e) {
  if (e.key === "Enter") restartGame();
  else if (isValidLetter(e.keyCode)) {
    guessLetter(e.key);
  }
}

function guessLetter(letter) {
  if (selectedWord.includes(letter)) {
    if (!correctLetters.includes(letter)) {
      correctLetters.push(letter);
      displayWord();
    } else {
      showNotification();
    }
  } else {
    if (!wrongLetters.includes(letter)) {
      wrongLetters.push(letter);
      updateWrongLetters();
    } else {
      showNotification();
    }
  }
}

function restartGame() {
  correctLetters = [];
  wrongLetters = [];
  const currentWord = selectedWord;
  while (selectedWord === currentWord) selectedWord = getRandomWord();
  displayWord();
  updateWrongLetters();
  popup.style.display = "none";
}

// events
window.addEventListener("keydown", handleKeyPress);
playAgainBtn.addEventListener("click", restartGame);
