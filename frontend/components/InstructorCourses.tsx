"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { DeleteIcon, Edit } from "lucide-react";
import { Toast } from "primereact/toast";
import Link from "next/link";
import axios from "axios";
import { useStoreContext } from "@/context/authContext";

interface CourseProps {
  _id: string;
  instructorId: string;
  instructorName: string;
  date: string;
  title: string;
  category: string;
  level: string;
  language: string;
  subtitle: string;
  image: string;
  description: string;
  welcomeMessage: string;
  price: string;
  objectives: string;
  students: [
    {
      studentId: string;
      studentName: string;
      StudentEmail: string;
    }
  ];
  curriculum: {
    title: string;
    videoUrl: string;
    preview: boolean;
    public_id: string;
  }[];
  isPublished: boolean;
}

const InstructorCourses = () => {
  const [courseList, setCourseList] = useState([]);
    const { token } = useStoreContext();
  const toast = useRef<Toast>(null);
  const {
    setCurriculumFormData,
    setFormData,

    setCurrentEditedCourseId,
  } = useStoreContext();

  const resetForm = () => {
    setCurrentEditedCourseId(null);
    setCurriculumFormData([
      {
        title: "",
        videoUrl: "",
        freePreview: false,
        public_id: "",
      },
    ]);
    setFormData({
      title: "",
      category: "",
      level: "",
      language: "",
      subtitle: "",
      description: "",
      price: "",
      objectives: "",
      welcomeMessage: "",
      image: "",
    });
  };

  const fetchCourses = async () => {
    const res = await axios.get(
      "https://techtrail-x074.onrender.com/api/v1/course/get"
    );
    if (res.data.success) {
      console.log(res.data.data);
      setCourseList(res.data.data);
    }
  };

  const showSuccess = (message: string) => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: message,
      life: 3000,
    });
  };
  const showError = (message: string) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: message,
      life: 3000,
    });
  };

  const deleteCourse = async (id: string) => {
    try {
      const res = await axios.delete(
        `https://techtrail-x074.onrender.com/api/v1/course/delete/${id}` , {
          headers: { token },
        }
      );
      if (res.data.success) {
        showSuccess(res.data.message);

        console.log(res.data);
      } else {
        showError(res.data.message);
      }
    } catch (error: unknown) {
      console.error("Error occurred:", error);
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          console.log(
            "Error response from server:",
            error.response.data.message
          );
          showError(error.response.data.message);
        }
      } else {
        console.log("Unknown error occurred");
        showError("An unexpected error occurred.");
      }
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Card className="bg-black text-white">
      <Toast ref={toast} position="bottom-right" />
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-extrabold ">All Courses</CardTitle>
        <Link href={"/instructor/add-new-course"}>
          {" "}
          <Button className="p-6" onClick={resetForm}>
            Create new course
          </Button>
        </Link>
      </CardHeader>

      <CardContent className="">
        {" "}
        <Table>
          <TableCaption>A list of your courses</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courseList && courseList.length > 0
              ? courseList.map((course: CourseProps, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {course?.title}
                    </TableCell>
                    <TableCell>{course?.students?.length}</TableCell>
                    <TableCell> ${course?.price}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`instructor/edit-course/${course._id}`}>
                        <Button variant="ghost" size="sm">
                          <Edit />
                        </Button>{" "}
                      </Link>

                      <Button
                        variant="destructive"
                        onClick={() => deleteCourse(course._id)}
                        size="sm"
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : ""}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
      {/* <CardFooter>
        <Button></Button>
      </CardFooter> */}
    </Card>
  );
};

export default InstructorCourses;
