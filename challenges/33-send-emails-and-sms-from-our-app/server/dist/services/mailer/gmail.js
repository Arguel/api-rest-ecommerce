"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gmailMailOpt = exports.gmailTsp = void 0;
var nodemailer_1 = __importDefault(require("nodemailer"));
var config_1 = __importDefault(require("config"));
var _a = config_1.default.default.mailer.gmail, email = _a.email, pass = _a.pass;
exports.gmailTsp = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: email,
        pass: pass,
    },
});
exports.gmailMailOpt = {
    from: "Servidor Node.js",
    to: email,
    subject: "Mail de prueba desde Node.js",
    html: "<h1>Test Node.js - Nodemailer</h1>",
    /*
     *attachments: [
     *  {
     *    path: "",
     *  },
     *],
     */
};
