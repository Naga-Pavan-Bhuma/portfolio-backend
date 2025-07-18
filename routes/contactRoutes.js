import express from "express";
import { submitMessage, getMessages } from "../controllers/contactController.js";

const router = express.Router();

router.post("/", submitMessage);
router.get("/", getMessages);

export default router;
import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";

export const submitMessage = async (req, res) => {
  try {
    const { name, email, mobileNumber, message } = req.body;

    // Save the contact message to MongoDB
    const newMessage = new Contact({ name, email, mobileNumber, message });
    await newMessage.save();

    // Send Email Notification to You
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // Gmail app password
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "📩 New Contact Form Submission",
      html: `
        <h3>New Message from Portfolio</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${mobileNumber}</p>
        <p><strong>Message:</strong><br>${message}</p>
        <br><hr>
        <small>Received via portfolio contact form</small>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ success: true, message: "Message submitted successfully and email sent." });
  } catch (error) {
    console.error("❌ Error in submitMessage:", error.message);
    res.status(500).json({ success: false, error: "Something went wrong. Please try again later." });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch messages." });
  }
};
