import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  techStack: [String],
  githubLink: String,
  liveDemo: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Project", ProjectSchema);
