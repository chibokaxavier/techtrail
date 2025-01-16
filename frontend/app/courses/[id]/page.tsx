"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VideoPlayer from "@/components/VideoPlayer";
import axios from "axios";
import { CheckCircle, Globe, Lock, PlayCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
const page = ({ params }: { params: { id: number } }) => {
  const [courseDetail, setCourseDetail] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const fetchCourseDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:4000/api/v1/student/get/detail/${params.id}`
      );

      if (res.data.success) {
        setCourseDetail(res.data.data);
        setLoading(false);
      } else {
        setCourseDetail(null);
        setLoading(false);
      }
    } catch (error) {
      setCourseDetail(null);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4 ">
        {/* Header Skeleton */}
        <div className="h-64 bg-gray-300 w-full"></div>

        {/* Body Skeleton */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>

          {/* Text Block */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>

          {/* Instructor */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>

          {/* Course Info */}
          <div className="flex flex-wrap gap-4">
            {Array(3)
              .fill("")
              .map((_, index) => (
                <div
                  key={index}
                  className="flex-1 p-4 bg-gray-200 rounded-lg h-20"
                ></div>
              ))}
          </div>

          {/* Curriculum Skeleton */}
          <div className="space-y-2">
            {Array(3)
              .fill("")
              .map((_, index) => (
                <div
                  key={index}
                  className="flex justify-between bg-gray-200 p-4 rounded-lg shadow-sm h-12"
                ></div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  const freePreviewItem = courseDetail?.curriculum?.find(
    (item: any) => item.freePreview
  );
  console.log(freePreviewItem);
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="bg-gray-600 text-white p-8 rounded-t-lg ">
        <h1 className="text-3xl font-bold mb-4">{courseDetail?.title}</h1>
        <p className="text-xl mb-4">{courseDetail?.subtitle}</p>
        <div className="flex items-center space-x-4 mt-2 text-sm">
          <span>Created by {courseDetail?.instructorName}</span>
          <span>Created on {courseDetail?.date.split("T")[0]}</span>
          <span className="flex items-center capitalize">
            {" "}
            <Globe className="mr-1 h-4 w-4 " /> {courseDetail?.language}{" "}
          </span>
          <span>
            {courseDetail?.students.length}{" "}
            {courseDetail?.students.length <= 1 ? "Student" : "Students"}{" "}
          </span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <main className="flex-grow">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What you will learn in this course</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {courseDetail?.objectives
                  .split(",")
                  .map((objective: any, i: number) => (
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink" />
                      <span>{objective}</span>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
            </CardHeader>
            <CardContent>
              {courseDetail?.curriculum?.map((curriculumItem: any) => (
                <li
                  className={`${
                    courseDetail?.freePreview
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  } flex items-center mb-4`}
                >
                  {curriculumItem?.freePreview ? (
                    <PlayCircle className="mr-2 size-4" />
                  ) : (
                    <Lock className="mr-2 size-4" />
                  )}{" "}
                  <span>{curriculumItem?.title}</span>
                </li>
              ))}
            </CardContent>
          </Card>
        </main>
        <aside className="w-full md:w-[500px]">
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <div className="aspect-video mb-4 rounded-lg flex items-center justify-center">
                {freePreviewItem ? (
                  <VideoPlayer 
                    width="100%"
                    height="100%"
                    url={freePreviewItem.videoUrl}
                  />
                ) : (
                  <p>No preview available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
};

export default page;
