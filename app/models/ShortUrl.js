import mongoose from "mongoose";

const ShortUrlSchema = new mongoose.Schema(
  {
    shortUrl: { type: String },
    fullUrl: { type: String },
  },
  { timestamps: true }
);

export const ShortUrl = mongoose.model("ShortUrl", ShortUrlSchema);
