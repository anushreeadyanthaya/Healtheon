import pool from "../config/db.js";

export const createUser = async (userData) => {
  const { fullName, email, password, role } = userData;

  const query = `
    INSERT INTO users (full_name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, full_name, email, role, created_at;
  `;

  const values = [fullName, email, password, role];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const getUserByEmail = async (email) => {
  const query = `
    SELECT *
    FROM users
    WHERE email = $1;
  `;

  const result = await pool.query(query, [email]);

  return result.rows[0];
};

export const getUserById = async (id) => {
  const query = `
    SELECT id, full_name, email, role, created_at
    FROM users
    WHERE id = $1;
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};