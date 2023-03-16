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
      sedentary: 1.117,
      light: 1.279,
      moderate: 1.364,
      very_active: 1.605,
      extra_active: 1.768,
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
            <td class="border px-4 py-2">
              <div>Mild Weight Loss</div>
              <div class="text-sm text-gray-600">(0.5 lb/week)</div>
            </td>
            <td class="border px-4 py-2">
              <div class="font-semibold text-lg">${numberWithCommas(Math.round(calculateCaloriesAndPercentage(-0.5).calories))} <span class="font-normal text-sm">(${calculateCaloriesAndPercentage(-0.5).percentage.toFixed(2)}%)</span></div>
              <div class="text-sm text-gray-600">Calories/day</div>
            </td>
          </tr>
          <tr>
            <td class="border px-4 py-2">
              <div>Weight Loss</div>
              <div class="text-sm text-gray-600">(1 lb/week)</div>
            </td>
            <td class="border px-4 py-2">
              <div class="font-semibold text-lg">${numberWithCommas(Math.round(calculateCaloriesAndPercentage(-1).calories))} <span class="font-normal text-sm">(${calculateCaloriesAndPercentage(-1).percentage.toFixed(2)}%)</span></div>
              <div class="text-sm text-gray-600">Calories/day</div>
            </td>
          </tr>
          <tr>
            <td class="border px-4 py-2">
              <div>Extreme Weight Loss</div>
              <div class="text-sm text-gray-600">(2 lb/week)</div>
            </td>
            <td class="border px-4 py-2">
              <div class="font-semibold text-lg">${numberWithCommas(Math.round(calculateCaloriesAndPercentage(-2).calories))} <span class="font-normal text-sm">(${calculateCaloriesAndPercentage(-2).percentage.toFixed(2)}%)</span></div>
              <div class="text-sm text-gray-600">Calories/day</div>
            </td>
          </tr>
        `;
     } else if (window.goal === 'gain') {
        return `
          <tr>
            <td class="border px-4 py-2">
              <div>Mild Weight Gain</div>
              <div class="text-sm text-gray-600">(0.5 lb/week)</div>
            </td>
            <td class="border px-4 py-2">
              <div class="font-semibold text-lg">${numberWithCommas(Math.round(calculateCaloriesAndPercentage(0.5).calories))} <span class="font-normal text-sm">(${calculateCaloriesAndPercentage(0.5).percentage.toFixed(2)}%)</span></div>
              <div class="text-sm text-gray-600">Calories/day</div>
            </td>
          </tr>
          <tr>
            <td class="border px-4 py-2">
              <div>Weight Gain</div>
              <div class="text-sm text-gray-600">(1 lb/week)</div>
            </td>
            <td class="border px-4 py-2">
              <div class="font-semibold text-lg">${numberWithCommas(Math.round(calculateCaloriesAndPercentage(1).calories))} <span class="font-normal text-sm">(${calculateCaloriesAndPercentage(1).percentage.toFixed(2)}%)</span></div>
              <div class="text-sm text-gray-600">Calories/day</div>
            </td>
          </tr>
          <tr>
            <td class="border px-4 py-2">
              <div>Extreme Weight Gain</div>
              <div class="text-sm text-gray-600">(2 lb/week)</div>
            </td>
            <td class="border px-4 py-2">
              <div class="font-semibold text-lg">${numberWithCommas(Math.round(calculateCaloriesAndPercentage(2).calories))} <span class="font-normal text-sm">(${calculateCaloriesAndPercentage(2).percentage.toFixed(2)}%)</span></div>
              <div class="text-sm text-gray-600">Calories/day</div>
            </td>
          </tr>
        `;
     } else {
       return '';
     }
   };
    
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const maintenanceRow = () => {
      const calories = Math.round(maintenanceCalories);
      const percentage = 100;

      return `
        <tr>
          <td class="border px-4 py-2">
            <div>Maintenance</div>
          </td>
          <td class="border px-4 py-2">
            <div class="font-semibold text-lg">${numberWithCommas(calories)} <span class="font-normal text-sm">(${percentage}%)</span></div>
            <div class="text-sm text-gray-600">Calories/day</div>
          </td>
        </tr>
      `;
    };

    const resultsElement = document.getElementById("results");
    resultsElement.innerHTML = `
      <h2 class="text-2xl font-bold mb-2">Results</h2>
      <p class="mb-4">Daily protein intake: <strong>${Math.round(proteinIntake)} grams</strong></p>
      <table class="w-full table-auto">
        <thead>
          <tr>
            <th class="border px-4 py-2">Goal</th>
            <th class="border px-4 py-2">Calories</th>
          </tr>
        </thead>
        <tbody>
          ${maintenanceRow()}
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
      const weightInKg = weight * 0.453592;
      const heightInCm = height * 2.54;

      if (gender === "male") {
        bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5;
      } else if (gender === "female") {
        bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161;
      }

      return bmr;
    }



    function calculateTDEE(bmr, activity) {
      const activityMultipliers = {
        sedentary: 1.117,
        light: 1.279,
        moderate: 1.364,
        very_active: 1.605,
        extra_active: 1.768,
      };

      return Math.round(bmr * activityMultipliers[activity]);
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
        
        const chartData = generateWeightChartData(
        new Date(startDate),
        currentWeight,
        goalWeight,
        lbsPerWeek
      );
      renderWeightChart(chartData);
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

    
    function generateWeightChartData(startDate, currentWeight, goalWeight, lbsPerWeek) {
  const weeksToReachGoal = Math.abs(currentWeight - goalWeight) / lbsPerWeek;
  const weightChangePerWeek = lbsPerWeek * (currentWeight > goalWeight ? -1 : 1);
  const labels = [];
  const data = [];

  for (let i = 0; i <= weeksToReachGoal; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i * 7);
    labels.push(currentDate.toISOString().slice(0, 10));

    const currentWeekWeight = currentWeight + i * weightChangePerWeek;
    data.push(currentWeekWeight);
  }

  return { labels, data };
}

function renderWeightChart(chartData) {
  const ctx = document.getElementById("weightChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: chartData.labels,
      datasets: [
        {
          label: "Weight (lbs)",
          data: chartData.data,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: "rgba(75, 192, 192, 1)",
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "week",
            displayFormats: {
              week: "MMM d",
            },
            parser: "yyyy-MM-dd",
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 20,
          },
        },
        y: {
          beginAtZero: false,
        },
      },
    },

  });
}

    displayBodyWeightPlannerResults(calorieIntakeToReachGoal, estimatedEndDate);
});
