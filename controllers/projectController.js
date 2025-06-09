import Project from "../models/Project.js";

// GET all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: err.message });
  }
};

// POST new project
export const createProject = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ error: "Project title is required" });
    }
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(400).json({ error: err.message });
  }
};
