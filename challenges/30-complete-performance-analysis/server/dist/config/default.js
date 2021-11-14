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
    app: {
        port: port || process.env.PORT || "8080",
        startMode: "fork" || startMode || "fork",
        initiator: initiator || "forever",
        secretKey: process.env.SECRET_KEY,
    },
    db: {
        mongodb: {
            connectionString: process.env.MONGO_URI,
        },
        mysql: {
            connectionString: process.env.MYSQL_URI,
        },
    },
    facebookApp: {
        appId: appId || process.env.FACEBOOK_APP_ID,
        appSecret: appSecret || process.env.FACEBOOK_APP_SECRET,
    },
};
exports.default = config;
