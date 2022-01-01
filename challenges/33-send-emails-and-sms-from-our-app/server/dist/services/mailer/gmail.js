"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gmailMailer = void 0;
var nodemailer_1 = __importDefault(require("nodemailer"));
var transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: "cursonodeav@gmail.com",
        pass: "ppppppppppppppppp",
    },
});
var mailOptions = {
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
exports.gmailMailer = {
    transporter: transporter,
    mailOptions: mailOptions,
};
