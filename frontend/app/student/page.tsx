'use client'
import ProtectedRoute from "@/components/ProtectedRoute";
import { useStoreContext } from "@/context/authContext";
import React from "react";

const page = () => {
  const { auth } = useStoreContext();
  return (
    <ProtectedRoute authenticate={auth?.authenticate} user={auth?.user}>
      <div>page</div>
    </ProtectedRoute>
  );
};

export default page;
