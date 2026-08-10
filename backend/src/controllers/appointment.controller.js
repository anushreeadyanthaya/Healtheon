import {
    createAppointment,
    getAppointmentsByPatient,
    getAppointmentById,
    getAppointmentsByDoctor,
    updateAppointmentStatus
} from "../models/appointment.model.js";

import pool from "../config/db.js";


// CREATE APPOINTMENT
export const createAppointmentRecord = async (req, res) => {
    try {
        const {
            doctorId,
            doctorName,
            appointmentDate,
            reason,
            status
        } = req.body;


        const patientId = req.user.id;


        // Validation
        if (!doctorId || !appointmentDate) {
            return res.status(400).json({
                success: false,
                message: "Doctor ID and appointment date are required"
            });
        }


        // Create appointment
        const appointment = await createAppointment({
            patientId,
            doctorId,
            doctorName,
            appointmentDate,
            reason,
            status: status || "scheduled"
        });


        return res.status(201).json({
            success: true,
            message: "Appointment created successfully",
            appointment
        });

    } catch (error) {
        console.error("Create appointment error:", error);


        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


// GET ALL APPOINTMENTS OF LOGGED-IN PATIENT
export const getMyAppointments = async (req, res) => {
    try {
        const patientId = req.user.id;


        const appointments = await getAppointmentsByPatient(patientId);


        return res.status(200).json({
            success: true,
            message: "Appointments fetched successfully",
            appointments
        });

    } catch (error) {
        console.error("Get appointments error:", error);


        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


// GET SINGLE APPOINTMENT
export const getAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const patientId = req.user.id;


        const appointment = await getAppointmentById(id, patientId);


        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }


        return res.status(200).json({
            success: true,
            message: "Appointment fetched successfully",
            appointment
        });

    } catch (error) {
        console.error("Get appointment error:", error);


        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


// GET ALL APPOINTMENTS OF LOGGED-IN DOCTOR
export const getMyDoctorAppointments = async (req, res) => {
    try {

        // Get doctor's email from logged-in user
        const doctorUser = await pool.query(
            "SELECT email FROM users WHERE id = $1",
            [req.user.id]
        );


        if (doctorUser.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Doctor user not found"
            });
        }


        const doctorEmail = doctorUser.rows[0].email;


        // Find actual doctor record
        const doctor = await pool.query(
            "SELECT id FROM doctors WHERE email = $1",
            [doctorEmail]
        );


        if (doctor.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Doctor profile not found"
            });
        }


        const doctorId = doctor.rows[0].id;


        // Get appointments using doctors.id
        const appointments = await getAppointmentsByDoctor(doctorId);


        return res.status(200).json({
            success: true,
            message: "Doctor appointments fetched successfully",
            appointments
        });

    } catch (error) {
        console.error("Get doctor appointments error:", error);


        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


// UPDATE APPOINTMENT STATUS
export const updateAppointmentStatusRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;


        // Validation
        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Status is required"
            });
        }


        // Get doctor's email from logged-in user
        const doctorUser = await pool.query(
            "SELECT email FROM users WHERE id = $1",
            [req.user.id]
        );


        if (doctorUser.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Doctor user not found"
            });
        }


        const doctorEmail = doctorUser.rows[0].email;


        // Find actual doctor record
        const doctor = await pool.query(
            "SELECT id FROM doctors WHERE email = $1",
            [doctorEmail]
        );


        if (doctor.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Doctor profile not found"
            });
        }


        const doctorId = doctor.rows[0].id;


        // Update appointment
        const appointment = await updateAppointmentStatus(
            id,
            doctorId,
            status
        );


        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found or does not belong to this doctor"
            });
        }


        return res.status(200).json({
            success: true,
            message: "Appointment status updated successfully",
            appointment
        });

    } catch (error) {
        console.error("Update appointment status error:", error);


        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};