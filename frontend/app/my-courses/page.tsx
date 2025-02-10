"use client";
import { useStoreContext } from "@/context/authContext";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [courseLoading, setCourseLoading] = useState(false);
  const [paidCourses, setPaidCourses] = useState([]);
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

  return <div>page</div>;
};

export default page;
