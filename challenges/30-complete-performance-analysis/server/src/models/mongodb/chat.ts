import {Schema, model} from "mongoose";
import {IMessage} from "../../libs/interfaces/socketIo.interfaces";

const chatSchema = new Schema<IMessage>({
  author: {
    id: {type: String, required: true}, // Email
    name: {type: String, required: true},
    surname: {type: String, required: true},
    age: {type: Number, required: true},
    alias: {type: String, required: true},
    avatar: {type: String, required: true},
  },
  date: {type: String, required: true},
  text: {type: String, required: true},
});

export const ChatModel = model<IMessage>("Chat", chatSchema);
