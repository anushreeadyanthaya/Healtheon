import express from "express";

import { protect } from "../middlewares/auth.middlewares.js";

import {
    createRecord,
    getMyRecords,
    getRecordById
} from "../controllers/medicalRecord.controller.js";


const router = express.Router();


// =====================================================
// CREATE MEDICAL RECORD
// =====================================================
router.post("/", protect, createRecord);


// =====================================================
// GET ALL MEDICAL RECORDS OF LOGGED-IN PATIENT
// =====================================================
router.get("/", protect, getMyRecords);


// =====================================================
// GET SINGLE MEDICAL RECORD
// =====================================================
router.get("/:id", protect, getRecordById);


export default router;