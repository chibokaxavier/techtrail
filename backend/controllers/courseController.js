import Course from "../model/courseModel.js";

const addNewCourse = async (req, res) => {
  try {
    const courseData = req.body;
    const newlyCreatedCourse = new Course(courseData);
    const savedCourse = await newlyCreatedCourse.save();
    if (savedCourse) {
      res.status(201).json({
        success: true,
        message: "Course saved successfully",
        data: savedCourse,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some Error occured" });
  }
};
const getAllCourses = async (req, res) => {
  try {
    const courseList = await Course.find({});
    res.status(200).json({ success: true, data: courseList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some Error occured" });
  }
};

const getCourseDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const courseDetails = await Course.findById(id);
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    res.status(200).json({
      success: true,
      data: courseDetails,
      message: "Course fetched succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some Error occured" });
  }
};

const updateCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourseData = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      updatedCourseData,
      { $set: req.body, new: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    res.status(200).json({
      success: true,
      data: updatedCourse,
      message: "Course updated succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some Error occured" });
  }
};

export { getAllCourses, updateCourseById, getCourseDetailsById, addNewCourse };
