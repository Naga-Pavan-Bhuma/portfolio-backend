// routes/contact.js
import express from "express";
import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, mobileNumber, message } = req.body;

  try {
    // 1. Save to MongoDB
    const newContact = new Contact({ name, email, mobileNumber, message });
    await newContact.save();

    // 2. Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can use another SMTP service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // use App Password if using Gmail
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: "your-email@example.com",
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobileNumber}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Contact saved and email sent successfully." });
  } catch (error) {
    console.error("Contact form error:", error.message);
    res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
});

export default router;
