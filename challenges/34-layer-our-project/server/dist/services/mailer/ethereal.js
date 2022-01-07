"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.etherealMailOpt = exports.etherealTsp = void 0;
var nodemailer_1 = __importDefault(require("nodemailer"));
var config_1 = __importDefault(require("config"));
var _a = config_1.default.default.mailer.ethereal, email = _a.email, pass = _a.pass;
exports.etherealTsp = nodemailer_1.default.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: email,
        pass: pass,
    },
});
exports.etherealMailOpt = {
    from: "Servidor Node.js",
    to: "jane.windler45@ethereal.email",
    subject: "Mail de prueba desde Node.js",
    html: "<h1>Test Node.js - Nodemailer</h1>",
};
