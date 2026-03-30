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
import React, { useEffect, useMemo, useCallback } from "react";
import { toast } from "sonner";
import { useParams } from "next/navigation";

interface CurriculumFormData {
  title: string;
  videoUrl: string;
  freePreview: boolean;
  public_id: string;
}

/**
 * Modernized High-Fidelity Course Editor for TechTrail
 */
const Page = () => {
  const {
    curriculumFormData,
    formData,
    setCurriculumFormData,
    setFormData,
    auth,
    currentEditedCourseId,
    setCurrentEditedCourseId,
  } = useStoreContext();
  const { id } = useParams();

  const isFormValid = useMemo(() => {
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

  const handleUpdateCourse = async () => {
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
      const res = await axiosInstance.put(
        `/api/v1/course/update/${currentEditedCourseId}`,
        finalFormData
      );
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error: unknown) {
      console.error("Error occurred:", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occurred.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const fetchCurrentCourse = useCallback(async (courseId: string) => {
    try {
      const res = await axiosInstance.get(`/api/v1/course/get/details/${courseId}`);
      if (res.data.success) {
        const {
          title,
          category,
          level,
          subtitle,
          language,
          image,
          description,
          welcomeMessage,
          price,
          objectives,
          curriculum,
        } = res.data.data;
        setFormData({
          title: title || "",
          category: category || "",
          level: level || "",
          language: language || "",
          subtitle: subtitle || "",
          description: description || "",
          price: price || "",
          objectives: objectives || "",
          welcomeMessage: welcomeMessage || "",
          image: image || "",
        });
        setCurriculumFormData(
          (curriculum || []).map((item: CurriculumFormData) => ({
            title: item.title || "",
            videoUrl: item.videoUrl || "",
            freePreview: item.freePreview || false,
            public_id: item.public_id || "",
          }))
        );
      }
    } catch (error: unknown) {
      console.error("Error fetching course:", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to fetch course details.");
      }
    }
  }, [setFormData, setCurriculumFormData]);

  useEffect(() => {
    if (currentEditedCourseId) fetchCurrentCourse(currentEditedCourseId);
  }, [currentEditedCourseId, fetchCurrentCourse]);

  useEffect(() => {
    if (id) setCurrentEditedCourseId(id.toString());
  }, [id, setCurrentEditedCourseId]);

  return (
    <div className="p-4 max-w-screen-xl mx-auto py-5 pt-24 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
           <h1 className="text-4xl font-black tracking-tighter">Edit <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Trail Node</span></h1>
           <p className="text-gray-500 text-sm italic">Synchronizing alterations to the knowledge frontier.</p>
        </div>
        <Button
          disabled={!isFormValid}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-10 py-6 font-bold shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all active:scale-95"
          onClick={handleUpdateCourse}
        >
          Push Changes
        </Button>
      </div>
      <Card className="bg-white/[0.02] border-white/10 rounded-[32px] overflow-hidden backdrop-blur-3xl">
        <CardContent className="p-8">
          <Tabs defaultValue="curriculum" className="w-full">
            <TabsList className="bg-white/5 border border-white/10 p-1 rounded-2xl mb-12 flex w-fit">
              <TabsTrigger value="curriculum" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-xl px-12 py-3 font-bold uppercase tracking-widest text-[10px]">Curriculum</TabsTrigger>
              <TabsTrigger value="landing" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-xl px-12 py-3 font-bold uppercase tracking-widest text-[10px]">Trail Node Details</TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-xl px-12 py-3 font-bold uppercase tracking-widest text-[10px]">Settings</TabsTrigger>
            </TabsList>
            <div className="mt-8">
               <TabsContent value="curriculum">
                 <Curriculum />
               </TabsContent>
               <TabsContent value="landing">
                 <CourseLandingPage />
               </TabsContent>
               <TabsContent value="settings">
                 <Settings />
               </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
