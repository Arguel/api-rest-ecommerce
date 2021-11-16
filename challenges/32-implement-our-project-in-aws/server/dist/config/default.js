"use strict";
const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const dotenv_1 = __importDefault(require("dotenv"));
// Environment Variables
dotenv_1.default.config();
const port = process.argv[2];
const appId = process.argv[3];
const appSecret = process.argv[4];
const startMode = process.argv[5];
const initiator = process.argv[6];
const config = {
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
};
exports.default = config;
