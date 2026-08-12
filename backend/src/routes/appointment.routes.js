import express from "express";

import {
    createAppointmentRecord,
    getMyAppointments,
    getAppointment,
    getMyDoctorAppointments,
    updateAppointmentStatusRecord
} from "../controllers/appointment.controller.js";

import {
    protect,
    authorize
} from "../middlewares/auth.middlewares.js";

const router = express.Router();

// CREATE APPOINTMENT
router.post("/", protect, createAppointmentRecord);

// GET ALL APPOINTMENTS OF LOGGED-IN PATIENT
router.get("/", protect, getMyAppointments);

// GET ALL APPOINTMENTS OF LOGGED-IN DOCTOR
router.get(
    "/doctor/my-appointments",
    protect,
    authorize("doctor"),
    getMyDoctorAppointments
);

// UPDATE APPOINTMENT STATUS
router.patch(
    "/:id/status",
    protect,
    authorize("doctor"),
    updateAppointmentStatusRecord
);

// GET SINGLE APPOINTMENT
router.get("/:id", protect, getAppointment);

export default router;