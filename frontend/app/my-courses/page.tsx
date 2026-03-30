/* eslint-disable @next/next/no-img-element */
"use client";
import { useStoreContext } from "@/context/authContext";
import { CourseList } from "@/context/studentContext";
import axiosInstance from "@/api/axiosInstance";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Clock, PlayCircle, Trophy, Layout, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * High-Fidelity Modernized My Courses Page for TechTrail
 */
const Page = () => {
  const [courseLoading, setCourseLoading] = useState(false);
  const [paidCourses, setPaidCourses] = useState<CourseList[]>([]);
  const { token, auth } = useStoreContext();

  const fetchPaidCourses = useCallback(async () => {
    setCourseLoading(true);
    try {
      const res = await axiosInstance.get(`/api/v1/course/getPaidCourses`, {
        headers: { token },
      });
      if (res.data.success) {
        setPaidCourses(res.data.data);
      }
    } catch (error) {
      setPaidCourses([]);
      console.error(error);
    } finally {
      setCourseLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchPaidCourses();
  }, [token, fetchPaidCourses]);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24">
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 px-4">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="text-center md:text-left"
           >
              <div className="flex items-center justify-center md:justify-start gap-2 text-blue-500 mb-2">
                 <Layout className="size-5" />
                 <span className="text-sm font-bold uppercase tracking-widest italic">Student Workspace</span>
              </div>
              <h1 className="text-5xl font-black tracking-tighter">My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Learning Paths</span></h1>
              <p className="text-gray-500 mt-2">Welcome back, {auth?.user?.userName}. Continue where you left off.</p>
           </motion.div>

           <div className="flex gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                 <div className="size-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <Trophy className="size-6 text-orange-500" />
                 </div>
                 <div>
                    <div className="text-2xl font-black">{paidCourses.length}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Enrolled Trails</div>
                 </div>
              </div>
           </div>
        </div>

        <main className="px-4">
          <AnimatePresence mode="wait">
            {courseLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                   <div key={i} className="h-80 shimmer border border-white/10 rounded-3xl" />
                ))}
              </div>
            ) : paidCourses && paidCourses.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {paidCourses.map((course: CourseList, i: number) => (
                  <motion.div
                    key={course._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link href={`/courses/${course._id}`}>
                      <div className="group relative bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 h-full flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                          <div className="absolute top-4 right-4">
                             <div className="bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                <PlayCircle className="size-6" />
                             </div>
                          </div>
                        </div>
                        
                        <div className="p-6 flex-1 flex flex-col">
                          <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-2">
                             {course.category}
                          </span>
                          <h3 className="text-xl font-bold mb-4 line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">
                            {course.title}
                          </h3>
                          
                          <div className="grid grid-cols-2 gap-4 mb-6">
                             <div className="flex items-center gap-2 text-xs text-gray-500">
                                <BookOpen className="size-3.5" />
                                <span>{course.curriculum.length} Lessons</span>
                             </div>
                             <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Clock className="size-3.5" />
                                <span>Recent Access</span>
                             </div>
                          </div>

                          <div className="mt-auto">
                             <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest italic">Course Progress</span>
                                <span className="text-xs font-bold text-blue-500">0%</span>
                             </div>
                             <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: "0%" }}
                                  className="h-full bg-blue-600 rounded-full"
                                />
                             </div>
                             
                             <Button asChild className="w-full mt-6 bg-white/5 border border-white/10 hover:bg-blue-600 transition-all rounded-xl py-6 group-hover:border-blue-500">
                                <Link href={`/courses/${course._id}`}>
                                   Continue Trail <ChevronRight className="ml-1 size-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                             </Button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                 <div className="size-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
                    <BookOpen className="size-10 text-gray-700" />
                 </div>
                 <h2 className="text-3xl font-bold mb-2 tracking-tight">Your library is empty</h2>
                 <p className="text-gray-500 max-w-sm mx-auto mb-8">Ready to embark on a new learning trail? Explore our expert selection of professional courses.</p>
                 <Link href="/courses">
                   <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-8 py-6">
                      Explore Courses
                   </Button>
                 </Link>
              </div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Page;
