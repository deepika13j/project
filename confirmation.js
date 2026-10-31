// =====================================
// SMARTCARE APPOINTMENT CONFIRMATION
// =====================================

// Get Booking Data
const booking = JSON.parse(localStorage.getItem("booking"));

// Check if booking exists
if (!booking) {

    alert("No appointment found.");

    window.location.href = "booking.html";

}

// Display Booking Details

document.getElementById("appointmentId").textContent =
booking.appointmentId;

document.getElementById("hospital").textContent =
booking.hospital;

document.getElementById("doctor").textContent =
booking.doctor;

document.getElementById("department").textContent =
booking.department;

document.getElementById("date").textContent =
booking.appointmentDate;

document.getElementById("time").textContent =
booking.appointmentTime;

document.getElementById("payment").textContent =
booking.paymentMethod;

document.getElementById("insurance").textContent =
booking.insurance;

document.getElementById("remarks").textContent =
booking.remarks === "" ? "None" : booking.remarks;


// ===============================
// Save Appointment History
// ===============================

let appointments =
JSON.parse(localStorage.getItem("appointments")) || [];

// Avoid duplicate entry
const exists = appointments.some(function(item){

    return item.appointmentId === booking.appointmentId;

});

if(!exists){

    appointments.push(booking);

    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );

}
// ==========================================
// LOAD PATIENT DETAILS
// ==========================================

const patient = JSON.parse(
    localStorage.getItem("loggedInPatient")
);


if (patient) {

    document.getElementById("patientName").textContent =
        patient.name || "-";

    document.getElementById("patientEmail").textContent =
        patient.email || "-";

    document.getElementById("patientMobile").textContent =
        patient.mobile || "-";

}
else {

    alert("Patient details not found.");

    window.location.href = "login.html";

}


// ===============================
// Download Receipt
// ===============================

document.getElementById("downloadBtn")
.addEventListener("click", function(){

    window.print();

});


// ===============================
// Back to Home
// ===============================

document.getElementById("homeBtn")
.addEventListener("click", function(){

    if(confirm("Return to Home Page?")){

        window.location.href="index.html";

    }

});