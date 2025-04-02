"use client";
import CourseLandingPage from "@/components/CourseLandingPage";
import Curriculum from "@/components/Curriculum";
import Settings from "@/components/Settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStoreContext } from "@/context/authContext";
import axios from "axios";
import React, { useEffect, useMemo, useRef } from "react";
import { Toast } from "primereact/toast";
import { useParams } from "next/navigation";

interface CurriculumFormData {
  title: string;
  videoUrl: string;
  freePreview: boolean;
  public_id: string;
}

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
  const toast = useRef<Toast>(null);
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
  const showSuccess = (message: string) => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: message,
      life: 3000,
    });
  };
  const showError = (message: string) => {
    toast.current?.show({
      severity: "error",
      summary: "Success",
      detail: message,
      life: 3000,
    });
  };

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
      const res = await axios.put(
        `http://localhost:4000/api/v1/course/update/${currentEditedCourseId}`,
        finalFormData
      );
      if (res.data.success) {
        showSuccess(res.data.message);

        console.log(res.data);
      } else {
        showError(res.data.message);
      }
    } catch (error: unknown) {
      console.error("Error occurred:", error);
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          console.log(
            "Error response from server:",
            error.response.data.message
          );
          showError(error.response.data.message);
        }
      } else {
        console.log("Unknown error occurred");
        showError("An unexpected error occurred.");
      }
    }
  };

  const fetchCurrentCourse = async (id: string) => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/v1/course/get/details/${id}`
      );
      if (res.data.success) {
        console.log(res.data);
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
          language: language || "", // Assuming language is missing in the provided data
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
            freePreview: item.freePreview || false, // Assuming default value if not provided
            public_id: item.public_id || "",
          }))
        );
      }
    } catch (error: unknown) {
      console.error("Error occurred:", error);
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          console.log(
            "Error response from server:",
            error.response.data.message
          );
          showError(error.response.data.message);
        }
      } else {
        console.log("Unknown error occurred");
        showError("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    if (currentEditedCourseId) fetchCurrentCourse(currentEditedCourseId);
  }, [currentEditedCourseId]);

  useEffect(() => {
    if (id) setCurrentEditedCourseId((id ?? "").toString());
  }, [id]);

  return (
    <div className=" p-4  max-w-screen-xl mx-auto px-4  py-5 sm:px-6 lg:px-8">
      <Toast ref={toast} position="bottom-right" />
      <div className="flex  justify-between">
        <h1 className="text-3xl font-extrabold mb-5">Edit course</h1>
        <Button
          disabled={!isFormValid}
          className="text-sm tracking-wider font-bold px-8"
          onClick={handleCreateCourse}
        >
          Update
        </Button>
      </div>
      <Card>
        <CardContent>
          <div className="container mx-auto p-4">
            <Tabs defaultValue="curriculum">
              <TabsList>
                <TabsTrigger value="curriculum">Curiculum</TabsTrigger>
                <TabsTrigger value="landing">Course landing page</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="curriculum">
                <Curriculum />
              </TabsContent>
              <TabsContent value="landing">
                <CourseLandingPage />
              </TabsContent>{" "}
              <TabsContent value="settings">
                <Settings />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
