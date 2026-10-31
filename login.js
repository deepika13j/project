
// ==========================================
// SMARTCARE - PATIENT LOGIN
// ==========================================

const loginForm = document.getElementById("loginForm");
const message = document.getElementById("loginMessage");
const loginButton = document.getElementById("loginButton");

// ==========================================
// LOGIN FORM
// ==========================================

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    // Get email
    const email = document
        .getElementById("email")
        .value
        .trim()
        .toLowerCase();

    // Get password
    const password = document
        .getElementById("password")
        .value;

    // ==========================================
    // CHECK EMAIL
    // ==========================================

    if (email === "") {
        message.style.color = "#dc2626";
        message.textContent = "Please enter your email address.";
        return;
    }

    // ==========================================
    // CHECK PASSWORD
    // ==========================================

    if (password === "") {
        message.style.color = "#dc2626";
        message.textContent = "Please enter your password.";
        return;
    }

    // ==========================================
    // CONNECT TO BACKEND
    // ==========================================

    loginButton.disabled = true;
    loginButton.textContent = "Logging in...";

    message.style.color = "blue";
    message.textContent = "Please wait...";

    try {

        const response = await fetch(
            "http://localhost:3000/api/patients/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );

        const data = await response.json();

        // ==========================================
        // LOGIN SUCCESSFUL
        // ==========================================

        if (response.ok) {

            // Save patient information
            localStorage.setItem(
                "loggedInPatient",
                JSON.stringify(data.patient)
            );

            message.style.color = "#16a34a";
            message.textContent = "Login successful!";

            // Redirect to dashboard
            setTimeout(function () {
                window.location.href = "dashboard.html";
            }, 1000);

        }

        // ==========================================
        // LOGIN FAILED
        // ==========================================

        else {

            message.style.color = "#dc2626";
            message.textContent =
                data.message || "Invalid email or password.";

        }

    }

    // ==========================================
    // SERVER ERROR
    // ==========================================

    catch (error) {

        console.error("Login error:", error);

        message.style.color = "#dc2626";
        message.textContent =
            "Cannot connect to server. Please check your backend.";

    }

    // ==========================================
    // RESET BUTTON
    // ==========================================

    finally {

        loginButton.disabled = false;
        loginButton.textContent = "Login";

    }

});
