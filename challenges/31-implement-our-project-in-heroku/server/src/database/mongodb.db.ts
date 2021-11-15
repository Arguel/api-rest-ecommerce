import {connect, ConnectOptions} from "mongoose";
import config from "config";
import {IConfigDefault} from "../config/default";

const {
  default: {
    db: {
      mongodb: {mongoUri},
    },
  },
} = config as IConfigDefault;

interface IConnectOptions extends ConnectOptions {
  useNewUrlParser?: boolean;
  useUnifiedTopology?: boolean;
}

export const mongoOptions: IConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export async function connectMongoDB(): Promise<void> {
  if (process.env.MONGO_URI)
    try {
      await connect(mongoUri, mongoOptions);
      console.log("MongoDB connection SUCCESS");
    } catch (err) {
      console.error((err as Error).message || "MongoDB connection FAIL");
    }
  else console.log("Could not find the file '.env'");
}
