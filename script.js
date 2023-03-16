document.getElementById("protein-calorie-btn").addEventListener("click", () => {
    document.getElementById("main").style.display = "none";
    document.getElementById("protein-calorie-calculator").style.display = "block";
});

document.getElementById("body-weight-planner-btn").addEventListener("click", () => {
    document.getElementById("main").style.display = "none";
    document.getElementById("body-weight-planner").style.display = "block";
});


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
  window.activity = document.getElementById("activity").value;
  window.goal = document.getElementById("goal").value;
}

function calculateDailyProtein() {
  const proteinFactors = {
    sedentary: 0.8,
    light: 1.0,
    moderate: 1.2,
    very_active: 1.5,
    extra_active: 1.8,
  };

  const proteinPerPound = proteinFactors[activity];
  const proteinIntake = window.weight * proteinPerPound;

  return proteinIntake;
}

function calculateDailyCalories() {
  const weightInKg = window.weight * 0.453592;
  const heightInCm = (window.heightFeet * 12 + window.heightInches) * 2.54;
  const BMR = (window.gender === "male")
    ? 66.5 + (13.75 * weightInKg) + (5.003 * heightInCm) - (6.75 * window.age)
    : 655.1 + (9.563 * weightInKg) + (1.850 * heightInCm) - (4.676 * window.age);
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very_active: 1.725,
    extra_active: 1.9
  };
  const adjustedBMR = BMR * activityMultipliers[activity];
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
  const caloriesForWeightLoss = dailyCalories - 500;
  const caloriesForMaintenance = dailyCalories;
  const caloriesForWeightGain = dailyCalories + 500;

  const resultsElement = document.getElementById("results");
  resultsElement.innerHTML = `
    <h2 class="text-2xl font-bold mb-2">Results</h2>
    <p>Daily protein intake: <strong>${proteinIntake.toFixed(2)} grams</strong></p>
    <table class="w-full table-auto">
      <thead>
        <tr>
          <th class="border px-4 py-2">Goal</th>
          <th class="border px-4 py-2">Calories</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border px-4 py-2">Weight Loss</td>
          <td class="border px-4 py-2 font-semibold">
            ${goal === "lose" ? "<strong>" : ""}
            ${caloriesForWeightLoss.toFixed(2)}
            ${goal === "lose" ? "</strong>" : ""}
          </td>
        </tr>
        <tr>
          <td class="border px-4 py-2">Maintenance</td>
          <td class="border px-4 py-2 font-semibold">
            ${goal === "maintain" ? "<strong>" : ""}
            ${caloriesForMaintenance.toFixed(2)}
            ${goal === "maintain" ? "</strong>" : ""}
          </td>
        </tr>
        <tr>
          <td class="border px-4 py-2">Weight Gain</td>
          <td class="border px-4 py-2 font-semibold">
            ${goal === "gain" ? "<strong>" : ""}
            ${caloriesForWeightGain.toFixed(2)}
            ${goal === "gain" ? "</strong>" : ""}
          </td>
        </tr>
      </tbody>
    </table>
  `;
}


document.getElementById("bodyWeightPlannerForm").addEventListener("submit", (e) => {
    e.preventDefault();

    // Get user input
    const currentWeight = parseFloat(document.getElementById("currentWeight").value);
    const goalWeight = parseFloat(document.getElementById("goalWeight").value);
    const gender = document.getElementById("gender").value;
    const age = parseFloat(document.getElementById("age").value);
    const heightFeet = parseFloat(document.getElementById("heightFeet").value);
    const heightInches = parseFloat(document.getElementById("heightInches").value);
    const activity = document.getElementById("activity").value;
    const lbsPerWeek = parseFloat(document.getElementById("lbsPerWeek").value);
    const startDate = document.getElementById("startDate").value;

    // Calculate BMR using Mifflin-St Jeor equation
    const height = (heightFeet * 12) + heightInches;
    let bmr;

    if (gender === "male") {
        bmr = 10 * currentWeight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * currentWeight + 6.25 * height - 5 * age - 161;
    }

    // Calculate TDEE
    const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        very_active: 1.725,
        extra_active: 1.9
    };

    const tdee = bmr * activityMultipliers[activity];

    // Calculate daily calorie deficit
    const calorieDeficitPerLb = 3500;
    const dailyCalorieDeficit = (lbsPerWeek * calorieDeficitPerLb) / 7;

    // Calculate daily calorie intake
    const dailyCalorieIntake = tdee - dailyCalorieDeficit;

    // Calculate end date
    const totalWeeks = (currentWeight - goalWeight) / lbsPerWeek;
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(startDateObj.getTime() + (totalWeeks * 7 * 24 * 60 * 60 * 1000));
    const endDate = endDateObj.toLocaleDateString();

    // Display results
    const resultsElement = document.getElementById("bodyWeightPlannerResults");
    resultsElement.innerHTML = `
        <h2 class="text-xl font-bold mb-2">Results</h2>
        <p>Current Weight: ${currentWeight.toFixed(1)} lbs</p>
        <p>Goal Weight: ${goalWeight.toFixed(1)} lbs</p>
        <p>Daily Calorie Intake: ${dailyCalorieIntake.toFixed(0)} calories</p>
        <p>Estimated End Date: ${endDate}</p>
    `;
});

