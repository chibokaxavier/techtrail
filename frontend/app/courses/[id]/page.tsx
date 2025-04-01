"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VideoPlayer from "@/components/VideoPlayer";
import {   useStoreContext } from "@/context/authContext";
import { CourseList, useStudentContext } from "@/context/studentContext";
import axios from "axios";
import { CheckCircle, Globe, Lock, PlayCircle } from "lucide-react";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect, useState } from "react";
import { FaVideo } from "react-icons/fa";



const Page = ({ params }: { params: { id: number } }) => {
  const [courseDetail, setCourseDetail] = useState<CourseList>({
    _id: "",
    id: "",
    instructorId: "",
    instructorName: "",
    title: "",
    category: "",
    level: "",
    language: "",
    subtitle: "",
    image: "",
    description: "",
    welcomeMessage: "",
    price: "",
    objectives: "",
    students: [
      {
        studentId: "",
        studentName: "",
        StudentEmail: "",
      },
    ],
    curriculum: [
      { title: "", videoUrl: "", freePreview: false, public_id: "" },
    ],
  });
  const [loading, setLoading] = useState(true);
  const { auth } = useStoreContext();
  const { setGlobalParamId, globalParamId } = useStudentContext();
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const userId = auth?.user?._id;
  const [mainVid, setMainVid] = useState("");
  const [mainTitle, setMainTitle] = useState("");

  const fetchCourseDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:4000/api/v1/student/get/detail/${params.id}`,
        { userId: userId }
      );

      if (res.data.success) {
        setCourseDetail(res.data.data);
        setLoading(false);
        if (res.data.paid) {
          setPaid(true);
          console.log(paid, "paid");
        }
      } else {
        setCourseDetail({
          _id: "",
          id: "",
          instructorId: "",
          instructorName: "",
          title: "",
          category: "",
          level: "",
          language: "",
          subtitle: "",
          image: "",
          description: "",
          welcomeMessage: "",
          price: "",
          objectives: "",
          students: [
            {
              studentId: "",
              studentName: "",
              StudentEmail: "",
            },
          ],
          curriculum: [
            { title: "", videoUrl: "", freePreview: false, public_id: "" },
          ],
        });
        setLoading(false);
      }
    } catch (error) {
      setCourseDetail({
        _id: "",
        id: "",
        instructorId: "",
        instructorName: "",
        title: "",
        category: "",
        level: "",
        language: "",
        subtitle: "",
        image: "",
        description: "",
        welcomeMessage: "",
        price: "",
        objectives: "",
        students: [
          {
            studentId: "",
            studentName: "",
            StudentEmail: "",
          },
        ],
        curriculum: [
          { title: "", videoUrl: "", freePreview: false, public_id: "" },
        ],
      });
      setLoading(false);
      console.log(error);
    }
  };

  const placeOrder = async () => {
    console.log(auth?.user?.email);

    setPaymentLoading(true);
    const orderData = {
      courseId: params.id,
      userId: auth?.user?._id,
      title: courseDetail.title,
      price: courseDetail.price,
      instructorName: courseDetail.instructorName,
      email: auth?.user?.email,
      image: courseDetail.image,
    };
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/order/place",
        orderData
      );
      console.log(res.data);
      if (res.data.session.url) {
        setPaymentLoading(false);

        window.location.href = res.data.session.url;
      }
      if (res.data.success) {
        // localStorage.removeItem("cartItems");
        setPaymentLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const freePreviewItem = courseDetail?.curriculum?.find(
    (item) => item.freePreview
  );

  useEffect(() => {
    fetchCourseDetails();
    localStorage.setItem("globalParamId", params.id.toString());
    console.log(params.id);
    setGlobalParamId(params.id.toString());
    console.log(globalParamId);
  }, []);

  useEffect(() => {
    if (freePreviewItem) {
      setMainVid(freePreviewItem.videoUrl);
    }
  }, [freePreviewItem]);

  if (loading) {
    return (
      <div className="animate-pulse max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Header Section Skeleton */}
        <div className="bg-gray-300 h-36 rounded-t-lg mb-4"></div>

        {/* Main Content Skeleton */}
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          {/* Main Section */}
          <main className="flex-grow space-y-6">
            {/* What You Will Learn Skeleton */}
            <div className="bg-gray-200 rounded-lg p-4 space-y-4">
              <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            </div>

            {/* Course Curriculum Skeleton */}
            <div className="bg-gray-200 rounded-lg p-4 space-y-4">
              <ul className="space-y-2">
                {Array(4)
                  .fill("")
                  .map((_, index) => (
                    <li
                      key={index}
                      className="flex items-center bg-gray-300 rounded-lg h-12 px-4"
                    ></li>
                  ))}
              </ul>
            </div>
          </main>

          {/* Sidebar Skeleton */}
          <aside className="w-full md:w-[500px] space-y-4">
            <div className="bg-gray-200 rounded-lg p-6">
              {/* Video Placeholder */}
              <div className="aspect-video bg-gray-300 rounded-lg mb-4"></div>

              {/* Price Placeholder */}
              <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>

              {/* Button Placeholder */}
              <div className="h-10 bg-gray-300 rounded w-full"></div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 mt-20 lg:px-8 py-4">
      <div className="bg-black  p-8 rounded-lg ">
        <h1 className="text-3xl text-white font-bold mb-4">
          {courseDetail?.title}
        </h1>
        <p className="text-xl mb-4 text-white">{courseDetail?.subtitle}</p>
        <div className="flex lg:flex-row flex-col  lg:items-center lg:space-x-4 text-white mt-2 text-sm">
          <span> By {courseDetail?.instructorName}</span>

          {/* <span>Created on {courseDetail?.date.split("T")[0]}</span> */}

          <span className="flex items-center capitalize">
            {" "}
            <Globe className="mr-1 h-4 w-4 " /> {courseDetail?.language}{" "}
          </span>
          <span>
            {courseDetail?.students.length}{" "}
            {courseDetail?.students.length <= 1 ? "Student" : "Students"}{" "}
          </span>
          <span className="flex lg:justify-center gap-1 items-center">
            <FaVideo /> {courseDetail?.curriculum?.length}{" "}
            {courseDetail?.curriculum?.length <= 1 ? "Video" : "Videos"}
          </span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <main className="flex-grow">
          <Card className="mb-8 bg-black text-white border-0">
            <CardHeader>
              <CardTitle>What you will learn in this course</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {courseDetail?.objectives
                  .split(",")
                  .map((objective: string, i: number) => (
                    <li className="flex items-start" key={i}>
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink" />
                      <span>{objective}</span>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="mb-8 bg-black text-white border-0">
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
            </CardHeader>
            <CardContent>
              {courseDetail?.curriculum?.map(
                (curriculumItem, i: number) => (
                  <li
                    key={i}
                    onClick={() => {
                      setMainVid(curriculumItem?.videoUrl);
                      setMainTitle(curriculumItem?.title);
                    }}
                    className={`${
                      curriculumItem?.freePreview || paid
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
                    } flex items-center mb-4`}
                  >
                    {curriculumItem?.freePreview ? (
                      <PlayCircle
                        className={`${
                          mainTitle === curriculumItem?.title
                            ? "text-blue-600"
                            : ""
                        } mr-2 size-4 hover:scale-150 transition-all duration-300 ease-in-out`}
                      />
                    ) : paid ? (
                      <PlayCircle
                        className={`${
                          mainTitle === curriculumItem?.title
                            ? "text-blue-600"
                            : ""
                        } mr-2 size-4 hover:scale-150 transition-all duration-300 ease-in-out`}
                      />
                    ) : (
                      <Lock
                        className={`${
                          mainTitle === curriculumItem?.title
                            ? "text-blue-600"
                            : ""
                        } mr-2 size-4 hover:scale-150 transition-all duration-300 ease-in-out`}
                      />
                    )}{" "}
                    <span
                      className={`${
                        mainTitle === curriculumItem?.title
                          ? "text-blue-600"
                          : ""
                      }`}
                    >
                      {curriculumItem?.title}
                    </span>
                  </li>
                )
              )}
            </CardContent>
          </Card>
        </main>
        <aside className="w-full md:w-[500px]">
          <Card className="sticky top-4 bg-black border-0">
            <CardContent className="p-6">
              <div className="aspect-video mb-4 rounded-lg flex items-center justify-center">
                {freePreviewItem ? (
                  <VideoPlayer width="450px" height="200px" url={mainVid} />
                ) : (
                  <p>No preview available</p>
                )}
              </div>

              {!paid ? (
                <>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">
                      ${courseDetail?.price}
                    </span>
                  </div>
                  <Button
                    className="w-full"
                    disabled={paymentLoading}
                    onClick={placeOrder}
                  >
                    {paymentLoading ? <ProgressSpinner /> : "  Buy Now"}
                  </Button>
                </>
              ) : (
                <span>{mainTitle}</span>
              )}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
};

export default Page;
