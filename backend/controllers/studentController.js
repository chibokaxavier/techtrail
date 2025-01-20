import Course from "../model/courseModel.js";
import Student from "../model/studentModel.js";

const getAllStudentCourses = async (req, res) => {
  try {
    const {
      category = [],
      level = [],
      language = [],
      sortBy = "price-lowtohigh",
    } = req.query;
    let filter = {};
    if (category.length) {
      filter.category = { $in: category.split(",") };
    }
    if (level.length) {
      filter.level = { $in: level.split(",") };
    }
    if (language.length) {
      filter.language = { $in: language.split(",") };
    }
    let sortParams = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sortParams.price = 1;
        break;
      case "price-hightolow":
        sortParams.price = -1;
        break;
      case "title-atoz":
        sortParams.title = 1;
        break;
      case "title-ztoa":
        sortParams.title = -1;
        break;

      default:
        sortParams.pricing = 1;
        break;
    }
    const courseList = await Course.find(filter).sort(sortParams);
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

// const getStudentCoursesDetails = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const courseDetails = await Course.findById(id);

//     if (!courseDetails) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Course not found", data: null });
//     }
//     res
//       .status(200)
//       .json({ success: true, message: "Course found", data: courseDetails });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Some Error occured" });
//   }
// };

const getStudentCoursesDetails = async (req, res) => {
  try {
    const { id } = req.params; // Extract courseId from params
    const { userId } = req.body; // Currently logged-in user's ID
    console.log(id);

    // Fetch course details from the Course model
    const courseDetails = await Course.findById(id);

    // Check if course exists in the database
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
        data: null,
      });
    }

    // Check if the course exists in the logged-in user's courses array
    const student = await Student.findOne({
      userId: userId,
      "courses.courseId": id,
    });

    if (!student) {
      return res.status(200).json({
        success: true,
        message: "You do not have access to this course",
        data: courseDetails,
        paid: false,
      });
    }

    // If both checks pass, return the course details
    res.status(200).json({
      success: true,
      message: "Course found",
      data: courseDetails,
      paid: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};
export { getAllStudentCourses, getStudentCoursesDetails };
