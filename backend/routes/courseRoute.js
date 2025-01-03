import express from "express";
import {
  addNewCourse,
  getAllCourses,
  getCourseDetailsById,
  updateCourseById,
} from "../controllers/courseController.js";

const courseRouter = express.Router();

courseRouter.post("/add", addNewCourse);
courseRouter.get("/get", getAllCourses);
courseRouter.get("/get/details/:id", getCourseDetailsById);
courseRouter.put("/update/:id", updateCourseById);

export default courseRouter;
