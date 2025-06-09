import express from "express";
import Skill from "../models/Skill.js";

const router = express.Router();

router.get("/", async (req, res) => {  // just "/" here because you used "/api/skills" in main
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch skills" });
  }
});

export default router;
