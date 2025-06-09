import Contact from "../models/Contact.js";

export const submitMessage = async (req, res) => {
  try {
    const newMsg = new Contact(req.body);
    await newMsg.save();
    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
