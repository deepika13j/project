// =========================================
// SMARTCARE DOCTOR PAGE
// =========================================


// Get selected hospital from localStorage

const selectedHospital =
    JSON.parse(
        localStorage.getItem("selectedHospital")
    );


// Get HTML elements

const hospitalName =
    document.getElementById("hospitalName");

const doctorContainer =
    document.getElementById("doctorContainer");


// =========================================
// CHECK HOSPITAL
// =========================================

if (!selectedHospital) {

    alert(
        "Please select a hospital first."
    );

    window.location.href =
        "hospitals.html";

}


// =========================================
// DISPLAY HOSPITAL
// =========================================

else {

    hospitalName.textContent =
        selectedHospital.name;


    // Get doctors from selected hospital

    const doctors =
        selectedHospital.doctors;


    // =====================================
    // CHECK DOCTORS
    // =====================================

    if (
        !doctors ||
        doctors.length === 0
    ) {

        doctorContainer.innerHTML = `

            <div class="no-doctors">

                <h2>
                    No doctors available
                </h2>

                <p>
                    There are currently no doctors
                    available for this hospital.
                </p>

            </div>

        `;

    }


    // =====================================
    // DISPLAY DOCTORS
    // =====================================

    else {

        doctors.forEach(
            function (doctor) {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "doctor-card";


                card.innerHTML = `

                    <div class="doctor-icon">
                        👨‍⚕️
                    </div>


                    <h2>
                        ${doctor.name}
                    </h2>


                    <p class="specialization">
                        ${doctor.speciality}
                    </p>


                    <p class="hospital-name">
                        ${selectedHospital.name}
                    </p>


                    <button
                        onclick="
                            selectDoctor(
                                '${doctor.id}'
                            )
                        ">

                        Select Doctor

                    </button>

                `;


                doctorContainer.appendChild(
                    card
                );

            }
        );

    }

}


// =========================================
// SELECT DOCTOR
// =========================================

function selectDoctor(doctorId) {


    if (!selectedHospital) {

        alert(
            "Please select a hospital first."
        );

        return;
    }


    // Find selected doctor

    const doctor =
        selectedHospital.doctors.find(
            function (item) {

                return item.id === doctorId;

            }
        );


    if (!doctor) {

        alert(
            "Doctor not found."
        );

        return;
    }


    // Save doctor

    localStorage.setItem(
        "selectedDoctor",
        JSON.stringify(doctor)
    );


    // Save hospital again

    localStorage.setItem(
        "selectedHospital",
        JSON.stringify(selectedHospital)
    );


    // Continue to appointment page

    window.location.href =
        "booking.html";

}