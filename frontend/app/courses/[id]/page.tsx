"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import VideoPlayer from "@/components/VideoPlayer";
import { useStoreContext } from "@/context/authContext";
import { CourseList, useStudentContext } from "@/context/studentContext";
import axiosInstance from "@/api/axiosInstance";
import { CheckCircle, Globe, Lock, PlayCircle, Clock, BookOpen, User, Star, Share2, Target, Layout } from "lucide-react";
import { useParams } from "next/navigation";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";

/**
 * High-Fidelity Modernized Course Details Page for TechTrail
 */
const Page = () => {
  const { id } = useParams();
  const [courseDetail, setCourseDetail] = useState<CourseList>({
    _id: "",
    id: "",
    instructorId: "",
    instructorName: "",
    title: "",
    category: "",
    level: "",
    language: "",
    subtitle: "",
    image: "",
    description: "",
    welcomeMessage: "",
    price: "",
    objectives: "",
    students: [{ studentId: "", studentName: "", StudentEmail: "" }],
    curriculum: [{ title: "", videoUrl: "", freePreview: false, public_id: "" }],
  });
  const [loading, setLoading] = useState(true);
  const { auth } = useStoreContext();
  const { setGlobalParamId } = useStudentContext();
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const userId = auth?.user?._id;
  const [mainVid, setMainVid] = useState("");
  const [mainTitle, setMainTitle] = useState("");

  const fetchCourseDetails = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(`/api/v1/student/get/detail/${id}`, { userId });
      if (res.data.success) {
        setCourseDetail(res.data.data);
        if (res.data.paid) setPaid(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id, userId]);

  const placeOrder = async () => {
    setPaymentLoading(true);
    const orderData = {
      courseId: id,
      userId: auth?.user?._id,
      title: courseDetail.title,
      price: courseDetail.price,
      instructorName: courseDetail.instructorName,
      email: auth?.user?.email,
      image: courseDetail.image,
    };
    try {
      const res = await axiosInstance.post("/api/v1/order/place", orderData);
      if (res.data.session?.url) {
        window.location.href = res.data.session.url;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setPaymentLoading(false);
    }
  };

  const freePreviewItem = useMemo(() => 
    courseDetail?.curriculum?.find(item => item.freePreview), 
    [courseDetail?.curriculum]
  );

  useEffect(() => {
    fetchCourseDetails();
    if (id) {
      setGlobalParamId(id.toString());
    }
  }, [id, fetchCourseDetails, setGlobalParamId]);

  useEffect(() => {
    if (freePreviewItem) {
      setMainVid(freePreviewItem.videoUrl);
      setMainTitle(freePreviewItem.title);
    }
  }, [freePreviewItem]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
         <div className="flex flex-col items-center gap-4">
            <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" />
            <span className="text-gray-500 font-bold uppercase tracking-widest text-xs animate-pulse">Loading Trail...</span>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      
      {/* Hero Header Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-screen-xl mx-auto relative z-10">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="max-w-3xl"
           >
              <div className="flex items-center gap-3 mb-6">
                 <span className="bg-blue-600/10 text-blue-500 border border-blue-500/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {courseDetail.category}
                 </span>
                 <span className="text-gray-600">•</span>
                 <span className="text-white font-bold text-xs flex items-center gap-1.5 uppercase tracking-widest">
                    <Globe className="size-3.5 text-blue-500" /> {courseDetail.language}
                 </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.95]">
                {courseDetail.title}
              </h1>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-2xl">
                {courseDetail.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                 <div className="flex items-center gap-2">
                    <div className="size-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                       <User className="size-4 text-blue-500" />
                    </div>
                    <span className="font-medium text-gray-300">By <span className="text-white font-bold">{courseDetail.instructorName}</span></span>
                 </div>
                 <div className="flex items-center gap-4 text-gray-500 border-l border-white/10 pl-6 ml-2">
                    <div className="flex items-center gap-1.5">
                       <Clock className="size-4" />
                       <span>{courseDetail.students.length} Learners</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                       <BookOpen className="size-4" />
                       <span>{courseDetail.curriculum.length} Lessons</span>
                    </div>
                 </div>
              </div>
           </motion.div>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <main className="flex-1 space-y-12">
            
            {/* Objectives Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-black tracking-tight mb-8 flex items-center gap-2 uppercase italic text-gray-300">
                 <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
                 Course Outcomes
              </h2>
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courseDetail.objectives.split(",").map((objective, i) => (
                    <li key={i} className="flex gap-4 group">
                      <div className="size-6 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 mt-0.5 border border-green-500/20 group-hover:bg-green-500 group-hover:text-white transition-all">
                        <CheckCircle className="size-4 text-green-500 group-hover:text-white" />
                      </div>
                      <span className="text-gray-400 text-sm leading-relaxed group-hover:text-white transition-colors">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Curriculum Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-black tracking-tight mb-8 flex items-center gap-2 uppercase italic text-gray-300">
                 <span className="w-8 h-1 bg-purple-600 rounded-full"></span>
                 The Curriculum
              </h2>
              <div className="space-y-3">
                {courseDetail.curriculum.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => (item.freePreview || paid) && (setMainVid(item.videoUrl), setMainTitle(item.title))}
                    className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${
                      item.freePreview || paid 
                      ? "bg-white/[0.03] border-white/5 hover:border-blue-500/50 cursor-pointer group" 
                      : "bg-white/0 border-white/5 opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                       <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600/20 group-hover:border-blue-500/50 transition-all">
                          {item.freePreview || paid ? (
                            <PlayCircle className={`size-5 transition-colors ${mainTitle === item.title ? "text-blue-500" : "text-gray-400 group-hover:text-blue-400"}`} />
                          ) : (
                            <Lock className="size-5 text-gray-600" />
                          )}
                       </div>
                       <div>
                          <p className={`text-sm font-bold transition-all ${mainTitle === item.title ? "text-blue-500 scale-105" : "text-gray-300 group-hover:text-white"}`}>
                            {item.title}
                          </p>
                          {item.freePreview && !paid && <span className="text-[10px] font-black uppercase text-blue-500 tracking-tighter">Free Preview</span>}
                       </div>
                    </div>
                    {(item.freePreview || paid) && <span className="text-xs text-gray-500 font-medium group-hover:text-blue-400 transition-colors">Start →</span>}
                  </div>
                ))}
              </div>
            </motion.div>
          </main>

          {/* Sidebar / Enrollment */}
          <aside className="w-full lg:w-[450px] shrink-0">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-28"
            >
              <Card className="bg-white/[0.03] border-white/10 rounded-[32px] overflow-hidden backdrop-blur-2xl shadow-2xl">
                <div className="p-2">
                   <div className="aspect-video rounded-[24px] overflow-hidden relative group">
                      {freePreviewItem ? (
                        <div className="size-full">
                           <VideoPlayer width="100%" height="100%" url={mainVid} />
                        </div>
                      ) : (
                        <div className="size-full bg-white/5 flex items-center justify-center italic text-gray-600">
                           No Preview Available
                        </div>
                      )}
                      {!paid && <div className="absolute top-4 left-4 pointer-events-none">
                         <span className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/10">PREVIEW TRAIL</span>
                      </div>}
                   </div>
                </div>

                <CardContent className="p-8 pt-6">
                  {!paid ? (
                    <div className="space-y-8">
                      <div className="flex items-end justify-between">
                         <div>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Lifetime Access</span>
                            <span className="text-5xl font-black text-white tracking-tighter">${courseDetail.price}</span>
                         </div>
                         <div className="flex flex-col items-end">
                            <div className="flex text-orange-400 mb-1">
                               <Star className="size-4 fill-current" />
                               <Star className="size-4 fill-current" />
                               <Star className="size-4 fill-current" />
                               <Star className="size-4 fill-current" />
                               <Star className="size-4" />
                            </div>
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Highly Rated</span>
                         </div>
                      </div>

                      <div className="space-y-4">
                        <Button
                          className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-lg font-black transition-all active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                          disabled={paymentLoading}
                          onClick={placeOrder}
                        >
                          {paymentLoading ? <ProgressSpinner style={{width: '24px', height: '24px'}} strokeWidth="8" /> : "Enroll in Trail Now"}
                        </Button>
                        <p className="text-center text-[10px] text-gray-500 font-bold uppercase tracking-widest">30-Day Money-Back Guarantee</p>
                      </div>

                      <div className="pt-8 border-t border-white/5 grid grid-cols-3 gap-2">
                         <Button variant="ghost" className="h-auto flex flex-col gap-2 p-4 hover:bg-white/5 rounded-2xl">
                            <Share2 className="size-5 text-gray-400" />
                            <span className="text-[10px] font-bold text-gray-500">Share</span>
                         </Button>
                         <Button variant="ghost" className="h-auto flex flex-col gap-2 p-4 hover:bg-white/5 rounded-2xl">
                            <Target className="size-5 text-gray-400" />
                            <span className="text-[10px] font-bold text-gray-500">Curricula</span>
                         </Button>
                         <Button variant="ghost" className="h-auto flex flex-col gap-2 p-4 hover:bg-white/5 rounded-2xl">
                            <Layout className="size-5 text-gray-400" />
                            <span className="text-[10px] font-bold text-gray-500">Certificate</span>
                         </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                       <div className="size-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                          <CheckCircle className="size-8 text-green-500" />
                       </div>
                       <h3 className="text-2xl font-black mb-2 tracking-tighter italic">YOU OWN THIS TRAIL</h3>
                       <p className="text-gray-500 text-sm mb-6">Enjoy unlimited access to all course materials and future updates.</p>
                       <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left">
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Currently Watching</span>
                          <p className="text-sm font-bold text-blue-500 truncate">{mainTitle || "Select a lesson"}</p>
                       </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Page;
