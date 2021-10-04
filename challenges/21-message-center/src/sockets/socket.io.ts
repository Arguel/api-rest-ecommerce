import {Server} from "socket.io";
import {IMessage} from "../utils/socketIoInterfaces";
import {ChatModel} from "../models/mongodb/chat";

export const socketIo = (io: Server) => {
  io.on("connection", async (socket) => {
    console.log("New connection");
    const messages = (await ChatModel.find({}).limit(10)) as IMessage[];

    io.emit("messages", messages);
    socket.on("newMessage", async (message: IMessage) => {
      const newMessage = new ChatModel(message);
      await newMessage.save();
      messages.push(message);
      io.sockets.emit("messages", messages);
    });
  });
};
