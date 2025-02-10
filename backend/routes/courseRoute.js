import express from "express";
import {
  addNewCourse,
  getAllCourses,
  getCourseDetailsById,
  getPaidCourses,
  updateCourseById,
} from "../controllers/courseController.js";
import authMiddleware from "../middleware/auth.js";

const courseRouter = express.Router();

courseRouter.post("/add", addNewCourse);
courseRouter.get("/get", getAllCourses);
courseRouter.get("/get/details/:id", getCourseDetailsById);
courseRouter.put("/update/:id", updateCourseById);
courseRouter.get("/getPaidCourses", authMiddleware, getPaidCourses);

export default courseRouter;
