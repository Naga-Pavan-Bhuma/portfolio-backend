import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";

export const submitMessage = async (req, res) => {
  const { name, email, mobileNumber, message } = req.body;

  try {
    // 1. Save to MongoDB
    const newMsg = new Contact({ name, email, mobileNumber, message });
    await newMsg.save();
    console.log("✅ Contact saved to MongoDB");

    // 2. Setup Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // 3. Styled email content
    const mailOptions = {
      from: `"Contact Form" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      subject: "📬 New Contact Form Submission",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; max-width: 600px; margin: auto; background-color: #f9f9f9;">
          <h2 style="color: #4F46E5;">📨 New Contact Form Submission</h2>

          <table style="width: 100%; margin-top: 20px;">
            <tr>
              <td style="font-weight: bold; padding: 8px; width: 150px;">Name:</td>
              <td style="padding: 8px;">${name}</td>
            </tr>
            <tr style="background-color: #f1f5f9;">
              <td style="font-weight: bold; padding: 8px;">Email:</td>
              <td style="padding: 8px;">${email}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 8px;">Mobile Number:</td>
              <td style="padding: 8px;">${mobileNumber}</td>
            </tr>
            <tr style="background-color: #f1f5f9;">
              <td style="font-weight: bold; padding: 8px; vertical-align: top;">Message:</td>
              <td style="padding: 8px; white-space: pre-line;">${message}</td>
            </tr>
          </table>

          <p style="margin-top: 30px; font-size: 12px; color: #777;">
            📥 This message was submitted via your Portfolio's contact form.
          </p>
        </div>
      `,
    };

    const emailResponse = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", emailResponse.response);

    // 4. Response to frontend
    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("❌ Submit error:", err);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};
