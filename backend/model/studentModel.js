import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  courses: [
    {
      courseId: { type: String, required: true },
      title: String,
      instructorName: String,
      image: String,
      paid: { type: Boolean, default: false },
    },
  ],
});


const Student = mongoose.model("student", StudentSchema);
export default Student;
