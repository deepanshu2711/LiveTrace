import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/live-trace");
    console.log("connected to MongoDb");
  } catch (error) {
    console.log(error);
  }
};
