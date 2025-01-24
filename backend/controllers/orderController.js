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
    const {
      courseId,
      title,
      price,
      instructorName,
      userId,
      email,
      userName,
      image,
    } = req.body;
    const user = await User.findById(userId);
    // console.log(user);
    const newOrder = new Order({
      userId: userId,
      coursePrice: price,
      userEmail: email,
      instructorName: userName,
      courseTitle: title,
      courseImage: image,
      courseId: courseId,
    });

    await newOrder.save();

    // const studentChecker = await Student.findOne({userId});
    // if (studentChecker) {
    //   await Student.findByIdAndUpdate(userId, {
    //     $push: {
    //       courses: {
    //         courseId,
    //         title,
    //         instructorName,
    //         image,
    //       },
    //     },
    //   });
    // } else {
    //   const newOrderStudent = new Student({
    //     userId: userId, // Assuming req.userId is set correctly
    //     courses: [
    //       {
    //         courseId,
    //         title,
    //         instructorName,
    //         image,
    //       },
    //     ],
    //   });
    //   await newOrderStudent.save();
    // }
    await Student.findOneAndUpdate(
      { userId },
      {
        $push: {
          courses: {
            courseId,
            title,
            instructorName,
            image,
          },
        },
      },
      { upsert: true, new: true }
    );
    const line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: title,
          },
          unit_amount: price * 100,
        },
        quantity: 1, // Make sure to include quantity
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      success_url: `${url}/checkout-success/${newOrder._id}`,
      cancel_url: `${url}/checkout-failure/${newOrder._id}`,
      customer_email: user.email,
    });

    res.json({ success: true, message: "Payment in progress", session });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success, courseId } = req.body;
  const user = req.user;
  const userId = req.userId; // Assuming you have middleware to set `req.userId`


  try {
    if (success) {
      // Mark the order as paid
      await Order.findByIdAndUpdate(orderId, { payment: true });

      // Update the `paid` field for the course in the `courses` array
      const updatedStudent = await Student.findOneAndUpdate(
        { userId, "courses.courseId": courseId }, // Match userId and courseId
        {
          $set: { "courses.$.paid": true }, // Update the `paid` field for the specific course
        },
        { new: true } // Return the updated document
      );

      if (!updatedStudent) {
        // If no match is found, handle the case
        return res.status(404).json({
          success: false,
          message: "Student or course not found",
        });
      }

      res.status(200).json({ success: true, message: "Payment successful" });
    } else {
      // If payment failed, delete the order
      await Order.findByIdAndDelete(orderId);
      res.status(200).json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.error("Error in verifyOrder:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export { placeOrder, verifyOrder };
