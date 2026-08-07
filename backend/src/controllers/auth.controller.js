import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";


// REGISTER USER
export const register = async (req, res) => {
    try {
        console.log("Received body:", req.body);

        const { full_name, email, password, role } = req.body;


        if (!full_name || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }


        // Check existing user
        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );


        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }


        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Insert user
        const newUser = await pool.query(
            `INSERT INTO users (full_name, email, password, role)
             VALUES ($1, $2, $3, $4)
             RETURNING id, full_name, email, role`,
            [
                full_name,
                email,
                hashedPassword,
                role
            ]
        );


        // Generate JWT token
        const token = jwt.sign(
            {
                id: newUser.rows[0].id,
                role: newUser.rows[0].role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );


        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: newUser.rows[0],
            token
        });


    } catch (error) {

        console.error("Register error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};




// LOGIN USER
export const login = async (req, res) => {
    try {

        console.log("Received body:", req.body);


        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }


        // Find user
        const user = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );


        if (user.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }


        // Compare password
        const passwordMatch = await bcrypt.compare(
            password,
            user.rows[0].password
        );


        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }


        // Generate token
        const token = jwt.sign(
            {
                id: user.rows[0].id,
                role: user.rows[0].role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );


        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.rows[0].id,
                full_name: user.rows[0].full_name,
                email: user.rows[0].email,
                role: user.rows[0].role
            }
        });


    } catch (error) {

        console.error("Login error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};