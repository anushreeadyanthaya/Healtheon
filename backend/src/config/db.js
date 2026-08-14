import pg from "pg";

const { Pool } = pg;

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    })
  : new Pool({
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || "healtheon_db",
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD,
    });

export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("PostgreSQL connected successfully");
    client.release();
  } catch (error) {
    console.error("Database connection failed");
    console.error(error);
    process.exit(1);
  }
};

export default pool;