import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import medicalRecordRoutes from "./routes/medicalRecord.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";


dotenv.config();

const app = express();


// Middlewares

app.use(cors());

app.use(express.json());


// Routes

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/medical-records", medicalRecordRoutes);

app.use("/api/appointments", appointmentRoutes);

app.use("/api/doctors", doctorRoutes);


// Test Route

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Healtheon API"
    });
});


// Server

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});