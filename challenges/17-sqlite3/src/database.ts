import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

run();

async function run(): Promise<void> {
  if (process.env.MONGO_URI) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Mongo connected");
    } catch (err) {
      console.error(err.message || "Mongo disconnected");
      process.exit(1);
    }
  } else {
    console.log("Could not find the file '.env'");
    process.exit(1);
  }
}
