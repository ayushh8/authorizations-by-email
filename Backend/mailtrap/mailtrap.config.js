import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

// Ensure that you use the correct environment variable name
const TOKEN = process.env.MAIL_TRAP_TOKEN; // Fixed the variable name

if (!TOKEN) {
    throw new Error("MAIL_TRAP_TOKEN is not defined in the .env file.");
}

export const mailtrapClient = new MailtrapClient({
    token: TOKEN,
});

export const sender = {
    email: "hello@demomailtrap.com",
    name: "Chiku",
};

// Optionally, you could also export a function to send emails
export const sendVerificationEmail = async (email, verificationToken) => {
    const recipients = [{ email }];

    const subject = "Verify your email";
    const html = `
        <h1>Verify Your Email</h1>
        <p>Your verification code is <strong>${verificationToken}</strong>.</p>
        <p>Please use this code to complete your registration.</p>
    `;

    try {
        await mailtrapClient.send({
            from: sender,
            to: recipients,
            subject,
            html,  // Use html instead of text
            category: "Verification",
        });
        console.log(`Verification email sent to ${email}`);
    } catch (error) {
        console.error("Error sending verification email:", error);
    }
};
