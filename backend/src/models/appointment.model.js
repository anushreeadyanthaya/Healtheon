import pool from "../config/db.js";


export const createAppointment = async (appointmentData) => {
  const {
    patientId,
    doctorName,
    appointmentDate,
    reason,
    status
  } = appointmentData;

  const query = `
    INSERT INTO appointments (
      patient_id,
      doctor_name,
      appointment_date,
      reason,
      status
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING
      id,
      patient_id,
      doctor_name,
      appointment_date,
      reason,
      status,
      created_at,
      updated_at;
  `;

  const values = [
    patientId,
    doctorName,
    appointmentDate,
    reason,
    status
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};


export const getAppointmentsByPatient = async (patientId) => {
  const query = `
    SELECT
      id,
      patient_id,
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


export const getAppointmentById = async (id, patientId) => {
  const query = `
    SELECT
      id,
      patient_id,
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
