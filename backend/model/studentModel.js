import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  userId: String,
  courses: [
    {
      courseId: String,
      title: String,
      instructorName: String,
      dateOfPurchase: { type: Date, default: Date.now() },
      image: String,
      paid: { type: Boolean, default: false },
    },
  ],
});

const Student = mongoose.model("student", StudentSchema);
export default Student;
