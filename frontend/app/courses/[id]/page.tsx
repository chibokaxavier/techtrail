"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
const page = ({ params }: { params: { id: number } }) => {
  const [courseDetail, setCourseDetail] = useState(null);
  const fetchCourseDetails = async () => {
    const res = await axios.get(
      `http://localhost:4000/api/v1/student/get/detail/${params.id}`
    );

    if (res.data.success) {
      setCourseDetail(res.data.data);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4"></div>
  );
};

export default page;
