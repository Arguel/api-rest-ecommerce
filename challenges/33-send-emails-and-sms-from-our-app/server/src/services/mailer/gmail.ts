import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "cursonodeav@gmail.com",
    pass: "ppppppppppppppppp",
  },
});

const mailOptions = {
  from: "Servidor Node.js",
  to: "cursonodeav@gmail.com",
  subject: "Mail de prueba desde Node.js",
  html: "<h1>Test Node.js - Nodemailer</h1>",
  attachments: [
    {
      path: "",
    },
  ],
};

export const gmailMailer = {
  transporter,
  mailOptions,
};
