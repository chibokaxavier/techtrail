import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  userId: String,
  courseId: String,
  courses: [
    {
      courseId: String,
      title: String,
      instructorId: String,
      instructorName: String,
      dateOfPurchase: Date,
      courseImage: String,
    },
  ],
});

const Student = mongoose.model("student", StudentSchema);
export default Student;
