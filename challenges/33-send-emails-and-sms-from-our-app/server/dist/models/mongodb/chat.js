"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModel = void 0;
var mongoose_1 = require("mongoose");
var chatSchema = new mongoose_1.Schema({
    author: {
        id: { type: String, required: true },
        name: { type: String, required: true },
        surname: { type: String, required: true },
        age: { type: Number, required: true },
        alias: { type: String, required: true },
        avatar: { type: String, required: true },
    },
    date: { type: String, required: true },
    text: { type: String, required: true },
});
exports.ChatModel = (0, mongoose_1.model)("Chat", chatSchema);
