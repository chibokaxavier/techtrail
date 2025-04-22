import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import mediaRouter from "./routes/mediaRoute.js";
import courseRouter from "./routes/courseRoute.js";
import studentRouter from "./routes/studentRoute.js";
import orderRouter from "./routes/orderRoute.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 7000;
const corsOption = {
  origin: [
    "http://localhost:3000",
    "https://techtrail-ruby.vercel.app",
    "https://techtraill.vercel.app",
  ], // Replace with the frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token"],
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
app.use("/api/v1", userRouter);
app.use("/api/v1/media", mediaRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/order", orderRouter);

connectDb();
