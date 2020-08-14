// dom
const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMilBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calcWealthBtn = document.getElementById("calculate-wealth");

// init
let people = [];
getRandomUser();
getRandomUser();
getRandomUser();
console.log(people);
updateDOM();

// helpers
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const { results = [] } = await res.json();
  const {
    name: { first = "", last = "" },
  } = results[0];

  addPerson({
    fullName: `${first} ${last}`,
    money: Math.floor(Math.random() * 1000000),
  });

  updateDOM();
}

function addPerson(person) {
  people.push(person);
}

function updateDOM() {
  main.innerHTML = main.querySelector("h2").outerHTML;

  people.forEach((person) => {
    const personRow = document.createElement("div");
    personRow.classList.add("person");
    personRow.innerHTML = `<strong>${person.fullName}</strong> ${formatMoney(
      person.money
    )}`;
    main.appendChild(personRow);
  });
}

function formatMoney(amount) {
  return "$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

function doubleMoney() {
  people = people.map((person) => ({
    ...person,
    money: person.money * 2,
  }));

  updateDOM();
}

function sortByRichest() {
  people.sort((a, b) => b.money - a.money);

  updateDOM();
}

function showOnlyMillionaires() {
  people = people.filter((person) => person.money >= 1000000);

  updateDOM();
}

function calculateWealth() {
  const total = people.reduce((acc, person) => (acc += person.money), 0);

  const totalElement = document.createElement("div");
  totalElement.innerHTML = `
    <h3>
      Total wealth: <strong>${formatMoney(total)}</strong>
    </h3>
  `;

  main.appendChild(totalElement);
}

// events
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMilBtn.addEventListener("click", showOnlyMillionaires);
calcWealthBtn.addEventListener("click", calculateWealth);
