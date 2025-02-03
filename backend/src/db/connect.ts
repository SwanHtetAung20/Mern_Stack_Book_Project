import mongoose from "mongoose";

export const connect = async (url: string) => {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
};
