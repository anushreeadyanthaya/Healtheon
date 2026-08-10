import pool from "../config/db.js";


// CREATE DOCTOR
export const createDoctor = async (doctorData) => {
    const {
        fullName,
        email,
        specialization,
        phone,
        experienceYears
    } = doctorData;

    const query = `
        INSERT INTO doctors (
            full_name,
            email,
            specialization,
            phone,
            experience_years
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING
            id,
            full_name,
            email,
            specialization,
            phone,
            experience_years,
            created_at,
            updated_at;
    `;

    const values = [
        fullName,
        email,
        specialization,
        phone,
        experienceYears
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
};


// GET ALL DOCTORS
export const getAllDoctors = async () => {
    const query = `
        SELECT
            id,
            full_name,
            email,
            specialization,
            phone,
            experience_years,
            created_at,
            updated_at
        FROM doctors
        ORDER BY full_name ASC;
    `;

    const result = await pool.query(query);

    return result.rows;
};


// GET DOCTOR BY ID
export const getDoctorById = async (id) => {
    const query = `
        SELECT
            id,
            full_name,
            email,
            specialization,
            phone,
            experience_years,
            created_at,
            updated_at
        FROM doctors
        WHERE id = $1;
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0];
};