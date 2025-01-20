import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: String,
  userEmail: String,
  userName: String,
  status: { type: String, default: "Payment initiated" },
  coursePrice: Number,
  courseTitle: String,
  courseImage: String,
  courseId: String,
  date: { type: Date, default: Date.now() },
  payment: Boolean,
});

const Order = mongoose.model("order", OrderSchema);
export default Order;
