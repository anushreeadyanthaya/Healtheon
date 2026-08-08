import express from "express";
import { protect } from "../middlewares/auth.middlewares.js";

const router = express.Router();


// PROTECTED PROFILE ROUTE
router.get("/profile", protect, (req, res) => {

    res.status(200).json({
        success: true,
        message: "Profile accessed successfully",
        user: req.user
    });

});


export default router;