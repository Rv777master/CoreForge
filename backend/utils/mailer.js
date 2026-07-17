const nodemailer = require("nodemailer");

// Reads Gmail credentials from .env. If they're not set, email sending
// is silently skipped so the rest of the app still works without it.
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_TO = process.env.EMAIL_TO || EMAIL_USER;

let transporter = null;

if (EMAIL_USER && EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
}

/**
 * Sends a plain-text notification email. Fails silently (logs a warning)
 * if email isn't configured, so form submissions still succeed either way.
 */
async function sendNotification(subject, text) {
  if (!transporter) {
    console.warn("Email not configured — skipping notification:", subject);
    return;
  }
  try {
    await transporter.sendMail({
      from: `"CoreForge Website" <${EMAIL_USER}>`,
      to: EMAIL_TO,
      subject,
      text,
    });
  } catch (err) {
    console.error("Failed to send email notification:", err.message);
  }
}

module.exports = { sendNotification };
