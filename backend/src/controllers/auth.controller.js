import { createUser, getUserByEmail } from "../models/user.model.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    // Validate required fields
    if (!fullName || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const newUser = await createUser({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    // Generate JWT
    const token = generateToken(newUser.id, newUser.role);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: newUser,
    });

  } catch (error) {
    console.error("Registration Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
      error: error,
      stack: error.stack,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare passwords
    const isPasswordValid = await comparePassword(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT
    const token = generateToken(existingUser.id, existingUser.role);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: existingUser.id,
        full_name: existingUser.full_name,
        email: existingUser.email,
        role: existingUser.role,
      },
    });

   } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
      error: error,
      stack: error.stack,
    });
  }
};