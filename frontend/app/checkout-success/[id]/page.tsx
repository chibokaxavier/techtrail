"use client";
import { useStoreContext } from "@/context/authContext";
import { useStudentContext } from "@/context/studentContext";
import axiosInstance from "@/api/axiosInstance";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

const Page = () => {
  const { id } = useParams();
  const orderId = id;
  const pathname = usePathname();
  const { token } = useStoreContext();
  const { globalParamId } = useStudentContext();

  useEffect(() => {
    const verifyOrder = async () => {
      try {
        const res = await axiosInstance.post(
          "/api/v1/order/verify",
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
          // Success handling if needed
        }
      } catch (error) {
        console.error("Order verification failed:", error);
      }
    };

    if (pathname.includes("/checkout-success") && orderId && globalParamId && token) {
      verifyOrder();
    }
  }, [globalParamId, orderId, pathname, token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#050505] text-white">
      <div className="p-10 bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-3xl shadow-2xl text-center max-w-md w-full">
        <FaCheckCircle className="text-emerald-500 text-6xl animate-bounce mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-500 mb-6">
          Thank you for your purchase. Your payment was successfully processed.
        </p>

        <Link href={`/courses/${globalParamId}`}>
          <button className="w-full px-6 py-4 text-white bg-emerald-600 rounded-xl shadow-lg hover:bg-emerald-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
            Continue Learning
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
