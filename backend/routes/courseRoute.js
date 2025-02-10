import express from "express";
import {
  addNewCourse,
  getAllCourses,
  getCourseDetailsById,
  getPaidCourses,
  updateCourseById,
} from "../controllers/courseController.js";

const courseRouter = express.Router();

courseRouter.post("/add", addNewCourse);
courseRouter.get("/get", getAllCourses);
courseRouter.get("/get/details/:id", getCourseDetailsById);
courseRouter.put("/update/:id", updateCourseById);
courseRouter.get("/getPaidCourses", getPaidCourses);

export default courseRouter;
