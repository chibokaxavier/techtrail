import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  instructorId: String,
  instructorName: String,
  date: Date,
  title: String,
  category: String,
  level: String,
  primaryLanguage: String,
  subtitle: String,
  image: String,
  description: String,
  welcomeMessage: String,
  price: String,
  objectives: String,
  students: [
    {
      studentId: String,
      studentName: String,
      StudentEmail: String,
    },
  ],
});

const Course = mongoose.model("Course", CourseSchema);
export default Course;
