// SMARTCARE APPOINTMENT BOOKING

const hospital = JSON.parse(localStorage.getItem("selectedHospital"));
const doctor = JSON.parse(localStorage.getItem("selectedDoctor"));
const recommendation = JSON.parse(localStorage.getItem("symptomData"));
const insurance = JSON.parse(localStorage.getItem("insurance"));
const patient = JSON.parse(localStorage.getItem("loggedInPatient"));

if (!hospital || !doctor) {
    alert("Please select a hospital and doctor first.");
    window.location.href = "hospitals.html";
}

if (!patient) {
    alert("Please login before booking an appointment.");
    window.location.href = "login.html";
}

if (hospital && doctor && patient) {

    const department =
        recommendation?.department || doctor.speciality || "General";

    document.getElementById("hospitalName").textContent = hospital.name;
    document.getElementById("doctorName").textContent = doctor.name;
    document.getElementById("department").textContent = department;

    const dateInput = document.getElementById("appointmentDate");

    // Set today's date as the minimum date
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    dateInput.min = `${year}-${month}-${day}`;

    document.getElementById("confirmBtn").addEventListener("click", async function () {

        const appointmentDate = dateInput.value;
        const appointmentTime =
            document.getElementById("appointmentTime").value;

        const paymentMethod =
            document.getElementById("paymentMethod").value;

        const remarks =
            document.getElementById("remarks").value;

        if (!appointmentDate || !appointmentTime || !paymentMethod) {
            alert("Please fill all required fields.");
            return;
        }

        const button = document.getElementById("confirmBtn");
        button.disabled = true;
        button.textContent = "Booking...";

        try {
            const response = await fetch(
                "http://localhost:3000/api/appointments/book",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        patientId: patient.id,
                        hospital: hospital.name,
                        doctorId: doctor.id,
                        doctorName: doctor.name,
                        department: department,
                        appointmentDate: appointmentDate,
                        appointmentTime: appointmentTime,
                        insurance: insurance
                            ? insurance.status
                            : "Not Available",
                        paymentMethod: paymentMethod,
                        remarks: remarks
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Booking failed.");
            }

            const booking = {
                appointmentId: "APT" + data.appointmentId,
                hospital: hospital.name,
                doctor: doctor.name,
                department: department,
                insurance: insurance
                    ? insurance.status
                    : "Not Available",
                appointmentDate: appointmentDate,
                appointmentTime: appointmentTime,
                paymentMethod: paymentMethod,
                remarks: remarks
            };

            localStorage.setItem("booking", JSON.stringify(booking));

            alert("Appointment booked successfully!");
            window.location.href = "confirmation.html";

        } catch (error) {
            alert(error.message || "Unable to book. Please try again.");
        } finally {
            button.disabled = false;
            button.textContent = "Confirm Booking";
        }
    });
}