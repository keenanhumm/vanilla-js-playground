// dom
const searchInput = document.getElementById("search");
const searchForm = document.getElementById("search-form");
const randomBtn = document.getElementById("random");
const mealsElement = document.getElementById("meals");
const resultsHeading = document.getElementById("result-heading");
const singleMealElement = document.getElementById("single-meal");

// helpers
function searchMeal(e) {
  e.preventDefault();

  singleMealElement.innerHTML = "";
  const term = searchInput.value;

  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then(({ meals = null }) => {
        resultsHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

        if (!meals) {
          resultsHeading.innerHTML = `<h2>Your search did not return any results. Please try again.</h2>`;
          mealsElement.innerHTML = "";
        } else {
          mealsElement.innerHTML = meals
            .map(
              (meal) => `
          <div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="meal-info" data-mealid=${meal.idMeal}>
              <h3>${meal.strMeal}</h3>
            </div>
          </div>
        `
            )
            .join("");
        }
      });
    searchInput.value = "";
  } else {
    alert("Please enter a search value");
  }
}

function getMealById(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then(({ meals }) => {
      const meal = meals[0];
      addMealToDOM(meal);
    });
}

function getRandomMeal() {
  meals.innerHTML = "";
  resultsHeading.innerText = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then(({ meals }) => {
      const meal = meals[0];
      addMealToDOM(meal);
    });
}

function addMealToDOM(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const amount = meal[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push(`${ingredient} - ${amount}`);
    } else {
      break;
    }
  }
  singleMealElement.innerHTML = `
      <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="single-meal-info">
          ${meal.strCategory && `<p>${meal.strCategory}</p>`}
          ${meal.strArea && `<p>${meal.strArea}</p>`}
        </div>
        <div class="main">
          <p>${meal.strInstructions}</p>
          <h2>Ingredients</h2>
          <ul>
            ${ingredients
              .map((ingredient) => `<li>${ingredient}</li>`)
              .join("")}
          </ul>
        </div>
      </div>
    `;
}

function handleClickMeal(e) {
  const mealInfo = e.path.find(
    (element) => element.classList && element.classList.contains("meal-info")
  );

  if (mealInfo) {
    const mealId = mealInfo.getAttribute("data-mealid");
    const meal = getMealById(mealId);
  }
}

// events
searchForm.addEventListener("submit", searchMeal);
randomBtn.addEventListener("click", getRandomMeal);
mealsElement.addEventListener("click", handleClickMeal);
