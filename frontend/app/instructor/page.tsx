"use client";
import Logout from "@/components/Logout";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";

const page = () => {
  const [tab, setTab] = useState<string>("dashboard");
  return (
    <div className="flex bg-gray-100">
      {/* Pass tab state and setter to Sidebar */}
      <Sidebar tab={tab} setTab={setTab} />
      <div className="flex-1 p-8">
        {/* Render content based on active tab */}
        {tab === "dashboard" && <p>Welcome to the Dashboard</p>}
        {tab === "courses" && <p>Manage your Courses here</p>}
        {tab === "logout" && <Logout />}
      </div>
    </div>
  );
};

export default page;
