"use client";
import { Button } from "@/components/ui/button";
import { courseCategories } from "@/config/utils";
import { useStudentContext } from "@/context/studentContext";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const { setStudentCourseList, studentCourseList,globalParamId } = useStudentContext();

  const fetchStudentCourses = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/student/get");
      if (res.data.success) {
        setStudentCourseList(res.data.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchStudentCourses();
  }, []);
  console.log(globalParamId);
  return (
    <div className="min-h-screen bg-white  max-w-screen-xl mx-auto px-4  py-5 sm:px-6 lg:px-8 ">
      <section className="flex flex-col lg:flex-row items-center justify-between py-8  ">
        <div className="lg:w-1/2 lg:pr-12">
          <h1 className="text-5xl font-bold mb-4">Unlock Your Potential</h1>
          <p className="text-xl">
            Empower yourself with skills that matter. Begin your journey with us
            now.
          </p>
        </div>
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <img
            src="/programmer.svg"
            width={600}
            height={400}
            className="w-full  h-auto rounded-lg "
            alt="programmer"
          />
        </div>
      </section>
      <section className="py-8 px-4 lg:px-8 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Course Categories</h2>
        <div className="grid grid-grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {courseCategories.map((category) => (
            <Button className="" key={category.id}>
              {category.label}
            </Button>
          ))}
        </div>
      </section>
      <section className="py-12 ">
        <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-6">
          {studentCourseList && studentCourseList.length > 0
            ? studentCourseList.map((course: any, i: number) => (
              <Link href={`/courses/${course._id}`}>
               <div
                  className="border rounded-lg overflow-hidden shadow cursor-pointer"
                  key={i}
                >
                  <img
                    src={course.image}
                    alt="image"
                    height={150}
                    width={300}
                    className="w-full h-40 object-cover"
                  />{" "}
                  <div className="p-4 ">
                    <h3 className="mb-2 font-bold">{course?.title}</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      {course?.instructorName}
                    </p>
                    <p className="font-bold text-[16px]">${course?.price}</p>
                  </div>
                </div>
              </Link>
               
              ))
            : "No courses found"}
        </div>
      </section>
    </div>
  );
}
