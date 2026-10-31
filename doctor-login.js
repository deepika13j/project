// ==========================================
// SMARTCARE - DOCTOR LOGIN
// ==========================================


// ==========================================
// GET DOCTORS FROM LOCAL STORAGE
// ==========================================

let doctors = JSON.parse(
    localStorage.getItem("doctors")
);


// ==========================================
// DEFAULT DOCTORS
// ==========================================

if (!doctors || doctors.length === 0) {

    doctors = [

        {
            id: "DOC001",
            password: "1234",
            name: "Dr. Anitha Rao",
            hospital: "GreenCare Sub Centre",
            specialization: "General Physician",
            phone: "9876543210"
        },

        {
            id: "DOC002",
            password: "1234",
            name: "Dr. Karthik Menon",
            hospital: "GreenCare Sub Centre",
            specialization: "Cardiologist",
            phone: "9876543211"
        },

        {
            id: "DOC003",
            password: "1234",
            name: "Dr. Priya Nair",
            hospital: "LifeSpring Primary Health Centre",
            specialization: "General Medicine",
            phone: "9876543212"
        },

        {
            id: "DOC004",
            password: "1234",
            name: "Dr. Vikram Rao",
            hospital: "MediNova Super Specialty Hospital",
            specialization: "Cardiologist",
            phone: "9876543213"
        }

    ];


    localStorage.setItem(
        "doctors",
        JSON.stringify(doctors)
    );
}


// ==========================================
// DOCTOR LOGIN
// ==========================================

const doctorLoginForm =
    document.getElementById("doctorLoginForm");


doctorLoginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const doctorId =
            document
                .getElementById("doctorId")
                .value
                .trim();


        const password =
            document
                .getElementById("password")
                .value
                .trim();


        const loginMessage =
            document.getElementById("loginMessage");


        // Find doctor

        const doctor =
            doctors.find(function (item) {

                return (
                    item.id.toLowerCase() ===
                    doctorId.toLowerCase() &&

                    item.password === password
                );

            });


        // ==================================
        // LOGIN SUCCESS
        // ==================================

        if (doctor) {

            // Save logged-in doctor

            localStorage.setItem(
                "loggedInDoctor",
                JSON.stringify(doctor)
            );


            loginMessage.style.color =
                "#16a34a";


            loginMessage.textContent =
                "Login successful!";


            // Go to doctor dashboard

            setTimeout(function () {

                window.location.href =
                    "doctor-dashboard.html";

            }, 700);

        }


        // ==================================
        // LOGIN FAILED
        // ==================================

        else {

            loginMessage.style.color =
                "#dc2626";


            loginMessage.textContent =
                "Invalid Doctor ID or Password.";

        }

    }
);


// ==========================================
// OPEN ADD DOCTOR FORM
// ==========================================

function openDoctorForm() {

    const form =
        document.getElementById("doctorForm");


    form.style.display = "flex";


    // Prevent background scrolling

    document.body.style.overflow =
        "hidden";

}


// ==========================================
// CLOSE ADD DOCTOR FORM
// ==========================================

function closeDoctorForm() {

    const form =
        document.getElementById("doctorForm");


    form.style.display = "none";


    // Allow background scrolling

    document.body.style.overflow =
        "auto";

}


// ==========================================
// CLOSE WHEN CLICKING OUTSIDE
// ==========================================

document
    .getElementById("doctorForm")
    .addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                this
            ) {

                closeDoctorForm();

            }

        }
    );


// ==========================================
// ADD NEW DOCTOR
// ==========================================

const addDoctorForm =
    document.getElementById("addDoctorForm");


addDoctorForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        // Get values

        const name =
            document
                .getElementById("newDoctorName")
                .value
                .trim();


        const id =
            document
                .getElementById("newDoctorId")
                .value
                .trim();


        const specialization =
            document
                .getElementById(
                    "newDoctorSpecialization"
                )
                .value;


        const hospital =
            document
                .getElementById("newDoctorHospital")
                .value
                .trim();


        const phone =
            document
                .getElementById("newDoctorPhone")
                .value
                .trim();


        const password =
            document
                .getElementById("newDoctorPassword")
                .value
                .trim();


        const message =
            document.getElementById(
                "doctorAddMessage"
            );


        // ==================================
        // CHECK DOCTOR ID
        // ==================================

        const existingDoctor =
            doctors.find(function (doctor) {

                return (
                    doctor.id.toLowerCase() ===
                    id.toLowerCase()
                );

            });


        if (existingDoctor) {

            message.style.color =
                "#dc2626";


            message.textContent =
                "Doctor ID already exists.";


            return;

        }


        // ==================================
        // CREATE NEW DOCTOR
        // ==================================

        const newDoctor = {

            id: id,

            password: password,

            name: name,

            hospital: hospital,

            specialization:
                specialization,

            phone: phone

        };


        // ==================================
        // ADD TO ARRAY
        // ==================================

        doctors.push(newDoctor);


        // ==================================
        // SAVE TO LOCAL STORAGE
        // ==================================

        localStorage.setItem(
            "doctors",
            JSON.stringify(doctors)
        );


        // ==================================
        // SUCCESS MESSAGE
        // ==================================

        message.style.color =
            "#16a34a";


        message.textContent =
            "Doctor added successfully!";


        // ==================================
        // CLEAR FORM
        // ==================================

        addDoctorForm.reset();


        // ==================================
        // CLOSE POPUP
        // ==================================

        setTimeout(function () {

            closeDoctorForm();

            message.textContent = "";

        }, 1200);

    }
);