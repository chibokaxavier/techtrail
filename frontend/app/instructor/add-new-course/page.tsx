"use client";
import CourseLandingPage from "@/components/CourseLandingPage";
import Curriculum from "@/components/Curriculum";
import Settings from "@/components/Settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStoreContext } from "@/context/authContext";
import axiosInstance from "@/api/axiosInstance";
import axios from "axios";
import React, { useMemo } from "react";
import { toast } from "sonner";

const Page = () => {
  const {
    curriculumFormData,
    formData,
    setCurriculumFormData,
    setFormData,
    auth,
   
  } = useStoreContext();
  const isFormValid = useMemo(() => {
    // Validate curriculumFormData
    const isCurriculumValid =
      curriculumFormData.every((item) => {
        return (
          item &&
          typeof item === "object" &&
          item.title.trim() !== "" &&
          item.videoUrl.trim() !== "" &&
          typeof item.freePreview === "boolean" &&
          item.public_id.trim() !== ""
        );
      }) && curriculumFormData.some((item) => item.freePreview === true);

    // Validate formData
    const isLandingPageValid =
      formData.title.trim() !== "" &&
      formData.category.trim() !== "" &&
      formData.level.trim() !== "" &&
      formData.language.trim() !== "" &&
      formData.subtitle.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.price.trim() !== "" &&
      formData.objectives.trim() !== "" &&
      formData.welcomeMessage.trim() !== "" &&
      formData.image.trim() !== "";

    return isCurriculumValid && isLandingPageValid;
  }, [curriculumFormData, formData]);

  const handleCreateCourse = async () => {
    const finalFormData = {
      instructorId: auth?.user?._id,
      instructorName: auth?.user?.userName,
      date: new Date(),
      ...formData,
      students: [],
      curriculum: curriculumFormData,
      isPublished: true,
    };
    try {
      const res = await axiosInstance.post(
        "/api/v1/course/add",
        finalFormData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setFormData({
          title: "",
          category: "",
          level: "",
          language: "",
          subtitle: "",
          description: "",
          price: "",
          objectives: "",
          welcomeMessage: "",
          image: "",
        });
        setCurriculumFormData([
          {
            title: "",
            videoUrl: "",
            freePreview: false,
            public_id: "",
          },
        ]);
        // router.back();
      } else {
        toast.error(res.data.message);
      }
    } catch (error: unknown) {
      console.error("Error occurred:", error);
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          console.log(
            "Error response from server:",
            error.response.data.message
          );
          toast.error(error.response.data.message);
        }
      } else {
        console.log("Unknown error occurred");
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="p-4 max-w-screen-xl mx-auto py-5 pt-24 sm:px-6 lg:px-8 min-h-screen">
      {/* Background Decor Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-blue-600/10 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-purple-600/10 rounded-full blur-[150px]"></div>
      </div>
      
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
           <h1 className="text-4xl font-black tracking-tighter">Forge <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">New Trail</span></h1>
           <p className="text-gray-500 text-sm italic mt-1">Expanding the knowledge frontier for learners.</p>
        </div>
        <Button
          disabled={!isFormValid}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-10 py-6 font-bold shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border-0"
          onClick={handleCreateCourse}
        >
          Publish Trail
        </Button>
      </div>

      <Card className="relative z-10 bg-white/[0.02] border border-white/10 rounded-[32px] overflow-hidden backdrop-blur-3xl shadow-2xl">
        <CardContent className="p-6 sm:p-8">
          <Tabs defaultValue="curriculum" className="w-full">
            <div className="overflow-x-auto pb-4">
              <TabsList className="bg-white/5 border border-white/10 p-1 rounded-2xl flex w-max min-w-full sm:min-w-0">
                <TabsTrigger value="curriculum" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-xl px-8 sm:px-12 py-3 font-bold uppercase tracking-widest text-[10px] transition-all">Curriculum</TabsTrigger>
                <TabsTrigger value="landing" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-xl px-8 sm:px-12 py-3 font-bold uppercase tracking-widest text-[10px] transition-all">Trail Details</TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-xl px-8 sm:px-12 py-3 font-bold uppercase tracking-widest text-[10px] transition-all">Settings</TabsTrigger>
              </TabsList>
            </div>
            
            <div className="mt-8">
               <TabsContent value="curriculum" className="mt-0 outline-none">
                 <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Curriculum />
                 </div>
               </TabsContent>
               <TabsContent value="landing" className="mt-0 outline-none">
                 <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <CourseLandingPage />
                 </div>
               </TabsContent>
               <TabsContent value="settings" className="mt-0 outline-none">
                 <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Settings />
                 </div>
               </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
