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
    const user = await User.findById(req.userId);
    const newOrder = new Order({
      userId: req.userId,
      coursePrice: req.body.price,
      userEmail: req.body.email,
      userName: req.body.userName,
      courseTitle: req.body.title,
      courseImage: req.body.image,
      courseId: req.body.courseId,
    });
    await newOrder.save();
    await Student.findByIdAndUpdate(req.userId, {
        
    } );
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

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
