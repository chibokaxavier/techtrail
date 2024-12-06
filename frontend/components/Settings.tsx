'use client'
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import axios from "axios";
import { useStoreContext } from "@/context/authContext";

const Settings = () => {
  const [mediaUploadProgress, setMediaUploadProgress] = useState(false);
  const { formData, setFormData } = useStoreContext();

  const handleUpload = async (imageFormData: any, ) => {
    try {
      setMediaUploadProgress(true);

      const res = await axios.post(
        "http://localhost:4000/api/v1/media/upload",
        imageFormData
      );

      if (res.data.success) {
        // Update the specific lecture's videoUrl and public_id
        console.log(res.data);
        setFormData((prev: any) => ({
          ...prev,
          image: res.data.data.url,
        }));
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setMediaUploadProgress(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <Label>Upload course image</Label>
          <Input
            type="file"
            accept="image/*"
            className="cursor-pointer"
            onChange={(e) => {
              const file = e.target.files?.[0]; // Safely access the file
              if (file) {
                const imageFormData = new FormData();
                imageFormData.append("file", file);
                handleUpload(imageFormData);
                
              } else {
                setFormData((prev: any) => ({
                  ...prev,
                  image: '',
                }));
              }
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Settings;
