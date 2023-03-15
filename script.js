document.getElementById("calculatorForm").addEventListener("submit", (e) => {
  e.preventDefault();
  getUserInput();
  displayResults();
});

function getUserInput() {
  window.age = parseFloat(document.getElementById("age").value);
  window.weight = parseFloat(document.getElementById("weight").value);
  window.heightFeet = parseFloat(document.getElementById("heightFeet").value);
  window.heightInches = parseFloat(document.getElementById("heightInches").value);
  window.gender = document.getElementById("gender").value;
  window.activity = parseFloat(document.getElementById("activity").value);
  window.goal = document.getElementById("goal").value;
}

function calculateDailyProtein() {
  const weightInKg = window.weight * 0.453592; // Convert lbs to kg
  const proteinFactors = {
    lose: 1.2,
    maintain: 1.6,
    gain: 2.2
  };
  return weightInKg * proteinFactors[goal];
}

function calculateDailyCalories() {
  const weightInKg = window.weight * 0.453592; // Convert lbs to kg
  const heightInCm = (window.heightFeet * 12 + window.heightInches) * 2.54; // Convert feet and inches to cm
  const BMR =
    (10 * weightInKg) +
    (6.25 * heightInCm) -
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
