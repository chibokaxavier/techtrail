/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import { courseCategories } from "@/config/utils";
import { CourseList, useStudentContext } from "@/context/studentContext";
import axiosInstance from "@/api/axiosInstance";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { GraduationCap, Rocket, Target, Zap, ArrowRight, Star, Users } from "lucide-react";

export default function Home() {
  const {
    setStudentCourseList,
    studentCourseList,
    filteredCourses,
    setFilteredCourses,
  } = useStudentContext();

  const [shuffledCourses, setShuffledCourses] = useState<CourseList[]>([]);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setShuffledCourses(
      [...filteredCourses].sort(() => Math.random() - 0.5).slice(0, 4)
    );
  }, [filteredCourses]);

  const fetchStudentCourses = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/student/get");
      if (res.data.success) {
        setStudentCourseList(res.data.data);
        setFilteredCourses(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudentCourses();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-20 px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] animate-pulse delay-1000"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        </div>

        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8 backdrop-blur-md"
          >
            <Zap className="size-4 text-blue-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">The Future of Learning</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]"
          >
            MASTER THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">MODERN STACK</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Navigate professional development trails curated by industry experts. Instant access to high-fidelity courses that bridge the gap between theory and industry standard.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/courses">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-8 rounded-full text-lg font-bold transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] active:scale-95 group">
                Begin Your Trail <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/auth">
              <Button variant="outline" size="lg" className="bg-white/5 border-white/10 hover:bg-white/10 text-white px-10 py-8 rounded-full text-lg font-bold backdrop-blur-md">
                Join Community
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-gray-800 to-transparent"></div>
        </motion.div>
      </section>

      {/* Categories Bar */}
      <section className="bg-white/[0.02] border-y border-white/5 py-12 backdrop-blur-3xl relative z-10">
        <div className="max-w-screen-xl mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-between gap-8 min-w-max">
            {courseCategories.map((category, i) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setFilteredCourses(studentCourseList.filter(c => c.category === category.id))}
                className="group flex flex-col items-center gap-3 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <div className="size-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600/10 group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-all">
                   <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
                      {/* Using icons based on label could be better, but we'll use a generic one or map them */}
                      <Rocket className="size-6" />
                   </div>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">{category.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-screen-xl mx-auto px-4 py-32">
        <div className="flex items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-2 text-purple-500 mb-2">
               <Star className="size-5 fill-current" />
               <span className="text-sm font-bold uppercase tracking-widest italic">Curated Selection</span>
            </div>
            <h2 className="text-5xl font-black tracking-tighter">FEATURED <span className="text-gray-600">TRAILS</span></h2>
          </div>
          <Link href="/courses" className="text-blue-500 font-bold hover:underline group flex items-center gap-2">
             View All Courses <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {shuffledCourses && shuffledCourses.length > 0
            ? shuffledCourses.map((course, i) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/courses/${course._id}`}>
                    <div className="group relative bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-500">
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-4">
                           <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-tighter px-3 py-1 rounded-full">
                              {course.level}
                           </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">{course.title}</h3>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{course.description}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                           <div className="flex items-center gap-2">
                              <div className="size-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                                 <Users className="size-3 text-blue-500" />
                              </div>
                              <span className="text-xs text-gray-400 font-medium">{course.instructorName}</span>
                           </div>
                           <span className="text-lg font-black text-white">${course.price}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            : [1,2,3,4].map(i => <div key={i} className="h-96 bg-white/5 border border-white/10 rounded-3xl animate-pulse"></div>)
          }
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-gradient-to-b from-[#050505] to-blue-900/10 py-32 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                 <div className="text-5xl font-black text-blue-500 italic">10K+</div>
                 <div className="text-sm font-bold uppercase tracking-widest text-gray-500">Active Learners</div>
              </div>
              <div className="space-y-4">
                 <div className="text-5xl font-black text-purple-600 italic">500+</div>
                 <div className="text-sm font-bold uppercase tracking-widest text-gray-500">Expert Instructors</div>
              </div>
              <div className="space-y-4">
                 <div className="text-5xl font-black text-indigo-500 italic">4.9/5</div>
                 <div className="text-sm font-bold uppercase tracking-widest text-gray-500">User Satisfaction</div>
              </div>
           </div>
        </div>
      </section>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
