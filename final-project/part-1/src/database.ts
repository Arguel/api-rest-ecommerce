import mongoose from "mongoose";
import dotenv from "dotenv";
// import cors from "cors";

dotenv.config();
console.log("asdd");
console.log(process.env.MONGO_URI);
console.log(process.env.PORT);

run().catch((err) => console.log(err));

async function run(): Promise<void> {
  if (process.env.MONGO_URI) {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo connected");
  }
}

export default mongoose;
