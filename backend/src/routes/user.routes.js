import express from "express";
import { protect } from "../middlewares/auth.middlewares.js";
import { getUserById } from "../models/user.model.js";

const router = express.Router();


// GET USER PROFILE
router.get("/profile", protect, async (req, res) => {
    try {
        // Get user ID from the verified JWT
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


export default router;