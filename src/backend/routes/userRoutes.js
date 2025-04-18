import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  getUserProfile,
  getUsers,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/auth.js";

// Public routes
router.post("/", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/profile", protect, getUserProfile);

// Admin routes
router.get("/", protect, admin, getUsers);

export default router;
