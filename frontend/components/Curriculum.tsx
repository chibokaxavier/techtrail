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
      freePreview: false,
      public_id: "",
    },
  ]);

  // Function to handle changes in individual inputs
  const handleInputChange = (index: number, field: any, value: any) => {
    setCurriculumFormData((prev) =>
      prev.map((lecture, i) =>
        i === index ? { ...lecture, [field]: value } : lecture
      )
    );
  };

  // Function to add a new lecture form
  const handleNewLecture = () => {
    setCurriculumFormData([
      ...curriculumFormData,
      {
        title: "",
        videoUrl: "",
        freePreview: false,
        public_id: "",
      },
    ]);
  };

  // Function to remove a lecture form
  const handleRemoveLecture = (index: number) => {
    setCurriculumFormData((prev) => prev.filter((_, i) => i !== index));
  };

  console.log(curriculumFormData)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create course curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleNewLecture}>Add lecture</Button>
        <div className="mt-4 space-y-4">
          {curriculumFormData.map((curriculum, index) => (
            <div className="border p-5 rounded-md" key={index}>
              <div className="flex gap-5 items-center">
                <h3 className="font-semibold">Lecture {index + 1}</h3>
                <Input
                  name="title"
                  placeholder="Enter lecture title"
                  value={curriculum.title}
                  onChange={(e) =>
                    handleInputChange(index, "title", e.target.value)
                  }
                  className="max-w-96"
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={curriculum.freePreview}
                    id={`freePreview.${index + 1}`}
                    onCheckedChange={(checked) =>
                      handleInputChange(index, "freePreview", checked)
                    }
                  />
                  <Label htmlFor={`freePreview.${index + 1}`}>
                    Free Preview
                  </Label>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => handleRemoveLecture(index)}
                >
                  Remove
                </Button>
              </div>
              <div className="mt-4">
                <Input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]; // Safely access the file
                    if (file) {
                      handleInputChange(index, "videoUrl", file);
                    }
                  }}
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
