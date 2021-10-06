import {Server} from "socket.io";
import {IMessage, INormaMsgs} from "../utils/socketIoInterfaces";
import {ChatModel} from "../models/mongodb/chat";
import {normalize, schema} from "normalizr";

export const socketIo = (io: Server): void => {
  io.on("connection", async (socket) => {
    console.log("New connection");
    const messagesMongo = (await ChatModel.find().limit(10)) as IMessage[];
    let normalizedData = convertMsgs(messagesMongo);

    io.emit("messages", normalizedData);
    socket.on("newMessage", async (msg: IMessage) => {
      const newMessage = new ChatModel(msg);
      await newMessage.save();
      messagesMongo.push({...msg, _id: newMessage._id});
      normalizedData = convertMsgs(messagesMongo);
      io.sockets.emit("messages", normalizedData);
    });
  });
};

function convertMsgs(data: IMessage[]): INormaMsgs {
  const newData = data.map((msg) => ({
    id: msg._id!.toString(),
    author: msg.author,
    date: msg.date,
    text: msg.text,
  }));

  const authorSchema = new schema.Entity("authors");
  const messageSchema = new schema.Entity("messages", {
    author: authorSchema,
  });
  const messagesSchema = new schema.Array(messageSchema);

  return normalize(newData, messagesSchema);
}
