import express from "express";
import {
  fetchOrders,
  placeOrder,
  verifyOrder,
  listOrders,
  updateStatus,
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();
orderRouter.post("/place", authMiddleware, placeOrder);
// orderRouter.post("/verify", verifyOrder);
// orderRouter.get("/get", authMiddleware, fetchOrders);
// orderRouter.get("/list", listOrders);
// orderRouter.post("/status", updateStatus);

export default orderRouter;
