import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectMongoDB(): Promise<void> {
  if (process.env.MONGO_URI) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
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
