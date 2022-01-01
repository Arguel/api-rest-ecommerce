"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
var twilio_1 = require("twilio");
var config_1 = __importDefault(require("config"));
var _a = config_1.default.default.twilio, accountSid = _a.accountSid, authToken = _a.authToken, myNumber = _a.myNumber, twilioNumber = _a.twilioNumber;
exports.client = new twilio_1.Twilio(accountSid, authToken);
/*
 *client.messages
 *  .create({
 *    body: "Hello from Node",
 *    to: myNumber, // Text this number
 *    from: twilioNumber, // From a valid Twilio number
 *  })
 *  .then((message) => console.log(message.sid));
 */
