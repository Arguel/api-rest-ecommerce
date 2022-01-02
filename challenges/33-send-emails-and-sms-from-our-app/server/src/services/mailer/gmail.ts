import nodemailer from "nodemailer";
import config from "config";
import {IConfigDefault} from "../../config/default";

const {
  default: {
    mailer: {
      gmail: {email, pass},
    },
  },
} = config as IConfigDefault;

export const gmailTsp = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: pass,
  },
});

interface IGmailMailOpt {
  from: string;
  to: string;
  subject?: string;
  html: string;
  attachments?: [
    {
      path?: string;
      href?: string;
    },
  ];
  text?: string;
}

export const gmailMailOpt: IGmailMailOpt = {
  from: "Servidor Node.js",
  to: email,
  subject: "Mail de prueba desde Node.js",
  html: "<h1>Test Node.js - Nodemailer</h1>",
};
