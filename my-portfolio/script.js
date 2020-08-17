// dom

const toggle = document.getElementById("toggle");
const closeBtn = document.getElementById("close");
const openBtn = document.getElementById("open");
const modal = document.getElementById("modal");

// helpers
function handleToggleMenu() {
  document.body.classList.toggle("show-nav");
}
function openModal() {
  modal.classList.add("show-modal");
}
function closeModal() {
  modal.classList.remove("show-modal");
}
function handleClickOutsideModal(e) {
  return e.target === modal ? closeModal() : false;
}

// events
toggle.addEventListener("click", handleToggleMenu);
openBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", handleClickOutsideModal);
