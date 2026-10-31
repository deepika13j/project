
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const { promisify } = require("util");
require("dotenv").config();

const pool = require("./db");
const scrypt = promisify(crypto.scrypt);

const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// HOME ROUTE
app.get("/", (req, res) => {
    res.json({
        message: "SmartCare backend is running successfully!"
    });
});

// DATABASE CONNECTION CHECK
app.get("/api/health", async (req, res) => {
    try {
        await pool.query("SELECT 1");

        res.json({
            status: "ok",
            message: "Backend is working",
            database: "connected"
        });
    } catch (error) {
        console.error("Database error:", error.message);

        res.status(500).json({
            status: "error",
            database: "disconnected"
        });
    }
});

// PATIENT REGISTRATION
app.post("/api/patients/register", async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            phone,
            age,
            gender
        } = req.body;

        if (!name || !email || !password || !phone || !age || !gender) {
            return res.status(400).json({
                message: "Please fill in all fields."
            });
        }

        const cleanName = String(name).trim();
        const cleanEmail = String(email).trim().toLowerCase();
        const cleanPhone = String(phone).trim();
        const cleanGender = String(gender).trim();
        const patientAge = Number(age);

        if (cleanName.length > 100) {
            return res.status(400).json({
                message: "Name is too long."
            });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
            return res.status(400).json({
                message: "Please enter a valid email address."
            });
        }

        if (String(password).length < 8) {
            return res.status(400).json({
                message: "Password must contain at least 8 characters."
            });
        }

        if (!/^[0-9]{10}$/.test(cleanPhone)) {
            return res.status(400).json({
                message: "Enter a valid 10-digit mobile number."
            });
        }

        if (!Number.isInteger(patientAge) || patientAge < 1 || patientAge > 120) {
            return res.status(400).json({
                message: "Enter a valid age."
            });
        }

        if (!["Male", "Female", "Other"].includes(cleanGender)) {
            return res.status(400).json({
                message: "Please select a valid gender."
            });
        }

        const [existing] = await pool.execute(
            "SELECT id FROM patients WHERE email = ? OR phone = ?",
            [cleanEmail, cleanPhone]
        );

        if (existing.length > 0) {
            return res.status(409).json({
                message: "Email or mobile number is already registered."
            });
        }

        const salt = crypto.randomBytes(16).toString("hex");

        const derivedKey = await scrypt(
            String(password),
            salt,
            64
        );

        const passwordHash = salt + ":" + derivedKey.toString("hex");

        const [result] = await pool.execute(
            `INSERT INTO patients
            (name, email, password, phone, age, gender)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                cleanName,
                cleanEmail,
                passwordHash,
                cleanPhone,
                patientAge,
                cleanGender
            ]
        );

        res.status(201).json({
            message: "Patient registered successfully!",
            patient: {
                id: result.insertId,
                name: cleanName,
                email: cleanEmail,
                phone: cleanPhone,
                age: patientAge,
                gender: cleanGender
            }
        });

    } catch (error) {
        console.error("Registration error:", error.message);

        res.status(500).json({
            message: "Registration failed due to a server error."
        });
    }
});

// PATIENT LOGIN
app.post("/api/patients/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter email and password."
            });
        }

        const cleanEmail = String(email).trim().toLowerCase();

        const [rows] = await pool.execute(
            `SELECT id, name, email, password, phone, age, gender
             FROM patients
             WHERE email = ?`,
            [cleanEmail]
        );

        if (rows.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const patient = rows[0];
        const [salt, storedHash] = patient.password.split(":");

        if (!salt || !storedHash) {
            return res.status(500).json({
                message: "Stored password format is invalid."
            });
        }

        const enteredHash = await scrypt(
            String(password),
            salt,
            64
        );

        const storedBuffer = Buffer.from(storedHash, "hex");

        if (
            storedBuffer.length !== enteredHash.length ||
            !crypto.timingSafeEqual(storedBuffer, enteredHash)
        ) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        delete patient.password;

        res.json({
            message: "Login successful!",
            patient
        });

    } catch (error) {
        console.error("Login error:", error.message);

        res.status(500).json({
            message: "Login failed due to a server error."
        });
    }
});

// BOOK APPOINTMENT
app.post("/api/appointments/book", async (req, res) => {
    let connection;

    try {
        const {
            patientId,
            hospital,
            doctorId,
            doctorName,
            department,
            appointmentDate,
            appointmentTime,
            insurance,
            paymentMethod,
            remarks
        } = req.body;

        if (
            !patientId ||
            !hospital ||
            !doctorId ||
            !doctorName ||
            !department ||
            !appointmentDate ||
            !appointmentTime ||
            !paymentMethod
        ) {
            return res.status(400).json({
                message: "Please provide all required appointment details."
            });
        }

        const numericPatientId = Number(patientId);

        if (!Number.isInteger(numericPatientId) || numericPatientId < 1) {
            return res.status(400).json({
                message: "Invalid patient ID. Please log in again."
            });
        }

        // Convert doctor101 into database ID 101
        const doctorMatch = String(doctorId).match(/^doctor(\d+)$/i);

        if (!doctorMatch) {
            return res.status(400).json({
                message: "Invalid doctor selection."
            });
        }

        const numericDoctorId = Number(doctorMatch[1]);

        if (!Number.isSafeInteger(numericDoctorId)) {
            return res.status(400).json({
                message: "Invalid doctor ID."
            });
        }

        // VALIDATE APPOINTMENT DATE
        const dateMatch = String(appointmentDate).match(
            /^(\d{4})-(\d{2})-(\d{2})$/
        );

        if (!dateMatch) {
            return res.status(400).json({
                message: "Invalid appointment date."
            });
        }

        const year = Number(dateMatch[1]);
        const month = Number(dateMatch[2]);
        const day = Number(dateMatch[3]);

        // Use local date to avoid timezone conversion issues
        const date = new Date(year, month - 1, day);

        if (
            date.getFullYear() !== year ||
            date.getMonth() !== month - 1 ||
            date.getDate() !== day
        ) {
            return res.status(400).json({
                message: "Invalid appointment date."
            });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (date < today) {
            return res.status(400).json({
                message: "Please select today or a future date."
            });
        }

        // CONVERT 12-HOUR TIME TO MYSQL TIME
        const timeMatch = String(appointmentTime).match(
            /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i
        );

        if (!timeMatch) {
            return res.status(400).json({
                message: "Invalid appointment time."
            });
        }

        let hours = Number(timeMatch[1]);
        const minutes = Number(timeMatch[2]);
        const period = timeMatch[3].toUpperCase();

        if (
            hours < 1 ||
            hours > 12 ||
            minutes < 0 ||
            minutes > 59
        ) {
            return res.status(400).json({
                message: "Invalid appointment time."
            });
        }

        if (period === "PM" && hours !== 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;

        const mysqlTime =
            String(hours).padStart(2, "0") +
            ":" +
            String(minutes).padStart(2, "0") +
            ":00";

        connection = await pool.getConnection();
        await connection.beginTransaction();

        // CHECK PATIENT
        const [patients] = await connection.execute(
            "SELECT id FROM patients WHERE id = ?",
            [numericPatientId]
        );

        if (patients.length === 0) {
            await connection.rollback();

            return res.status(404).json({
                message: "Patient not found. Please log in again."
            });
        }

        // ADD OR UPDATE SELECTED DOCTOR
        const doctorEmail =
            `doctor${numericDoctorId}@smartcare.local`;

        await connection.execute(
            `INSERT INTO doctors
            (id, name, email, specialization)
            VALUES (?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            name = VALUES(name),
            specialization = VALUES(specialization)`,
            [
                numericDoctorId,
                String(doctorName),
                doctorEmail,
                String(department)
            ]
        );

        // SAVE APPOINTMENT
        const [result] = await connection.execute(
            `INSERT INTO appointments
            (
                patient_id,
                doctor_id,
                appointment_date,
                appointment_time,
                hospital_name,
                department,
                insurance_status,
                payment_method,
                remarks
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                numericPatientId,
                numericDoctorId,
                appointmentDate,
                mysqlTime,
                String(hospital),
                String(department),
                String(insurance || "Not Available"),
                String(paymentMethod),
                remarks ? String(remarks) : null
            ]
        );

        await connection.commit();

        res.status(201).json({
            message: "Appointment booked successfully!",
            appointmentId: result.insertId
        });

    } catch (error) {
        if (connection) {
            await connection.rollback();
        }

        console.error("Appointment booking error:", error.message);

        res.status(500).json({
            message: "Could not book appointment."
        });

    } finally {
        if (connection) {
            connection.release();
        }
    }
});

// VIEW PATIENT APPOINTMENTS
app.get("/api/appointments/:patientId", async (req, res) => {
    try {
        const patientId = Number(req.params.patientId);

        if (!Number.isInteger(patientId) || patientId < 1) {
            return res.status(400).json({
                message: "Invalid patient ID."
            });
        }

        const [appointments] = await pool.execute(
            `SELECT
                a.id,
                a.appointment_date,
                a.appointment_time,
                a.hospital_name,
                a.department,
                a.insurance_status,
                a.payment_method,
                a.remarks,
                a.status,
                d.name AS doctor_name,
                d.specialization
             FROM appointments a
             INNER JOIN doctors d ON a.doctor_id = d.id
             WHERE a.patient_id = ?
             ORDER BY a.appointment_date DESC, a.appointment_time DESC`,
            [patientId]
        );

        res.json({
            appointments
        });

    } catch (error) {
        console.error("Fetch appointments error:", error.message);

        res.status(500).json({
            message: "Could not retrieve appointments."
        });
    }
});

// START SERVER
app.listen(PORT, () => {
    console.log(
        `SmartCare backend running at http://localhost:${PORT}`
    );
});
