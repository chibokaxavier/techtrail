"use client";
import CourseLandingPage from "@/components/CourseLandingPage";
import Curriculum from "@/components/Curriculum";
import Settings from "@/components/Settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStoreContext } from "@/context/authContext";
import React, { useMemo } from "react";

const page = () => {
  const { curriculumFormData, formData } = useStoreContext();
  const isFormValid = useMemo(() => {
    // Validate curriculumFormData
    const isCurriculumValid = curriculumFormData.every((item) => {
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

  return (
    <div className="mx-auto container p-4 ">
      <div className="flex  justify-between">
        <h1 className="text-3xl font-extrabold mb-5">Create a new course</h1>
        <Button
          disabled={!isFormValid}
          className="text-sm tracking-wider font-bold px-8"
        >
          SUBMIT
        </Button>
      </div>
      <Card>
        <CardContent>
          <div className="container mx-auto p-4">
            <Tabs>
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

export default page;
