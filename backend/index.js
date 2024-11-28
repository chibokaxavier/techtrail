import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 7000;
const corsOption = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
};
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongoose connected to the database");
    app.listen(port, () => {
      console.log(`listening on ${port}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};
app.use(express.json());
app.use(cors(corsOption));
connectDb();
