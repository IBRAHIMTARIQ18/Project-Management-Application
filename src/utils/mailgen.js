import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Project Management Platform",
      link: "https://project-management-platform.com/",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHTML = mailGenerator.generatePlaintext(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILGEN_SMTP_HOST,
    port: process.env.MAILGEN_SMTP_PORT,
    auth: {
      user: process.env.MAILGEN_SMTP_USER,
      pass: process.env.MAILGEN_SMTP_PASS,
    },
  });

  const mail = {
    from: "mail.taskmanager@example.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHTML,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error(
      "Error service failed silently. Make sure that you have provided your MAILTRAP credentials in the .env file.",
    );
    console.error("Error sending email:", error);
  }
};

const emailVerificationMailgenContent = (username, verificationLink) => {
  return {
    body: {
      name: username,
      intro:
        "Welcome to our project managing platform! We're excited to have you on board.",
      action: {
        instructions:
          "To get started, please verify your email address by clicking the button below:",
        button: {
          color: "#1fe90d",
          text: "Verify your email",
          link: verificationLink,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const forgotPasswordMailgenContent = (username, resetLink) => {
  return {
    body: {
      name: username,
      intro:
        "You have requested to reset your password. Click the button below to set a new password.",
      action: {
        instructions: "To reset your password, click the button below:",
        button: {
          color: "#e9b90d",
          text: "Reset Password",
          link: resetLink,
        },
      },
      outro:
        "If you did not request this, please ignore this email. If you have any questions, just reply to this email.",
    },
  };
};

export {
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  sendEmail,
};
