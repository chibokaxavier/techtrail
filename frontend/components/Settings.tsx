/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import axiosInstance from "@/api/axiosInstance";
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
      const res = await axiosInstance.post(
        "/api/v1/media/upload",
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
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="mb-8">
         <h2 className="text-2xl font-black tracking-tight text-white mb-2">Trail Presentation</h2>
         <p className="text-gray-400 text-sm">Elevate your trail's aesthetic with a high quality thumbnail.</p>
      </div>
      
      <div className="bg-white/[0.02] border border-white/10 p-6 sm:p-8 rounded-3xl relative overflow-hidden backdrop-blur-md">
        {formData?.image ? (
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
             <div className="relative w-full md:w-[400px] aspect-video rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-blue-900/20 group">
                <img src={formData?.image} alt="Uploaded thumbnail" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <p className="text-white font-bold tracking-widest uppercase">Current Thumbnail</p>
                </div>
             </div>
             
             <div className="flex-1 space-y-4">
                <h3 className="text-xl font-bold text-white">Visuals Looking Good!</h3>
                <p className="text-gray-400">A high quality image drastically increases your enrollment rates. Want to swap it?</p>
                <div className="relative overflow-hidden w-fit">
                  <Input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={(e) => {
                      const file = e.target.files?.[0]; // Safely access the file
                      if (file) {
                        const imageFormData = new FormData();
                        imageFormData.append("file", file);
                        handleUpload(imageFormData, setProgress);
                      }
                    }}
                  />
                  <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all border border-white/10">
                    Replace Image
                  </button>
                </div>
             </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <Label className="text-xl font-bold text-white mb-6 tracking-tight">Upload Trail Thumbnail</Label>
            
            <div className="relative w-full max-w-2xl">
              <Input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={(e) => {
                  const file = e.target.files?.[0]; // Safely access the file
                  if (file) {
                    const imageFormData = new FormData();
                    imageFormData.append("file", file);
                    handleUpload(imageFormData, setProgress);
                  } else {
                    setFormData((prev: FormType) => ({
                      ...prev,
                      image: "",
                    }));
                  }
                }}
              />
              <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 rounded-3xl transition-all h-64 bg-black/20">
                 <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(37,99,235,0.2)]">
                    <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                 </div>
                 <p className="text-white font-bold text-lg mb-2">Drag and drop your masterpiece</p>
                 <p className="text-gray-500 text-sm">Support JPG, PNG, WEBP (Max 5MB)</p>
              </div>
            </div>
          </div>
        )}

        {/* Include the MediaProgressBar */}
        <MediaProgressBar
          isMediaUploading={mediaUploadProgress}
          progress={progress}
        />
      </div>
    </div>
  );
};

export default Settings;
