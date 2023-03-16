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
  window.goal = document.getElementById("bwpgainlose").value;
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
    ? (10 * weightInKg) + (6.25 * heightInCm) - (5 * window.age) + 5
    : (10 * weightInKg) + (6.25 * heightInCm) - (5 * window.age) - 161;
  const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very_active: 1.725,
      extra_active: 2.0
    };

  const adjustedBMR = BMR * activityMultipliers[activity];
  
  return adjustedBMR;
}


function displayResults() {
   const proteinIntake = calculateDailyProtein();
   const dailyCalories = calculateDailyCalories();
   const maintenanceCalories = dailyCalories;

   const calculateCaloriesAndPercentage = (lbsPerWeek) => {
     const caloriesPerLb = 3500;
     const calories = dailyCalories + (lbsPerWeek * caloriesPerLb) / 7;
     const percentage = (calories / maintenanceCalories) * 100;
     return { calories, percentage };
   };

   const goalRows = () => {
     if (window.goal === 'lose') {
       return `
         <tr>
           <td class="border px-4 py-2">Mild Weight Loss (0.5 lb/week)</td>
           <td class="border px-4 py-2 font-semibold">
             ${calculateCaloriesAndPercentage(-0.5).calories} (${calculateCaloriesAndPercentage(-0.5).percentage.toFixed(2)}%)
           </td>
         </tr>
         <tr>
           <td class="border px-4 py-2">Weight Loss (1 lb/week)</td>
           <td class="border px-4 py-2 font-semibold">
             ${calculateCaloriesAndPercentage(-1).calories} (${calculateCaloriesAndPercentage(-1).percentage.toFixed(2)}%)
           </td>
         </tr>
         <tr>
           <td class="border px-4 py-2">Extreme Weight Loss (2 lb/week)</td>
           <td class="border px-4 py-2 font-semibold">
             ${calculateCaloriesAndPercentage(-2).calories} (${calculateCaloriesAndPercentage(-2).percentage.toFixed(2)}%)
           </td>
         </tr>
       `;
     } else if (window.goal === 'gain') {
       return `
         <tr>
           <td class="border px-4 py-2">Mild Weight Gain (0.5 lb/week)</td>
           <td class="border px-4 py-2 font-semibold">
             ${calculateCaloriesAndPercentage(0.5).calories} (${calculateCaloriesAndPercentage(0.5).percentage.toFixed(2)}%)
           </td>
         </tr>
         <tr>
           <td class="border px-4 py-2">Weight Gain (1 lb/week)</td>
           <td class="border px-4 py-2 font-semibold">
             ${calculateCaloriesAndPercentage(1).calories} (${calculateCaloriesAndPercentage(1).percentage.toFixed(2)}%)
           </td>
         </tr>
         <tr>
           <td class="border px-4 py-2">Extreme Weight Gain (2 lb/week)</td>
           <td class="border px-4 py-2 font-semibold">
             ${calculateCaloriesAndPercentage(2).calories} (${calculateCaloriesAndPercentage(2).percentage.toFixed(2)}%)
           </td>
         </tr>
       `;
     } else {
       return '';
     }
   };

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
           <td class="border px-4 py-2">Maintenance</td>
           <td class="border px-4 py-2 font-semibold">
             <span style="color: gray;">${maintenanceCalories.toFixed(2)} (100%)</span>
           </td>
         </tr>
         ${goalRows()}
       </tbody>
     </table>
   `;
 }




document.getElementById("bodyWeightPlannerForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const currentWeight = parseFloat(document.getElementById("currentWeight").value);
    const goalWeight = parseFloat(document.getElementById("goalWeight").value);
    const gender = document.getElementById("bwpgender").value;
    const age = parseInt(document.getElementById("bwpage").value);
    const heightFeet = parseInt(document.getElementById("bwpheightFeet").value);
    const heightInches = parseInt(document.getElementById("bwpheightInches").value);
    const activity = document.getElementById("bwpactivity").value;
    const lbsPerWeek = parseFloat(document.getElementById("lbsPerWeek").value);
    const goal = document.getElementById("bwpgainlose").value;
    const startDate = document.getElementById("startDate").value;

    const height = heightFeet * 12 + heightInches;
    const bmr = calculateBMR(gender, age, height, currentWeight);
    const tdee = calculateTDEE(bmr, activity);
    const calorieIntakeToReachGoal = calculateCalorieIntakeToReachGoal(tdee, lbsPerWeek, goal);
    const estimatedEndDate = calculateEstimatedEndDate(new Date(startDate), currentWeight, goalWeight, lbsPerWeek);

    function calculateBMR(gender, age, height, weight) {
      let bmr;

      if (gender === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      } else if (gender === "female") {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
      }

      return bmr;
    }

    function calculateTDEE(bmr, activityMultiplier) {
        return Math.round(bmr * parseFloat(activityMultiplier));
    }

    
    function calculateCalorieIntakeToReachGoal(tdee, lbsPerWeek, goal) {
      const caloriesPerLb = 3500;
      const calorieDifference = lbsPerWeek * caloriesPerLb;

      if (goal === "lose") {
        return Math.round(tdee - calorieDifference / 7);
      } else if (goal === "gain") {
        return Math.round(tdee + calorieDifference / 7);
      } else {
        return tdee;
      }
    }

    function calculateEstimatedEndDate(startDate, currentWeight, goalWeight, lbsPerWeek) {
      const weeksToReachGoal = Math.abs(currentWeight - goalWeight) / lbsPerWeek;
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + weeksToReachGoal * 7);
      return endDate;
    }

    function displayBodyWeightPlannerResults(dailyCalorieIntake, estimatedEndDate) {
      const resultsElement = document.getElementById("bodyWeightPlannerResults");
      const formattedEndDate = `${estimatedEndDate.toLocaleString("en-us", {
        month: "long",
      })} ${ordinalSuffix(estimatedEndDate.getDate())}, ${estimatedEndDate.getFullYear()}`;

      resultsElement.innerHTML = `
        <h2 class="text-xl font-bold mb-2">Results:</h2>
        <p>To reach your goal, you should consume approximately <strong>${dailyCalorieIntake} calories</strong> per day.</p>
        <p>Your estimated end date is <strong>${formattedEndDate}</strong>.</p>
      `;
    }

    function ordinalSuffix(day) {
      let suffix = "th";

      if (day % 10 === 1 && day % 100 !== 11) {
        suffix = "st";
      } else if (day % 10 === 2 && day % 100 !== 12) {
        suffix = "nd";
      } else if (day % 10 === 3 && day % 100 !== 13) {
        suffix = "rd";
      }

      return day + suffix;
    }

    displayBodyWeightPlannerResults(calorieIntakeToReachGoal, estimatedEndDate);
});
