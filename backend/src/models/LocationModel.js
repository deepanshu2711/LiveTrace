import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    userId: String,
    lat: String,
    long: String,
  },
  { timestamps: true },
);

export const Location = mongoose.model("Location", locationSchema);
