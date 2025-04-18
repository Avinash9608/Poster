import express from "express";
const router = express.Router();
import {
  createPoster,
  getPublicPosters,
  getFeaturedPosters,
  getPosterById,
  updatePoster,
  deletePoster,
  getUserPosters,
  getAllPosters,
} from "../controllers/posterController.js";
import { protect, admin } from "../middleware/auth.js";

// Public routes
router.get("/", getPublicPosters);
router.get("/featured", getFeaturedPosters);
router.get("/:id", getPosterById);

// Protected routes
router.post("/", protect, createPoster);
router.put("/:id", protect, updatePoster);
router.delete("/:id", protect, deletePoster);
router.get("/user/me", protect, getUserPosters);

// Admin routes
router.get("/admin/all", protect, admin, getAllPosters);

export default router;
