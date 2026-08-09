import express from "express";
import { protect } from "../middlewares/auth.middlewares.js";
import { getUserById } from "../models/user.model.js";
import pool from "../config/db.js";

const router = express.Router();


// =====================================================
// GET USER PROFILE
// =====================================================
router.get("/profile", protect, async (req, res) => {
    try {
        // Get user ID from verified JWT
        const userId = req.user.id;

        // Fetch user from database
        const user = await getUserById(userId);

        // User not found
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Return user profile
        return res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            user
        });

    } catch (error) {
        console.error("Profile error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
});

router.put("/profile", protect, async (req, res) => {
    try {
        // Get user ID from verified JWT
        const userId = req.user.id;

        // Get editable fields from request body
        const { full_name, email } = req.body;

        // Validate input
        if (!full_name && !email) {
            return res.status(400).json({
                success: false,
                message: "At least one field is required"
            });
        }

        // Update profile
        const result = await pool.query(
            `UPDATE users
             SET
                full_name = COALESCE($1, full_name),
                email = COALESCE($2, email),
                updated_at = CURRENT_TIMESTAMP
             WHERE id = $3
             RETURNING id, full_name, email, role, is_active, created_at, updated_at`,
            [full_name || null, email || null, userId]
        );

        // User not found
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Return updated profile
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: result.rows[0]
        });

    } catch (error) {
        console.error("Update profile error:", error);

        // Handle duplicate email
        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
});


export default router;