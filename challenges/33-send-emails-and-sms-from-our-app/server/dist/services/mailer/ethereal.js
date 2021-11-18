"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailOptions = exports.transporter = void 0;
var nodemailer_1 = __importDefault(require("nodemailer"));
exports.transporter = nodemailer_1.default.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: "manuel.koelpin1@ethereal.email",
        pass: "pURfNkY811KMwYxZX9",
    },
});
exports.mailOptions = {
    from: "Servidor Node.js",
    to: "ford.blanda@ethereal.email",
    subject: "Mail de prueba desde Node.js",
    html: "<h1>Test Node.js - Nodemailer</h1>",
};
