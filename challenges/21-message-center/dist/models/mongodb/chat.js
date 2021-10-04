"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModel = void 0;
var mongoose_1 = require("mongoose");
var chatSchema = new mongoose_1.Schema({
    userEmail: { type: String, required: true },
    messageDate: { type: String, required: true },
    userMessage: { type: String, required: true },
});
exports.ChatModel = (0, mongoose_1.model)("Chat", chatSchema);
