"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";

const Curriculum = () => {
  const [curriculumFormData, setCurriculumFormData] = useState([
    {
      title: "",
      videoUrl: "",
      freePreview: "",
      public_id: "",
    },
  ]);
  const handleNewLecture = () => {
    setCurriculumFormData([
      ...curriculumFormData,
      {
        ...curriculumFormData[0],
      },
    ]);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create course curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleNewLecture}>Add lecture</Button>
        <div className="mt-4 space-y-4">
          {curriculumFormData.map((curriculum, index) => (
            <div className="border p-5 rounded-md " key={index}>
              <div className="flex gap-5 ">
                <h3 className="font-semibold">Lecture {index + 1} </h3>
                <Input
                  name="title"
                  placeholder="Enter lecture title"
                  className="max-w-96"
                />
                <div className="flex items-center space-x-2">
                  <Switch checked={false} id={` freePreview.${index + 1}`} />
                  <Label htmlFor={` freePreview.${index + 1}`}>
                    Free Preview
                  </Label>
                </div>
              </div>
              <div className="mt-4">
                <Input
                  type="file"
                  accept="video/*"
                  className="mb-4 cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Curriculum;
