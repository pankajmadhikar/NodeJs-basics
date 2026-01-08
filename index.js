import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { createUser } from "./app/controller/userController.js";
import {
  createShortUrl,
  getOriginalUrl,
} from "./app/controller/shortUrlController.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(`${process.env.MONGO_URL}/nodejs-learning`)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("MongoDB Connection Failed", err);
  });

app.post("/createuser", createUser);
app.post("/createShortUrl", createShortUrl);
app.get("/:shortUrlCode", getOriginalUrl);

app.listen(PORT, () => {
  console.log("App is running on ", PORT);
});
