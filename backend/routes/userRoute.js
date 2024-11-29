import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/checkStatus", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export default userRouter;
