"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useStoreContext } from "@/context/authContext";
import { useStudentContext } from "@/context/studentContext";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const [courseLoading, setCourseLoading] = useState(false);
  const [paidCourses, setPaidCourses] = useState([]);
   const {
      setStudentCourseList,
      studentCourseList,
      filteredCourses,
      setFilteredCourses,
    } = useStudentContext();
  const { token } = useStoreContext();
  const fetchPaidCourses = async () => {
    setCourseLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:4000/api/v1/course/getPaidCourses`,
        {
          headers: { token },
        }
      );
      console.log(res.data);
      if (res.data.success) {
        setPaidCourses(res.data.data);
        setCourseLoading(false);
      }
    } catch (error) {
      setPaidCourses([]);
      console.log(paidCourses);
      setCourseLoading(false);
      console.error(error);
    }
  };
  useEffect(() => {
    fetchPaidCourses();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-0 mt-20 py-4">
      {" "}
      <main className=" py-4">
        <div className="flex justify-end items-center mb-4 gap-5">
          <span className="text-sm text-white font-bold">
            {paidCourses?.length} Results
          </span>
        </div>
        <div className="space-y-4">
          {paidCourses && paidCourses.length > 0 ? (
            paidCourses.map((course: any, i: number) => (
              <Link href={`/courses/${course._id}`}>
              <div className="bg-black rounded-md">
                <Card className="cursor-pointer text-white bg-inherit border-0 my-2" key={course.id} >
                  <CardContent className="flex gap-4 p-4">
                    <div className="w-48 h-32 flex-shrink-0">
                      <img
                        src={course.image}
                        alt="course-image"
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {course.title}
                      </CardTitle>
                      <p className="text-sm  mb-1">
                        Created by{" "}
                        <span className="font-bold">
                          {course?.instructorName}
                        </span>
                      </p>
                      <p className="text-18  mt-3 mb-2">
                        {`${course?.curriculum?.length} ${course?.curriculum?.length <= 1
                          ? "Lecture"
                          : "Lectures"
                          } - ${course?.level.toUpperCase()} Level`}
                      </p>
                      <p className="font-bold text-lg">${course?.price}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

            </Link>
            ))
          ) : courseLoading ? (
            <>
              <div className=" h-40 bg-gray-100 animate-pulse duration-900 rounded"></div>
              <div className=" h-40 bg-gray-100 animate-pulse duration-900 rounded"></div>
              <div className=" h-40 bg-gray-100 animate-pulse duration-900 rounded"></div>
              <div className=" h-40 bg-gray-100 animate-pulse duration-900 rounded"></div>
              <div className=" h-40 bg-gray-100 animate-pulse duration-900 rounded"></div>
            </>
          ) : (
            <h1 className="font-extrabold text-4xl">No courses found</h1>
          )}
        </div>
      </main>
    </div>
  );
};

export default page;
