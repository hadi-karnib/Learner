import express from "express";
import {
  getUsers,
  createUser,
  deleteUser,
  getUser,
  loginUser,
  loginAdmin,
} from "../controllers/userController.js";
import { adminProtect, protect } from "../middleware/protectRoutes.js";
const router = express.Router();

// Get all users
router.get("/", protect, getUsers);
router.get("/:id", protect, getUser);
router.post("/", createUser);
router.post("/login", loginUser);
router.post("/admin/login", loginAdmin);

router.delete("/:id", protect, adminProtect, deleteUser);

export default router;
