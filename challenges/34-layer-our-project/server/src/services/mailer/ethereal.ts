import nodemailer from "nodemailer";
import config from "config";
import {IConfigDefault} from "../../config/default";

const {
  default: {
    mailer: {
      ethereal: {email, pass},
    },
  },
} = config as IConfigDefault;

export const etherealTsp = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: email,
    pass: pass,
  },
});

export const etherealMailOpt = {
  from: "Servidor Node.js",
  to: "jane.windler45@ethereal.email",
  subject: "Mail de prueba desde Node.js",
  html: "<h1>Test Node.js - Nodemailer</h1>",
};
