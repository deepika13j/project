
const registerForm = document.getElementById("registerForm");
const message = document.getElementById("registerMessage");
const registerButton = document.getElementById("registerButton");

registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const mobile = document.getElementById("mobile").value.trim();
    const age = Number(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;

    if (!name || !email || !password || !mobile || !gender) {
        showMessage("Please fill in all fields.", false);
        return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
        showMessage("Enter a valid 10-digit mobile number.", false);
        return;
    }

    if (password.length < 8) {
        showMessage("Password must contain at least 8 characters.", false);
        return;
    }

    if (!Number.isInteger(age) || age < 1 || age > 120) {
        showMessage("Enter a valid age.", false);
        return;
    }

    registerButton.disabled = true;
    registerButton.textContent = "Creating Account...";
    showMessage("Please wait...", true);

    try {
        const response = await fetch(
            "http://localhost:3000/api/patients/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    phone: mobile,
                    age: age,
                    gender: gender
                })
            }
        );

        const responseText = await response.text();

        let data;

        try {
            data = JSON.parse(responseText);
        } catch {
            throw new Error("Server returned an invalid response: " + responseText);
        }

        if (!response.ok) {
            throw new Error(data.message || "Registration failed.");
        }

        showMessage("Registration successful!", true);

        registerForm.reset();

        setTimeout(function () {
            window.location.href = "login.html";
        }, 1500);

    } catch (error) {
        console.error("Registration error:", error);
        showMessage(error.message, false);

    } finally {
        registerButton.disabled = false;
        registerButton.textContent = "Create Patient Account";
    }
});

function showMessage(text, success) {
    message.textContent = text;
    message.style.color = success ? "green" : "red";
}
