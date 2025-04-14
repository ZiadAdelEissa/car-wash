import express from "express";
import {
  getAllPackages,
  purchasePackage,
  sharePackage,
  createPackage,
  updatePackage,
  deletePackage,
} from "../controllers/packageController.js";
import { isAuthenticated, isSuperAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllPackages);

// Authenticated user routes
router.post("/purchase", isAuthenticated, purchasePackage);
router.post("/share", isAuthenticated, sharePackage);

// Admin routes
router.post("/", isAuthenticated, isSuperAdmin, createPackage);
router.put("/:id", isAuthenticated, isSuperAdmin, updatePackage);
router.delete("/:id", isAuthenticated, isSuperAdmin, deletePackage);

export default router;