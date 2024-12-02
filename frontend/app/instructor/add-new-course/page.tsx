import CourseLandingPage from "@/components/CourseLandingPage";
import Curriculum from "@/components/Curriculum";
import Settings from "@/components/Settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const page = () => {
  return (
    <div className="mx-auto container p-4 ">
      <div className="flex  justify-between">
        <h1 className="text-3xl font-extrabold mb-5">Create a new course</h1>
        <Button className="text-sm tracking-wider font-bold px-8">
          SUBMIT
        </Button>
      </div>
      <Card>
        <CardContent>
          <div className="container mx-auto p-4">
            <Tabs>
              <TabsList>
                <TabsTrigger value="curriculum">Curiculum</TabsTrigger>
                <TabsTrigger value="landing">Course Landing Page</TabsTrigger>
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
