// contactRoutes.js
import express from "express";
import { submitMessage } from "../controllers/contactController.js"; // ✅ Only import what's used

const router = express.Router();

router.post("/", submitMessage); // POST /api/contact
export default router;
