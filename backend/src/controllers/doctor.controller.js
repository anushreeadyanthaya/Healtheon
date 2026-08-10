import {
    createDoctor,
    getAllDoctors,
    getDoctorById
} from "../models/doctor.model.js";


// CREATE DOCTOR
export const createDoctorRecord = async (req, res) => {
    try {
        const {
            fullName,
            email,
            specialization,
            phone,
            experienceYears
        } = req.body;


        // Validation
        if (!fullName || !email || !specialization) {
            return res.status(400).json({
                success: false,
                message: "Full name, email and specialization are required"
            });
        }


        // Create doctor
        const doctor = await createDoctor({
            fullName,
            email,
            specialization,
            phone,
            experienceYears: experienceYears || 0
        });


        return res.status(201).json({
            success: true,
            message: "Doctor created successfully",
            doctor
        });

    } catch (error) {
        console.error("Create doctor error:", error);


        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


// GET ALL DOCTORS
export const getDoctors = async (req, res) => {
    try {
        const doctors = await getAllDoctors();


        return res.status(200).json({
            success: true,
            message: "Doctors fetched successfully",
            doctors
        });

    } catch (error) {
        console.error("Get doctors error:", error);


        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


// GET SINGLE DOCTOR
export const getDoctor = async (req, res) => {
    try {
        const { id } = req.params;


        const doctor = await getDoctorById(id);


        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }


        return res.status(200).json({
            success: true,
            message: "Doctor fetched successfully",
            doctor
        });

    } catch (error) {
        console.error("Get doctor error:", error);


        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};