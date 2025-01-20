import Stripe from "stripe";
import User from "../model/userModel.js";
import Order from "../model/orderModel.js";
import dotenv from "dotenv";
import Student from "../model/studentModel.js";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const url = "http://localhost:3000/";

const placeOrder = async (req, res) => {
  try {
    const { courseId, title, price, instructorName, email, userName, image } =
      req.body;
    const user = await User.findById(req.userId);
    const newOrder = new Order({
      userId: req.userId,
      coursePrice: price,
      userEmail: email,
      userName: userName,
      courseTitle: title,
      courseImage: image,
      courseId: courseId,
    });
    await newOrder.save();
    await Student.findByIdAndUpdate(req.userId, {
      $push: {
        courses: {
          courseId,
          title,
          instructorName,
          courseImage,
        },
      },
    });
    const line_items = {
      price_data: {
        currency: "usd",
        product_data: {
          name: title,
        },
        unit_amount: price * 100,
      },
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      success_url: `${url}/checkout-success/${newOrder._id}`,
      cancel_url: `${url}/checkout-failure/${newOrder._id}`,
      customer_email: user.email,
    });

    res.json({ success: true, message: "Successfully paid", session });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};


const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
      if (success) {
        await orderModel.findByIdAndUpdate(orderId, { payment: true });
        res.status(200).json({ success: true, message: "Payment successful" });
      } else {
        await orderModel.findByIdAndDelete(orderId);
        res.status(200).json({ success: false, message: "Payment failed" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Error" });
    }
  };
  