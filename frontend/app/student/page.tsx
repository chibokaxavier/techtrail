'use client'
import ProtectedRoute from "@/components/ProtectedRoute";
import { useStoreContext } from "@/context/authContext";
import React from "react";

const page = () => {
  const { auth } = useStoreContext();
  return (
   
      <div className="max-w-screen-xl mx-auto px-4  py-5 sm:px-6 lg:px-8">page</div>
   
  );
};

export default page;
