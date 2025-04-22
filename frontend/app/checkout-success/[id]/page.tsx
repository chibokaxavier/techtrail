"use client";
import { useStoreContext } from "@/context/authContext";
import { useStudentContext } from "@/context/studentContext";
import axios from "axios";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
const Page = () => {
  const { id } = useParams();
  const orderId = id;

  const url = "https://techtrail-x074.onrender.com";
  const pathname = usePathname();
 
  const { token } = useStoreContext();
  const {  globalParamId } = useStudentContext();

  useEffect(() => {
    const verifyOrder = async () => {
      console.log(globalParamId);
      try {
        const res = await axios.post(
          url + "/api/v1/order/verify",
          {
            orderId,
            success: true,
            courseId: globalParamId,
          },
          {
            headers: { token },
          }
        );
        if (res.data.success) {
          // router.push("/courses");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (pathname.includes("/checkout-success")) {
      verifyOrder();
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="p-10 bg-white rounded-lg shadow-lg text-center max-w-md w-full">
        <FaCheckCircle className="text-green-500 text-6xl animate-bounce mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your payment was successfully processed.
        </p>

        <Link href={`/courses/${globalParamId}`}>
          <button className="w-full px-6 py-3 text-white bg-green-500 rounded-md shadow-lg hover:bg-green-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">
            Continue Learning
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
