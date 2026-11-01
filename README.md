# ❤️ SmartCare – Hospital Recommendation & Appointment System

## 📌 About the Project
SmartCare is a web-based hospital recommendation and appointment booking system that helps patients find suitable hospitals and doctors based on their symptoms and book appointments easily.

## ✨ Features
- Patient Registration and Login
- Symptom Checker
- Hospital Recommendation
- Insurance Verification
- Doctor Selection
- Online Appointment Booking
- Appointment Confirmation
- My Appointments Dashboard
- Patient Profile
- Emergency Assistance

## 🛠️ Technologies Used

**Frontend**
- HTML
- CSS
- JavaScript

**Backend**
- Node.js
- Express.js

**Database**
- MySQL

## 📂 Project Structure

```text
project/
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── package.json
│   └── package-lock.json
├── index.html
├── symptoms.html
├── hospitals.html
├── insurance.html
├── doctor.html
├── booking.html
├── confirmation.html
├── dashboard.html
├── myappointments.html
├── profile.html
├── emergency.html
└── README.md
```

## ⚙️ Setup and Installation

### 1. Clone the repository
```bash
git clone https://github.com/deepika13j/project.git
cd project
```

### 2. Install backend dependencies
```bash
cd backend
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `backend` folder:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=smartcare
DB_PORT=3306
PORT=3000
```

Replace `your_mysql_password` with your local MySQL password. Never upload `.env` to GitHub.

### 4. Start the backend
```bash
node server.js
```

### 5. Run the frontend

Open the project using the VS Code Live Server extension, starting with `index.html`.

## 🗄️ Database
SmartCare uses MySQL to store patient details and appointment information.

Create the database using:

```sql
CREATE DATABASE smartcare;
```

Create the required tables using the SQL setup for the project.

## 🎯 Project Objective
To simplify hospital discovery and appointment booking through a user-friendly web application.

---

*SmartCare – Making Healthcare Access Easier.*
