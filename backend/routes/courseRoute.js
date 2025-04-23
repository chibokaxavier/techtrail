import express from "express";
import {
  addNewCourse,
  deleteCourse,
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
courseRouter.delete("/delete/:id", authMiddleware, deleteCourse);

export default courseRouter;
