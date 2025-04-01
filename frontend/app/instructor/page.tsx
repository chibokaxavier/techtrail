"use client";
import InstructorCourses from "@/components/InstructorCourses";
import Logout from "@/components/Logout";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";

const Page = () => {
  const [tab, setTab] = useState<string>("courses");
  return (
    <div className="flex text-white max-w-screen-xl mx-auto px-4  py-5 sm:px-6 lg:px-8">
      {/* Pass tab state and setter to Sidebar */}
      <Sidebar tab={tab} setTab={setTab} />
      <div className="flex-1 p-8">
        {/* Render content based on active tab */}
        {tab === "dashboard" && <p>Welcome to the Dashboard</p>}
        {tab === "courses" && <InstructorCourses/>}
        {tab === "logout" && <Logout  tab={tab} setTab={setTab} />}
      </div>
    </div>
  );
};

export default Page;
