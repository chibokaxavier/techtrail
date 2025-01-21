import express from "express";
import { placeOrder, verifyOrder } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";
// import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();
orderRouter.post("/place", placeOrder);
orderRouter.post("/verify",authMiddleware, verifyOrder);
// orderRouter.get("/get", authMiddleware, fetchOrders);
// orderRouter.get("/list", listOrders);
// orderRouter.post("/status", updateStatus);

export default orderRouter;
