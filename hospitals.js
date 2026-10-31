// =========================================
// SMARTCARE HOSPITAL DATABASE
// =========================================

const hospitals = [

    // ===============================
    // HOSPITAL 1
    // ===============================

    {
        id: "hospital1",

        name: "Apollo Care Hospital",

        category: "Multi-Speciality",

        location: "Chennai",

        doctors: [

            {
                id: "doctor101",
                name: "Dr. Priya Sharma",
                speciality: "Cardiologist"
            },

            {
                id: "doctor102",
                name: "Dr. Arun Kumar",
                speciality: "Neurologist"
            },

            {
                id: "doctor103",
                name: "Dr. Meena Ravi",
                speciality: "General Physician"
            }

        ]
    },


    // ===============================
    // HOSPITAL 2
    // ===============================

    {
        id: "hospital2",

        name: "City Health Hospital",

        category: "General Healthcare",

        location: "Chennai",

        doctors: [

            {
                id: "doctor201",
                name: "Dr. Ravi Kumar",
                speciality: "Cardiologist"
            },

            {
                id: "doctor202",
                name: "Dr. Divya Anand",
                speciality: "Dermatologist"
            },

            {
                id: "doctor203",
                name: "Dr. Karthik Raj",
                speciality: "Orthopedic"
            }

        ]
    },


    // ===============================
    // HOSPITAL 3
    // ===============================

    {
        id: "hospital3",

        name: "LifeLine Medical Center",

        category: "Speciality Care",

        location: "Chennai",

        doctors: [

            {
                id: "doctor301",
                name: "Dr. Anitha Kumar",
                speciality: "Pediatrician"
            },

            {
                id: "doctor302",
                name: "Dr. Suresh Babu",
                speciality: "Neurologist"
            },

            {
                id: "doctor303",
                name: "Dr. Kavya Priya",
                speciality: "General Physician"
            }

        ]
    },


    // ===============================
    // HOSPITAL 4
    // ===============================

    {
        id: "hospital4",

        name: "Green Valley Hospital",

        category: "Speciality Care",

        location: "Chennai",

        doctors: [

            {
                id: "doctor401",
                name: "Dr. Rahul Menon",
                speciality: "Orthopedic"
            },

            {
                id: "doctor402",
                name: "Dr. Nisha Devi",
                speciality: "Gynecologist"
            },

            {
                id: "doctor403",
                name: "Dr. Vivek Kumar",
                speciality: "Cardiologist"
            }

        ]
    },


    // ===============================
    // HOSPITAL 5
    // ===============================

    {
        id: "hospital5",

        name: "Sunrise Medical Hospital",

        category: "Multi-Speciality",

        location: "Chennai",

        doctors: [

            {
                id: "doctor501",
                name: "Dr. Sneha Rao",
                speciality: "Dermatologist"
            },

            {
                id: "doctor502",
                name: "Dr. Ajay Kumar",
                speciality: "ENT Specialist"
            },

            {
                id: "doctor503",
                name: "Dr. Lakshmi Priya",
                speciality: "General Physician"
            }

        ]
    },


    // ===============================
    // HOSPITAL 6
    // ===============================

    {
        id: "hospital6",

        name: "Royal Care Hospital",

        category: "Advanced Care",

        location: "Chennai",

        doctors: [

            {
                id: "doctor601",
                name: "Dr. Vikram Singh",
                speciality: "Neurologist"
            },

            {
                id: "doctor602",
                name: "Dr. Aishwarya Menon",
                speciality: "Pediatrician"
            },

            {
                id: "doctor603",
                name: "Dr. Sanjay Rao",
                speciality: "Cardiologist"
            }

        ]
    }

];


// =========================================
// GET HOSPITAL CONTAINER
// =========================================

const hospitalContainer =
    document.getElementById(
        "hospitalContainer"
    );


// =========================================
// DISPLAY HOSPITALS
// =========================================

if (hospitalContainer) {

    hospitalContainer.innerHTML = "";


    hospitals.forEach(function (hospital) {

        const card =
            document.createElement("div");


        card.className =
            "hospital-card";


        card.innerHTML = `

            <div>

                <div class="hospital-icon">
                    🏥
                </div>

                <h2>
                    ${hospital.name}
                </h2>

                <p>
                    <strong>Category:</strong>
                    ${hospital.category}
                </p>

                <p>
                    <strong>Location:</strong>
                    ${hospital.location}
                </p>

                <p>
                    <strong>Doctors:</strong>
                    ${hospital.doctors.length}
                </p>

            </div>


            <button
                onclick="
                    selectHospital('${hospital.id}')
                ">

                Select Hospital

            </button>

        `;


        hospitalContainer.appendChild(card);

    });

}


// =========================================
// SELECT HOSPITAL
// =========================================

function selectHospital(hospitalId) {

    const hospital =
        hospitals.find(function (item) {

            return item.id === hospitalId;

        });


    if (!hospital) {

        alert("Hospital not found.");

        return;
    }


    // Save selected hospital

    localStorage.setItem(
        "selectedHospital",
        JSON.stringify(hospital)
    );


    // Remove old doctor selection

    localStorage.removeItem(
        "selectedDoctor"
    );


    // Continue to insurance

    window.location.href =
        "insurance.html";

}