import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"]
  },
  message: { type: String, required: true, trim: true }
}, { timestamps: true }); 
export default mongoose.model("Contact", ContactSchema);