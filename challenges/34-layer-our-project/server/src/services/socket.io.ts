import {Server} from "socket.io";
import {IMessage, INormaMsgs} from "../libs/interfaces/socketIo.interfaces";
import {ChatModel} from "../models/mongodb/chat";
import {normalize, schema} from "normalizr";
import {client, clientOpt} from "./twilio/messaging";

const validPhoneNumber = (txt: string): boolean => {
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}$/im;
  return txt.match(regex) ? true : false;
};

export const socketIo = (io: Server): void => {
  io.on("connection", async (socket) => {
    console.log("New connection");
    const messagesMongo = (await ChatModel.find().limit(10)) as IMessage[];
    let normalizedData = convertMsgs(messagesMongo);

    io.emit("messages", normalizedData);
    socket.on("newMessage", async (msg: IMessage) => {
      // we analyze the message in search of the following pattern "/admin +XXXXXXXXXXXXX" "Message"
      let msgText = msg.text.trim();
      if (msgText.substr(0, 6) === "/admin") {
        msgText = msgText.substr(7);
        // We look for the number
        //
        const index = msgText.indexOf(" ");
        if (index !== -1) {
          const phoneNumber = msgText.substr(0, index);
          msgText = msgText.substr(index + 1);

          if (validPhoneNumber(phoneNumber)) {
            clientOpt.to = phoneNumber;
            clientOpt.body = msgText;
            try {
              await client.messages.create(clientOpt);
            } catch (err) {
              console.log(err);
            }
          } else {
            console.log("Please enter a valid phone number");
          }
        } else {
          console.log("Please enter a phone number");
        }
      } else {
        // In case of not finding a command, the message is sent normally
        const newMessage = new ChatModel(msg);
        await newMessage.save();
        messagesMongo.push({...msg, _id: newMessage._id});
        normalizedData = convertMsgs(messagesMongo);
        io.sockets.emit("messages", normalizedData);
      }
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
