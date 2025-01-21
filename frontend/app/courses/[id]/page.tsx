"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VideoPlayer from "@/components/VideoPlayer";
import { useStoreContext } from "@/context/authContext";
import { useStudentContext } from "@/context/studentContext";
import axios from "axios";
import { CheckCircle, Globe, Lock, PlayCircle } from "lucide-react";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect, useState } from "react";
const page = ({ params }: { params: { id: number } }) => {
  const [courseDetail, setCourseDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { auth } = useStoreContext();
  const { setGlobalParamId, globalParamId } = useStudentContext();
  const [paymentLoading, setPaymentLoading] = useState(false);
  const userId = auth?.user?._id;

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
      } else {
        setCourseDetail(null);
        setLoading(false);
      }
    } catch (error) {
      setCourseDetail(null);
      setLoading(false);
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

  useEffect(() => {
    fetchCourseDetails();
    localStorage.setItem("globalParamId", params.id.toString());
    console.log(params.id);
    setGlobalParamId(params.id.toString());
    console.log(globalParamId);
  }, []);

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

  const freePreviewItem = courseDetail?.curriculum?.find(
    (item: any) => item.freePreview
  );

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
                    <li className="flex items-start" key={i}>
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
              {courseDetail?.curriculum?.map(
                (curriculumItem: any, i: number) => (
                  <li
                    key={i}
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
                )
              )}
            </CardContent>
          </Card>
        </main>
        <aside className="w-full md:w-[500px]">
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <div className="aspect-video mb-4 rounded-lg flex items-center justify-center">
                {freePreviewItem ? (
                  <VideoPlayer
                    width="450px"
                    height="200px"
                    url={freePreviewItem.videoUrl}
                  />
                ) : (
                  <p>No preview available</p>
                )}
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">
                  ${courseDetail?.price}
                </span>
              </div>
              <Button
                className="w-full"
                disabled={loading}
                onClick={placeOrder}
              >
                {loading ? <ProgressSpinner /> : "  Buy Now"}
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
};

export default page;
