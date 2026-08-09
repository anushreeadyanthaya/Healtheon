import {
    createMedicalRecord,
    getMedicalRecordsByPatient,
    getMedicalRecordById
} from "../models/medicalRecord.model.js";


// CREATE MEDICAL RECORD
export const createRecord = async (req, res) => {
    try {
        const {
            diagnosis,
            notes,
            prescription,
            record_date
        } = req.body;

        const patient_id = req.user.id;


        // Validation
        if (!diagnosis) {
            return res.status(400).json({
                success: false,
                message: "Diagnosis is required"
            });
        }


        // Create record
        const record = await createMedicalRecord({
            patient_id,
            diagnosis,
            notes,
            prescription,
            record_date
        });


        return res.status(201).json({
            success: true,
            message: "Medical record created successfully",
            record
        });

    } catch (error) {
        console.error("Create medical record error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


// GET ALL MEDICAL RECORDS OF LOGGED-IN PATIENT
export const getMyRecords = async (req, res) => {
    try {
        const patientId = req.user.id;

        const records = await getMedicalRecordsByPatient(patientId);

        return res.status(200).json({
            success: true,
            message: "Medical records fetched successfully",
            records
        });

    } catch (error) {
        console.error("Get medical records error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


// GET SINGLE MEDICAL RECORD
export const getRecordById = async (req, res) => {
    try {
        const { id } = req.params;
        const patientId = req.user.id;

        const record = await getMedicalRecordById(id, patientId);


        if (!record) {
            return res.status(404).json({
                success: false,
                message: "Medical record not found"
            });
        }


        return res.status(200).json({
            success: true,
            message: "Medical record fetched successfully",
            record
        });

    } catch (error) {
        console.error("Get medical record error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};