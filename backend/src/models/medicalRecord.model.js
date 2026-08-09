import pool from "../config/db.js";


// CREATE MEDICAL RECORD
export const createMedicalRecord = async (recordData) => {
    const {
        patient_id,
        diagnosis,
        notes,
        prescription,
        record_date
    } = recordData;

    const query = `
        INSERT INTO medical_records (
            patient_id,
            diagnosis,
            notes,
            prescription,
            record_date
        )
        VALUES ($1, $2, $3, $4, COALESCE($5, CURRENT_TIMESTAMP))
        RETURNING
            id,
            patient_id,
            diagnosis,
            notes,
            prescription,
            record_date,
            created_at,
            updated_at;
    `;

    const values = [
        patient_id,
        diagnosis,
        notes,
        prescription,
        record_date || null
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
};


// GET MEDICAL RECORDS BY PATIENT
export const getMedicalRecordsByPatient = async (patientId) => {
    const query = `
        SELECT
            id,
            patient_id,
            diagnosis,
            notes,
            prescription,
            record_date,
            created_at,
            updated_at
        FROM medical_records
        WHERE patient_id = $1
        ORDER BY record_date DESC;
    `;

    const result = await pool.query(query, [patientId]);

    return result.rows;
};


// GET SINGLE MEDICAL RECORD
export const getMedicalRecordById = async (recordId, patientId) => {
    const query = `
        SELECT
            id,
            patient_id,
            diagnosis,
            notes,
            prescription,
            record_date,
            created_at,
            updated_at
        FROM medical_records
        WHERE id = $1
        AND patient_id = $2;
    `;

    const result = await pool.query(query, [recordId, patientId]);

    return result.rows[0];
};