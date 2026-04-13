"use client";
import React, { useEffect, useState } from "react";
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
import { toast } from "sonner";
import Link from "next/link";
import axiosInstance from "@/api/axiosInstance";
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
    const res = await axiosInstance.get(
      "/api/v1/course/get"
    );
    if (res.data.success) {
      console.log(res.data.data);
      setCourseList(res.data.data);
    }
  };


  const deleteCourse = async (id: string) => {
    try {
      const res = await axiosInstance.delete(
        `/api/v1/course/delete/${id}` , {
          headers: { token },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);

        console.log(res.data);
      } else {
        toast.error(res.data.message);
      }
    } catch (error: unknown) {
      console.error("Error occurred:", error);
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          console.log(
            "Error response from server:",
            error.response.data.message
          );
          toast.error(error.response.data.message);
        }
      } else {
        console.log("Unknown error occurred");
        toast.error("An unexpected error occurred.");
      }
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Card className="bg-white/[0.02] border-white/10 backdrop-blur-md rounded-2xl text-white shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-6">
        <div>
          <CardTitle className="text-3xl font-black tracking-tight mb-2">My Courses</CardTitle>
          <p className="text-gray-400 text-sm">Manage your published and draft courses</p>
        </div>
        <Link href={"/instructor/add-new-course"}>
          <Button 
            onClick={resetForm}
            className="mt-4 sm:mt-0 h-12 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all active:scale-[0.98] border-0"
          >
            Create New Course
          </Button>
        </Link>
      </CardHeader>

      <CardContent className="pt-6 overflow-x-auto">
        <Table>
          <TableCaption className="text-gray-500 mt-4">A complete list of your created courses</TableCaption>
          <TableHeader>
            <TableRow className="border-white/5 hover:bg-white/[0.02]">
              <TableHead className="text-gray-400 font-semibold h-12">Course Title</TableHead>
              <TableHead className="text-gray-400 font-semibold h-12">Students</TableHead>
              <TableHead className="text-gray-400 font-semibold h-12">Revenue</TableHead>
              <TableHead className="text-right text-gray-400 font-semibold h-12">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courseList && courseList.length > 0 ? (
              courseList.map((course: CourseProps, index: number) => (
                <TableRow key={index} className="border-white/5 hover:bg-white/[0.02] transition-colors">
                  <TableCell className="font-medium text-white py-4 flex items-center gap-3">
                     <span className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden">
                        {course.image ? (
                           <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                        ) : (
                           <span className="text-blue-500 text-xs font-bold font-mono">IMG</span>
                        )}
                     </span>
                     {course?.title}
                  </TableCell>
                  <TableCell className="text-gray-300">{course?.students?.length}</TableCell>
                  <TableCell className="text-gray-300 font-mono">${course?.price}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                       <Link href={`/instructor/edit-course/${course._id}`}>
                         <Button variant="ghost" size="sm" className="h-9 w-9 p-0 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 rounded-lg">
                           <Edit className="w-4 h-4" />
                         </Button>
                       </Link>
   
                       <Button
                         variant="ghost"
                         onClick={() => deleteCourse(course._id)}
                         size="sm"
                         className="h-9 w-9 p-0 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-lg"
                       >
                         <DeleteIcon className="w-4 h-4" />
                       </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableCell colSpan={4} className="h-32 text-center text-gray-500">
                   No courses found. Time to create your first trail!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default InstructorCourses;
