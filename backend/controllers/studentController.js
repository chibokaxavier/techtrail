import Course from "../model/courseModel.js";

const getAllStudentCourses = async (req, res) => {
  try {
    const courseList = await Course.find({});
    if (courseList.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Courses not found", data: [] });
    }
    res
      .status(200)
      .json({ success: true, message: "Courses found", data: courseList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some Error occured" });
  }
};

const getStudentCoursesDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const courseDetails = await Course.findById(id);
    if (!courseDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found", data: null });
    }
    res
      .status(200)
      .json({ success: true, message: "Course found", data: courseDetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some Error occured" });
  }
};

export { getAllStudentCourses, getStudentCoursesDetails };
