"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import axios from "axios";
import { useStoreContext } from "@/context/authContext";
import MediaProgressBar from "./MediaProgressBar";

interface FormType {
  title: string;
  category: string;
  level: string;
  language: string;
  subtitle: string;
  description: string;
  price: string;
  objectives: string;
  welcomeMessage: string;
  image: string;
}
const Settings = () => {
  const [mediaUploadProgress, setMediaUploadProgress] = useState(false);
  const [progress, setProgress] = useState(0); // Upload progress
  const { formData, setFormData } = useStoreContext();

  const handleUpload = async (
    imageFormData: FormData,
    onProgressCallback: (progress: number) => void
  ) => {
    try {
      // Show media upload progress state
      setMediaUploadProgress(true);

      // Perform the upload
      const res = await axios.post(
        "https://techtrail-x074.onrender.com/api/v1/media/upload",
        imageFormData,
        {
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              onProgressCallback(percentCompleted); // Notify progress callback
            }
          },
          headers: {
            "Content-Type": "multipart/form-data", // Ensure proper content type
          },
        }
      );

      // Handle response
      if (res.data.success) {
        console.log("Upload Successful:", res.data);

        // Update form data with uploaded image URL
        setFormData((prev: FormType) => ({
          ...prev,
          image: res.data.data.url, // Set image URL
        }));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      // Reset media upload progress state
      setMediaUploadProgress(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Settings</CardTitle>
      </CardHeader>
      <CardContent>
        {formData?.image ? (
          <img src={formData?.image} alt="Uploaded course image" />
        ) : (
          <div className="flex flex-col gap-3">
            <Label>Upload Course Image</Label>
            <Input
              type="file"
              accept="image/*"
              className="cursor-pointer"
              onChange={(e) => {
                const file = e.target.files?.[0]; // Safely access the file
                if (file) {
                  const imageFormData = new FormData();
                  imageFormData.append("file", file);

                  // Start the upload and update progress
                  handleUpload(imageFormData, setProgress);
                } else {
                  setFormData((prev: FormType) => ({
                    ...prev,
                    image: "",
                  }));
                }
              }}
            />
          </div>
        )}

        {/* Include the MediaProgressBar */}
        <MediaProgressBar
          isMediaUploading={mediaUploadProgress}
          progress={progress}
        />
      </CardContent>
    </Card>
  );
};

export default Settings;
