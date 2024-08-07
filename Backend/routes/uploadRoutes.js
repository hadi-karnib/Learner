import express from "express";
import {
  uploadFile,
  handleFileUpload,
  getAllUploads,
  getUploadsByClass,
} from "../controllers/uploadController.js";
import { protect, adminProtect } from "../middleware/protectRoutes.js";

const router = express.Router();

router.post("/", protect, adminProtect, uploadFile, handleFileUpload);
router.get("/", protect, adminProtect, getAllUploads);
router.get("/class/:classId", protect, getUploadsByClass);

export default router;
