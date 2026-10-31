// =====================================
// SMARTCARE INSURANCE VERIFICATION
// =====================================

// Load selected hospital
const hospital = JSON.parse(localStorage.getItem("selectedHospital"));

// If no hospital is selected
if (!hospital) {

    alert("Please select a hospital first.");

    window.location.href = "hospitals.html";

}

// Display hospital name
document.getElementById("hospitalName").innerHTML =
    hospital.name;

// Get Elements
const provider = document.getElementById("provider");
const policy = document.getElementById("policy");
const status = document.getElementById("status");

let insuranceVerified = false;

// Verify Button
document.getElementById("verifyBtn").addEventListener("click", function () {

    if (provider.value === "") {

        alert("Please select an insurance provider.");

        return;

    }

    // If user has no insurance
    if (provider.value === "None") {

        status.value = "No Insurance";

        status.className = "rejected";

        insuranceVerified = true;

        localStorage.setItem("insurance", JSON.stringify({

            provider: "None",
            policy: "",
            status: "No Insurance"

        }));

        alert("You can continue without insurance.");

        return;

    }

    if (policy.value.trim() === "") {

        alert("Please enter your policy number.");

        return;

    }

    // Demo Verification
    if (policy.value.length >= 8) {

        status.value = "Insurance Verified ✔";

        status.className = "accepted";

        insuranceVerified = true;

        localStorage.setItem("insurance", JSON.stringify({

            provider: provider.value,
            policy: policy.value,
            status: "Verified"

        }));

        alert("Insurance verified successfully.");

    }

    else {

        status.value = "Invalid Policy Number";

        status.className = "rejected";

        insuranceVerified = false;

        alert("Invalid Policy Number.");

    }

});

// Continue Button
document.getElementById("continueBtn").addEventListener("click", function () {

    if (!insuranceVerified) {

        alert("Please verify your insurance before continuing.");

        return;

    }

    window.location.href = "doctor.html";

});