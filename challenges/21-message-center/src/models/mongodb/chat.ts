import {Schema, model, Model} from "mongoose";
import {IMessage} from "../../utils/socketIoInterfaces";

const chatSchema = new Schema<IMessage>({
  userEmail: {type: String, required: true},
  messageDate: {type: String, required: true},
  userMessage: {type: String, required: true},
});

export const ChatModel: Model<IMessage> = model<IMessage>("Chat", chatSchema);
