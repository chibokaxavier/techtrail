import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  userId: String,
  courses: [
    {
      courseId: String,
      title: String,
      instructorId: String,
      instructorName: String,
      dateOfPurchase: { type: Date, default: Date.now() },
      courseImage: String,
    },
  ],
});

const Student = mongoose.model("student", StudentSchema);
export default Student;
