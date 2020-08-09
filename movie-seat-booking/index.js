// dom
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;

loadExistingSelection();

// helpers
function loadExistingSelection() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  const selectedMovie = JSON.parse(localStorage.getItem("selectedMovie"));

  if (selectedSeats && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.includes(index)) {
        seat.classList.add("selected");
      }
    });
  }

  if (selectedMovie) {
    movieSelect.selectedIndex = selectedMovie;
  }

  updateSelectedCount();
  updateTotalPrice();
}
function getSelectedSeats() {
  return document.querySelectorAll(".row .seat.selected");
}
function saveCurrentSelection() {
  const selectedIndices = [...getSelectedSeats()].map((seat) =>
    [...seats].indexOf(seat)
  );
  localStorage.setItem("selectedSeats", JSON.stringify(selectedIndices));
  localStorage.setItem("selectedMovie", movieSelect.selectedIndex);
  localStorage.setItem("selectedMoviePrice", movieSelect.value);
}
function getSelectedCount() {
  return getSelectedSeats().length;
}

function updateSelectedCount() {
  count.innerText = getSelectedCount();
}

function updateTotalPrice() {
  total.innerText = getSelectedCount() * movieSelect.value;
}

function handleClickSeat(e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
    updateTotalPrice();
    saveCurrentSelection();
  }
}

function handleSelectMovie(e) {
  ticketPrice = +e.target.value;
  updateTotalPrice();
  saveCurrentSelection();
}

// events
container.addEventListener("click", handleClickSeat);
movieSelect.addEventListener("change", handleSelectMovie);
