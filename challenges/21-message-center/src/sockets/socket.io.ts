import {Server} from "socket.io";
import fs from "fs";
import {IMessage} from "../utils/socketIoInterfaces";

// Messages json
const messagesData = fs.readFileSync(__dirname + "/userMessages.json", "utf-8");
const messages = JSON.parse(messagesData.toString());

export const socketIo = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("New connection");

    io.emit("messages", messages);
    socket.on("newMessage", (message: IMessage) => {
      messages.push(message);
      fs.writeFileSync(
        __dirname + "/userMessages.json",
        JSON.stringify(messages, null, "\t"),
        "utf-8",
      );
      io.emit("messages", messages);
    });
  });
};
