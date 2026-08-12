import pool from "../config/db.js";

// CREATE APPOINTMENT
export const createAppointment = async ({
    patientId,
    doctorId,
    doctorName,
    appointmentDate,
    reason,
    status
}) => {
    const result = await pool.query(
        `
        INSERT INTO appointments
        (
            patient_id,
            doctor_id,
            doctor_name,
            appointment_date,
            reason,
            status
        )
        VALUES
        ($1, $2, $3, $4, $5, $6)
        RETURNING *
        `,
        [
            patientId,
            doctorId,
            doctorName,
            appointmentDate,
            reason,
            status
        ]
    );

    return result.rows[0];
};


// GET ALL APPOINTMENTS OF PATIENT
export const getAppointmentsByPatient = async (patientId) => {
    const result = await pool.query(
        `
        SELECT
            a.*,
            u.full_name AS patient_name,
            u.email AS patient_email
        FROM appointments a
        JOIN users u ON a.patient_id = u.id
        WHERE a.patient_id = $1
        ORDER BY a.appointment_date DESC
        `,
        [patientId]
    );

    return result.rows;
};


// GET ALL APPOINTMENTS OF DOCTOR
export const getAppointmentsByDoctor = async (doctorId) => {
    const result = await pool.query(
        `
        SELECT
            a.*,
            u.full_name AS patient_name,
            u.email AS patient_email
        FROM appointments a
        JOIN users u ON a.patient_id = u.id
        WHERE a.doctor_id = $1
        ORDER BY a.appointment_date ASC
        `,
        [doctorId]
    );

    return result.rows;
};


// GET SINGLE APPOINTMENT
export const getAppointmentById = async (id, patientId) => {
    const result = await pool.query(
        `
        SELECT *
        FROM appointments
        WHERE id = $1
        AND patient_id = $2
        `,
        [id, patientId]
    );

    return result.rows[0];
};


// UPDATE APPOINTMENT STATUS
export const updateAppointmentStatus = async (
    id,
    doctorId,
    status
) => {
    const result = await pool.query(
        `
        UPDATE appointments
        SET
            status = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        AND doctor_id = $3
        RETURNING *
        `,
        [status, id, doctorId]
    );

    return result.rows[0];
};