import mongoose from "mongoose";
import config from "config";
import {IConfigDefault} from "../config/default";

const {
  default: {
    db: {
      mongodb: {connectionString},
    },
  },
} = config as IConfigDefault;

export const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export async function connectMongoDB(): Promise<void> {
  if (process.env.MONGO_URI) {
    try {
      await mongoose.connect(connectionString, mongoOptions);
      console.log("MongoDB connection SUCCESS");
    } catch (err) {
      console.error((err as Error).message || "MongoDB connection FAIL");
      process.exit(1);
    }
  } else {
    console.log("Could not find the file '.env'");
    process.exit(1);
  }
}
