"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketIo = void 0;
var fs_1 = __importDefault(require("fs"));
// Messages json
var messagesData = fs_1.default.readFileSync(__dirname + "/userMessages.json", "utf-8");
var messages = JSON.parse(messagesData.toString());
var socketIo = function (io) {
    io.on("connection", function (socket) {
        console.log("New connection");
        io.emit("messages", messages);
        socket.on("newMessage", function (message) {
            messages.push(message);
            fs_1.default.writeFileSync(__dirname + "/userMessages.json", JSON.stringify(messages, null, "\t"), "utf-8");
            io.emit("messages", messages);
        });
    });
};
exports.socketIo = socketIo;
