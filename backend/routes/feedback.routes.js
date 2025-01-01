import express from "express";
import nodemailer from "nodemailer";
const router = express.Router();

router.post("/", async (req, res) => {
    const { email, feedback } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.FEEDBACK_RECEIVER, // Feedback receiver email
            subject: "Feedback Received",
            text: `Feedback: ${feedback}\nFrom: ${email}`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Feedback sent successfully!" });
    } catch (error) {
        console.error("Error sending feedback email:", error);
        res.status(500).json({ error: "Failed to send feedback" });
    }
});

export default router;
