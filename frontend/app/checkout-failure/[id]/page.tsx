"use client";
import axiosInstance from "@/api/axiosInstance";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { MdCancel } from "react-icons/md";

const Page = () => {
  const { id } = useParams();
  const orderId = id;
  const router = useRouter();

  useEffect(() => {
    const verifyOrder = async () => {
      try {
        const res = await axiosInstance.post("/api/v1/order/verify", {
          orderId,
          success: false,
        });
        if (res.data.success) {
          router.push("/courses");
        }
      } catch (error) {
        console.error("Order verification failed:", error);
      }
    };
    if (orderId) verifyOrder();
  }, [orderId, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#050505] text-white">
      <div className="p-10 bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-3xl shadow-2xl text-center max-w-md w-full">
        <MdCancel className="text-red-500 text-6xl animate-bounce mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">
          Payment Failed!
        </h1>
        <p className="text-gray-500 mb-6">
          Your payment attempt failed, kindly retry.
        </p>

        <Link href="/courses">
          <button className="w-full px-6 py-4 text-white bg-red-600 rounded-xl shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
