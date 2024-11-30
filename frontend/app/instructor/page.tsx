'use client'
import ProtectedRoute from "@/components/ProtectedRoute";
import { useStoreContext } from "@/context/authContext";
import React from "react";

const page = () => {
  const { auth } = useStoreContext();
  return (
  
      <div>page</div>
   
  );
};

export default page;
