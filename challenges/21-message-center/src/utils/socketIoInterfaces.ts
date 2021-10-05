import {Types} from "mongoose";

export interface IAuthor {
  id: string; // Email
  name: string;
  surname: string;
  age: number;
  alias: string;
  avatar: string;
}
export interface IMessage {
  _id?: Types.ObjectId | object | number | string;
  author: IAuthor;
  date: string;
  text: string;
}

export interface IMessages {
  _id?: Types.ObjectId | object | number | string;
  messages: object;
}

export interface INormaMsgs {
  entities: object;
  result: unknown;
}
