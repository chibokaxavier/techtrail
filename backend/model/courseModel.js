import mongoose from "mongoose";

const LectureSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  preview: Boolean,
  public_id: String,
});

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
  curriculum: [LectureSchema],
  isPublished: Boolean,
});

const Course = mongoose.model("Course", CourseSchema);
export default Course;
