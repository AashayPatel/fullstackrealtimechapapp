import express from "express";
import multer from "multer";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Setup multer to handle file uploads in memory
const upload = multer({ storage: multer.memoryStorage() });

// Public routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Protected routes
router.put("/update-profile", protectRoute, upload.single("profilePic"), updateProfile);
router.get("/check", protectRoute, checkAuth);

export default router;
