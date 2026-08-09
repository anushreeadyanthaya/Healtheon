import express from "express";
import { protect } from "../middlewares/auth.middlewares.js";

import {
  createAppointmentRecord,
  getMyAppointments,
  getAppointment
} from "../controllers/appointment.controller.js";


const router = express.Router();


// CREATE APPOINTMENT
router.post("/", protect, createAppointmentRecord);


// GET ALL APPOINTMENTS OF LOGGED-IN PATIENT
router.get("/", protect, getMyAppointments);


// GET SINGLE APPOINTMENT
router.get("/:id", protect, getAppointment);


export default router;