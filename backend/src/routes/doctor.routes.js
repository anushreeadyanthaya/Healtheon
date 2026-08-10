import express from "express";

import {
    createDoctorRecord,
    getDoctors,
    getDoctor
} from "../controllers/doctor.controller.js";


const router = express.Router();


// CREATE DOCTOR
router.post("/", createDoctorRecord);


// GET ALL DOCTORS
router.get("/", getDoctors);


// GET SINGLE DOCTOR
router.get("/:id", getDoctor);


export default router;