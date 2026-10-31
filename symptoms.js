// ===============================
// SmartCare Symptom Assessment
// ===============================

// Pain Level Display

const painSlider = document.getElementById("pain");
const painValue = document.getElementById("painValue");

painSlider.addEventListener("input", function () {

    painValue.innerHTML = painSlider.value;

});

// ===============================
// Analyze Symptoms
// ===============================

document.getElementById("analyzeBtn").addEventListener("click", function () {

    let symptoms = [];

    document.querySelectorAll(".checkbox-grid input:checked").forEach(function (item) {

        symptoms.push(item.value);

    });

    let onset = document.getElementById("onset").value;

    let duration = document.getElementById("duration").value;

    let pain = Number(document.getElementById("pain").value);

    let notes = document.getElementById("notes").value;

    if (symptoms.length === 0) {

        alert("Please select at least one symptom.");

        return;

    }

    if (onset === "") {

        alert("Please select symptom onset.");

        return;

    }

    if (duration === "") {

        alert("Please select symptom duration.");

        return;

    }

    // ===============================
    // Severity Calculation
    // ===============================

    let severity = "Low";

    let hospitalLevel = "Community Health Worker (CHW)";

    let department = "General Medicine";

    // Emergency Symptoms

    if (
        symptoms.includes("Chest Pain") ||
        symptoms.includes("Breathing Difficulty")
    ) {

        severity = "Emergency";

        hospitalLevel = "Super Specialty Hospital";

        department = "Emergency Medicine";

    }

    // Serious Injury

    else if (
        symptoms.includes("Fracture") ||
        symptoms.includes("Injury")
    ) {

        severity = "High";

        hospitalLevel = "District Hospital";

        department = "Orthopedics";

    }

    // Diabetes / BP

    else if (
        symptoms.includes("Diabetes") ||
        symptoms.includes("High Blood Pressure")
    ) {

        severity = "Medium";

        hospitalLevel = "Community Health Centre (CHC)";

        department = "General Medicine";

    }

    // Fever

    else if (
        symptoms.includes("Fever") ||
        symptoms.includes("Cold") ||
        symptoms.includes("Cough")
    ) {

        severity = "Low";

        hospitalLevel = "Primary Health Centre (PHC)";

        department = "General Medicine";

    }

    // Pain Level

    if (pain >= 8 && severity !== "Emergency") {

        severity = "High";

        hospitalLevel = "District Hospital";

    }

    // Long Duration

    if (
        duration === "More than 1 Week" ||
        duration === "More than 1 Month"
    ) {

        if (severity === "Low") {

            severity = "Medium";

            hospitalLevel = "Community Health Centre (CHC)";

        }

    }

    // ===============================
    // Save Data
    // ===============================

    const symptomData = {

        symptoms,

        onset,

        duration,

        pain,

        notes,

        severity,

        hospitalLevel,

        department

    };

    localStorage.setItem(
        "symptomData",
        JSON.stringify(symptomData)
    );

    // Success

    alert("Symptoms analyzed successfully.");

    // Go to Recommendation

    window.location.href = "recommendation.html";

});