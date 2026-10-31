// =====================================
// SmartCare Recommendation Page
// =====================================

// Read data from Local Storage
const data = JSON.parse(localStorage.getItem("symptomData"));

// Check if data exists
if (!data) {
    alert("No symptom data found.");
    window.location.href = "symptoms.html";
}

// Display Symptoms
document.getElementById("symptoms").innerHTML =
    data.symptoms.join(", ");

// Display Severity
const severity = document.getElementById("severity");

severity.innerHTML = data.severity;

// Apply Severity Color
switch (data.severity) {

    case "Low":
        severity.classList.add("low");
        break;

    case "Medium":
        severity.classList.add("medium");
        break;

    case "High":
        severity.classList.add("high");
        break;

    case "Emergency":
        severity.classList.add("emergency");
        break;

}

// Display Recommendation
document.getElementById("hospitalLevel").innerHTML =
    data.hospitalLevel;

document.getElementById("department").innerHTML =
    data.department;

// Recommendation Reason
let reason = "";

switch (data.department) {

    case "Emergency Medicine":

        reason =
        "Chest pain or breathing difficulty requires immediate emergency medical care at a Super Specialty Hospital.";

        break;

    case "Orthopedics":

        reason =
        "Bone fracture or physical injury requires treatment by an Orthopedic specialist.";

        break;

    case "General Medicine":

        if(data.severity==="Low"){

            reason =
            "Your symptoms are mild and can be treated at a Primary Health Centre.";

        }

        else if(data.severity==="Medium"){

            reason =
            "Your symptoms require consultation with a General Physician at a Community Health Centre.";

        }

        else{

            reason =
            "Your symptoms require evaluation at a District Hospital.";

        }

        break;

    default:

        reason =
        "Please consult the recommended healthcare facility.";

}

document.getElementById("reason").innerHTML = reason;

// Continue Button
document.getElementById("continueBtn").addEventListener("click", function(){

    window.location.href="hospitals.html";

});