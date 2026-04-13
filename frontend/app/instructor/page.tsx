"use client";
import InstructorCourses from "@/components/InstructorCourses";
import Logout from "@/components/Logout";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Page = () => {
  const [tab, setTab] = useState<string>("courses");
  
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 font-sans relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[150px] animate-pulse delay-700"></div>
      </div>

      <div className="flex max-w-screen-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative z-10 min-h-[90vh]">
        {/* Pass tab state and setter to Sidebar */}
        <Sidebar tab={tab} setTab={setTab} />
        
        <div className="flex-1 ml-0 lg:ml-8 mt-8 lg:mt-0">
          <AnimatePresence mode="wait">
            <motion.div
               key={tab}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.3 }}
               className="h-full"
            >
              {tab === "dashboard" && (
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <h2 className="text-3xl font-bold mb-4">Instructor Dashboard</h2>
                  <p className="text-gray-400">Welcome back. Here is the overview of your courses and students.</p>
                  {/* Dashboard skeleton summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                     <div className="p-6 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-gray-500 mb-1">Total Revenue</p>
                        <p className="text-3xl font-bold">$0.00</p>
                     </div>
                     <div className="p-6 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-gray-500 mb-1">Active Students</p>
                        <p className="text-3xl font-bold">0</p>
                     </div>
                     <div className="p-6 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-gray-500 mb-1">Active Courses</p>
                        <p className="text-3xl font-bold">0</p>
                     </div>
                  </div>
                </div>
              )}
              {tab === "courses" && <InstructorCourses />}
              {tab === "logout" && <Logout tab={tab} setTab={setTab} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Page;
