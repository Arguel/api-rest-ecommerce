import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "manuel.koelpin1@ethereal.email",
    pass: "pURfNkY811KMwYxZX9",
  },
});

export const mailOptions = {
  from: "Servidor Node.js",
  to: "ford.blanda@ethereal.email",
  subject: "Mail de prueba desde Node.js",
  html: "<h1>Test Node.js - Nodemailer</h1>",
};
