// targeting dom elements
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// helpers
function toSentenceCase(str) {
  return str[0].toUpperCase() + str.slice(1);
}
function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${toSentenceCase(input.id)} is required`);
    } else {
      showSuccess(input);
    }
  });
}
function checkPasswordsMatch(password, password2) {
  if (password.value !== password2.value) {
    showError(password2, "Passwords do not match");
  }
}
function checkEmail(input) {
  if (isValidEmail(input.value.trim())) showSuccess(input);
  else showError(input, "Email is not valid");
}
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${toSentenceCase(input.id)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${toSentenceCase(input.id)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
