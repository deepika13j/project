
// =====================================
// SMARTCARE - MY APPOINTMENTS
// =====================================

// Get logged-in patient
const patient = JSON.parse(localStorage.getItem("loggedInPatient"));

const appointmentList = document.getElementById("appointmentList");
const homeBtn = document.getElementById("homeBtn");

// Display message
function showMessage(message) {
    appointmentList.innerHTML = `
        <div class="empty">
            <i class="fa-solid fa-calendar-xmark"></i>
            <h2>${message}</h2>
        </div>
    `;
}

// Prevent HTML injection when displaying database values
function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, function (char) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[char];
    });
}

// Format date
function formatDate(dateValue) {
    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return dateValue;
    }

    return date.toLocaleDateString("en-IN");
}

// Format time
function formatTime(timeValue) {
    if (!timeValue) return "";

    const parts = String(timeValue).split(":");
    let hours = Number(parts[0]);
    const minutes = parts[1];

    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    return `${String(hours).padStart(2, "0")}:${minutes} ${period}`;
}

// Load appointments from MySQL
async function loadAppointments() {

    if (!patient || !patient.id) {
        alert("Please login to view your appointments.");
        window.location.href = "login.html";
        return;
    }

    try {

        appointmentList.innerHTML = `
            <p>Loading your appointments...</p>
        `;

        const response = await fetch(
            `http://localhost:3000/api/appointments/${patient.id}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Unable to load appointments.");
        }

        const appointments = data.appointments || [];

        if (appointments.length === 0) {
            showMessage("No Appointments Found");
            return;
        }

        appointmentList.innerHTML = "";

        appointments.forEach(function (appointment) {

            const card = document.createElement("div");

            card.className = "appointment-card";

            const appointmentId =
                "APT" + appointment.id;

            card.innerHTML = `
                <h2>${escapeHTML(appointment.hospital_name)}</h2>

                <p>
                    <i class="fa-solid fa-hashtag"></i>
                    <strong>Appointment ID:</strong>
                    ${escapeHTML(appointmentId)}
                </p>

                <p>
                    <i class="fa-solid fa-user-doctor"></i>
                    <strong>Doctor:</strong>
                    ${escapeHTML(appointment.doctor_name)}
                </p>

                <p>
                    <i class="fa-solid fa-stethoscope"></i>
                    <strong>Department:</strong>
                    ${escapeHTML(appointment.department)}
                </p>

                <p>
                    <i class="fa-solid fa-calendar-days"></i>
                    <strong>Date:</strong>
                    ${escapeHTML(formatDate(appointment.appointment_date))}
                </p>

                <p>
                    <i class="fa-solid fa-clock"></i>
                    <strong>Time:</strong>
                    ${escapeHTML(formatTime(appointment.appointment_time))}
                </p>

                <p>
                    <i class="fa-solid fa-credit-card"></i>
                    <strong>Payment:</strong>
                    ${escapeHTML(appointment.payment_method)}
                </p>

                <p>
                    <i class="fa-solid fa-shield-heart"></i>
                    <strong>Insurance:</strong>
                    ${escapeHTML(appointment.insurance_status)}
                </p>

                <span class="status">
                    ${escapeHTML(appointment.status || "Pending")}
                </span>

                <div class="buttons">
                    <button class="download-btn">
                        <i class="fa-solid fa-download"></i>
                        Download
                    </button>
                </div>
            `;

            appointmentList.appendChild(card);

            // Download / Print appointment details
            card.querySelector(".download-btn")
                .addEventListener("click", function () {
                    window.print();
                });

        });

    } catch (error) {

        console.error("Appointment loading error:", error);

        showMessage("Unable to load appointments. Please try again.");

    }
}

// Back to Home
if (homeBtn) {
    homeBtn.addEventListener("click", function () {
        window.location.href = "index.html";
    });
}

// Start
loadAppointments();
