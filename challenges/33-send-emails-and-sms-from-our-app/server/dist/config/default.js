"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
// Environment Variables
dotenv_1.default.config();
var port = process.argv[2];
var appId = process.argv[3];
var appSecret = process.argv[4];
var startMode = process.argv[5];
var initiator = process.argv[6];
var config = {
    // Used on the express server
    app: {
        host: process.env.HOST || process.env.CUSTOM_HOST || "0.0.0.0",
        port: port || process.env.PORT || process.env.CUSTOM_PORT || "8080",
        startMode: startMode || "fork",
        initiator: initiator || "forever",
        startMsg: "Example app listening at {0}",
        secretKey: process.env.SECRET_KEY,
    },
    // Used on the database server
    db: {
        mongodb: {
            mongoUri: process.env.MONGO_URI,
        },
        mysql: {
            mysqlUri: process.env.MYSQL_URI,
        },
    },
    // Used on the facebook application
    facebookApp: {
        appId: appId || process.env.FACEBOOK_APP_ID,
        appSecret: appSecret || process.env.FACEBOOK_APP_SECRET,
    },
    mailer: {
        gmail: {
            email: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASS,
        },
        ethereal: {
            email: process.env.ETHEREAL_EMAIL,
            pass: process.env.ETHEREAL_PASS,
        },
    },
    twilio: {
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        authToken: process.env.TWILIO_AUTH_TOKEN,
        twilioNumber: process.env.TWILIO_PHONE_NUMBER,
        myNumber: process.env.MY_NUMBER,
    },
};
exports.default = config;
