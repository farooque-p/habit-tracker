import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `MongDB Connected!! Database Host: ${(await connectionInstance).connection.host}`
    );
  } catch (error) {
    console.log("MongoDB Connection Failed!");
    process.exit(1);
  }
};

export default connectDB;
