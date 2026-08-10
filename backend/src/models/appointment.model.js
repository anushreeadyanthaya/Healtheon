import pool from "../config/db.js";


// CREATE APPOINTMENT
export const createAppointment = async (appointmentData) => {
    const {
        patientId,
        doctorId,
        doctorName,
        appointmentDate,
        reason,
        status
    } = appointmentData;


    const query = `
        INSERT INTO appointments (
            patient_id,
            doctor_id,
            doctor_name,
            appointment_date,
            reason,
            status
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING
            id,
            patient_id,
            doctor_id,
            doctor_name,
            appointment_date,
            reason,
            status,
            created_at,
            updated_at;
    `;


    const values = [
        patientId,
        doctorId,
        doctorName,
        appointmentDate,
        reason,
        status
    ];


    const result = await pool.query(query, values);

    return result.rows[0];
};


// GET ALL APPOINTMENTS OF PATIENT
export const getAppointmentsByPatient = async (patientId) => {
    const query = `
        SELECT
            id,
            patient_id,
            doctor_id,
            doctor_name,
            appointment_date,
            reason,
            status,
            created_at,
            updated_at
        FROM appointments
        WHERE patient_id = $1
        ORDER BY appointment_date ASC;
    `;


    const result = await pool.query(query, [patientId]);

    return result.rows;
};


// GET SINGLE APPOINTMENT
export const getAppointmentById = async (id, patientId) => {
    const query = `
        SELECT
            id,
            patient_id,
            doctor_id,
            doctor_name,
            appointment_date,
            reason,
            status,
            created_at,
            updated_at
        FROM appointments
        WHERE id = $1
        AND patient_id = $2;
    `;


    const result = await pool.query(query, [id, patientId]);

    return result.rows[0];
};


// GET ALL APPOINTMENTS OF DOCTOR
export const getAppointmentsByDoctor = async (doctorId) => {
    const query = `
        SELECT
            id,
            patient_id,
            doctor_id,
            doctor_name,
            appointment_date,
            reason,
            status,
            created_at,
            updated_at
        FROM appointments
        WHERE doctor_id = $1
        ORDER BY appointment_date ASC;
    `;


    const result = await pool.query(query, [doctorId]);

    return result.rows;
};


// UPDATE APPOINTMENT STATUS
export const updateAppointmentStatus = async (id, doctorId, status) => {
    const query = `
        UPDATE appointments
        SET
            status = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        AND doctor_id = $3
        RETURNING
            id,
            patient_id,
            doctor_id,
            doctor_name,
            appointment_date,
            reason,
            status,
            created_at,
            updated_at;
    `;


    const result = await pool.query(
        query,
        [status, id, doctorId]
    );


    return result.rows[0];
};