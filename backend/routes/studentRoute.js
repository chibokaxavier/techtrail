import express from "express";
import {
  getAllStudentCourses,
  getStudentCoursesDetails,
} from "../controllers/studentController.js";

const studentRouter = express.Router();

studentRouter.get("/get", getAllStudentCourses);
studentRouter.post("/get/detail/:id", getStudentCoursesDetails);

export default studentRouter;
