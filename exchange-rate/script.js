// dom
const currencyElement1 = document.getElementById("currency-one");
const currencyElement2 = document.getElementById("currency-two");
const amountElement1 = document.getElementById("amount-one");
const amountElement2 = document.getElementById("amount-two");

const rateElement = document.getElementById("rate");
const swap = document.getElementById("swap");

// init
calculate();

// helpers
function calculate() {
  const { value: currency1 } = currencyElement1;
  const { value: currency2 } = currencyElement2;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency1}`)
    .then((res) => res.json())
    .then((data) => {
      const { rates = [] } = data;
      const rate = rates[currency2];

      rateElement.innerText = `1 ${currency1} = ${rate} ${currency2}`;

      amountElement2.value = (amountElement1.value * rate).toFixed(2);
    });
}

function swapCurrencies() {
  const temp = currencyElement1.value;
  currencyElement1.value = currencyElement2.value;
  currencyElement2.value = temp;
  calculate();
}

// events
currencyElement1.addEventListener("change", calculate);
currencyElement2.addEventListener("change", calculate);
amountElement1.addEventListener("input", calculate);
amountElement2.addEventListener("input", calculate);
swap.addEventListener("click", swapCurrencies);
