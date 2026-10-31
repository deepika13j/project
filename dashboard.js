
// ======================================
// SMARTCARE DASHBOARD
// ======================================

// Get logged-in patient
const patient = JSON.parse(localStorage.getItem("loggedInPatient"));

if (!patient) {
    alert("Please login first.");
    window.location.href = "login.html";
}

// Display patient name
const patientName = document.getElementById("patientName");
const welcomeTitle = document.querySelector(".welcome h1");

if (patient && patientName) {
    patientName.textContent = patient.name;
}

// Greeting based on time
const hour = new Date().getHours();

let greeting = "Good Evening";

if (hour < 12) {
    greeting = "Good Morning";
} else if (hour < 17) {
    greeting = "Good Afternoon";
}

if (welcomeTitle && patient) {
    welcomeTitle.textContent =
        `${greeting}, ${patient.name} ${hour < 12 ? "☀️" : hour < 17 ? "🌤️" : "🌙"}`;
}

// Logout
document.getElementById("logoutBtn").addEventListener("click", function () {

    if (confirm("Are you sure you want to logout?")) {

        localStorage.removeItem("loggedInPatient");

        alert("Logged out successfully!");

        window.location.href = "index.html";
    }
});

// ======================================
// LOAD APPOINTMENTS FROM MYSQL
// ======================================

async function loadAppointments() {

    try {

        const response = await fetch(
            `http://localhost:3000/api/appointments/${patient.id}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Unable to load appointments.");
        }

        const appointments = data.appointments || [];

        // Upcoming appointment notification
        const welcomeSection = document.querySelector(".welcome");

        // Remove previous notification
        const oldNotification = document.querySelector(".notification");

        if (oldNotification) {
            oldNotification.remove();
        }

        if (appointments.length > 0) {

            const latestAppointment = appointments[appointments.length - 1];

            const notification = document.createElement("div");
            notification.className = "notification";

            const details = [
                ["Hospital", latestAppointment.hospital_name],
                ["Doctor", latestAppointment.doctor_name],
                ["Date", new Date(latestAppointment.appointment_date).toLocaleDateString("en-IN")],
                ["Time", latestAppointment.appointment_time]
            ];

            const heading = document.createElement("h3");
            heading.textContent = "🔔 Upcoming Appointment";
            notification.appendChild(heading);

            details.forEach(([label, value]) => {
                const p = document.createElement("p");
                p.textContent = `${label}: ${value || "Not available"}`;
                notification.appendChild(p);
            });

            welcomeSection.appendChild(notification);
        }

        // Dashboard statistics
        const oldStats = document.querySelector(".stats");

        if (oldStats) {
            oldStats.remove();
        }

        const stats = document.createElement("div");
        stats.className = "stats";

        stats.innerHTML = `
            <div class="stat-card">
                <h2>${appointments.length}</h2>
                <p>Total Appointments</p>
            </div>

            <div class="stat-card">
                <h2>${appointments.length > 0 ? "Active" : "None"}</h2>
                <p>Booking Status</p>
            </div>

            <div class="stat-card">
                <h2>${new Date().getFullYear()}</h2>
                <p>Current Year</p>
            </div>
        `;

        document.querySelector(".dashboard").before(stats);

    } catch (error) {

        console.error("Dashboard error:", error);
    }
}

if (patient) {
    loadAppointments();
}
