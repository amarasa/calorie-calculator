document.getElementById("calculatorForm").addEventListener("submit", (e) => {
  e.preventDefault();
  getUserInput();
  displayResults();
});

function getUserInput() {
  window.age = parseFloat(document.getElementById("age").value);
  window.weight = parseFloat(document.getElementById("weight").value);
  window.height = parseFloat(document.getElementById("height").value);
  window.gender = document.getElementById("gender").value;
  window.activity = parseFloat(document.getElementById("activity").value);
  window.goal = document.getElementById("goal").value;
}

function calculateDailyProtein() {
  const proteinFactors = {
    lose: 1.2,
    maintain: 1.6,
    gain: 2.2
  };
  return weight * proteinFactors[goal];
}

function calculateDailyCalories() {
  const BMR =
    (10 * weight) +
    (6.25 * height) -
    (5 * age) +
    (gender === "male" ? 5 : -161);
  const adjustedBMR = BMR * activity;
  const goalCalories = {
    lose: -500,
    maintain: 0,
    gain: 500
  };
  return adjustedBMR + goalCalories[goal];
}

function displayResults() {
  const proteinIntake = calculateDailyProtein();
  const dailyCalories = calculateDailyCalories();
  const resultsElement = document.getElementById("results");
  resultsElement.innerHTML = `
    <h2 class="text-2xl font-bold mb-2">Results</h2>
    <p>Daily protein intake: <strong>${proteinIntake.toFixed(2)} grams</strong></p>
    <p>Daily calorie intake: <strong>${dailyCalories.toFixed(2)} calories</strong></p>
  `;
}
