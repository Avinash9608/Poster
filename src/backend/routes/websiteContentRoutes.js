import express from "express";
const router = express.Router();
import {
  getContentBySection,
  getAllContent,
  updateContent,
} from "../controllers/websiteContentController.js";
import { protect, admin } from "../middleware/auth.js";

// Public routes
router.get("/:section", getContentBySection);
router.get("/", getAllContent);

// Admin routes
router.put("/:section", protect, admin, updateContent);

export default router;
