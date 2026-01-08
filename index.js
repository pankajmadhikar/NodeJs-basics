import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { setupRoutes } from "./app/setupRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
setupRoutes(app);

mongoose
  .connect(`${process.env.MONGO_URL}/nodejs-learning`)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("MongoDB Connection Failed", err);
  });

app.listen(PORT, () => {
  console.log("App is running on ", PORT);
});
