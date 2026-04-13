"use client";
import React, { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import axios from "axios";
import MediaProgressBar from "./MediaProgressBar";
import VideoPlayer from "./VideoPlayer";
import { CurriculumFormdataType, useStoreContext } from "@/context/authContext";
import { Upload } from "lucide-react";


type FileType = {
  url: string;
  public_id: string;
  title: string;
  videoUrl: string;
  freePreview: string;
};
const Curriculum = () => {
  const { curriculumFormData, setCurriculumFormData } = useStoreContext();
  const [mediaUploadProgress, setMediaUploadProgress] = useState(false);
  const [progress, setProgress] = useState(0); // Upload progress

  const handleInputChange = (
    index: number,
    field: string,
    value: boolean | string
  ) => {
    setCurriculumFormData((prev: CurriculumFormdataType[]) =>
      prev.map((lecture, i) =>
        i === index ? { ...lecture, [field]: value } : lecture
      )
    );
  };

  const handleUpload = async (
    videoFormData: FormData,
    index: number,
    onProgressCallback: (progress: number) => void
  ) => {
    try {
      setMediaUploadProgress(true);

      const res = await axios.post(
        "https://techtrail-x074.onrender.com/api/v1/media/upload",
        videoFormData,
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

      if (res.data.success) {
        // Update the specific lecture's videoUrl and public_id
        console.log(res.data);
        setCurriculumFormData((prev: CurriculumFormdataType[]) =>
          prev.map((lecture: CurriculumFormdataType, i: number) =>
            i === index
              ? {
                  ...lecture,
                  videoUrl: res.data.data.url,
                  public_id: res.data.data.public_id,
                }
              : lecture
          )
        );
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setMediaUploadProgress(false);
    }
  };

  const deleteVideo = async (id: string, index: number) => {
    try {
      const res = await axios.delete(
        `https://techtrail-x074.onrender.com/api/v1/media/delete/${id}`
      );
      if (res.data.success) {
        setCurriculumFormData((prev: CurriculumFormdataType[]) =>
          prev.map((lecture: CurriculumFormdataType, i: number) =>
            i === index
              ? {
                  ...lecture,
                  videoUrl: "",
                  public_id: "",
                }
              : lecture
          )
        );
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
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
  const handleRemoveLecture = (index: number, id: string) => {
    deleteVideo(id, index);
    setCurriculumFormData((prev: CurriculumFormdataType[]) =>
      prev.filter((_, i: number) => i !== index)
    );
  };

  const isCurriculumValid = (curriculumFormData: CurriculumFormdataType[]) => {
    if (!Array.isArray(curriculumFormData)) {
      return false; // Ensure the input is an array
    }

    return curriculumFormData.every((item) => {
      return (
        item &&
        typeof item === "object" &&
        typeof item.title === "string" &&
        typeof item.videoUrl === "string" &&
        item.title.trim() !== "" &&
        item.videoUrl.trim() !== ""
      );
    });
  };

  const bulkUplaodInputRef = useRef<HTMLInputElement>(null);
  const handleBulkUploadOpen = () => {
    bulkUplaodInputRef?.current?.click();
  };
  const handleMediaBulkUpload = async (
    bulkFormData: FormData,
    onProgressCallback: (progress: number) => void
  ) => {
    try {
      setMediaUploadProgress(true);

      const res = await axios.post(
        "https://techtrail-x074.onrender.com/api/v1/media/bulk-upload",
        bulkFormData,
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

      if (res.data.success) {
        // Create new lectures from bulk-uploaded data
        const newLectures = res.data.data.map(
          (file: FileType) => ({
            title: ``, // Default title for the lecture
            videoUrl: file.url, // URL from the upload response
            public_id: file.public_id, // Public ID from the upload response
            freePreview: false, // Default free preview to false
          })
        );

        setCurriculumFormData((prev: CurriculumFormdataType[]) => {
          // Check for empty lectures in the current curriculum
          let emptyLectureIndex = prev.findIndex(
            (lecture: CurriculumFormdataType) => !lecture.title.trim() && !lecture.videoUrl.trim() // Empty title and videoUrl
          );

          const updatedLectures = [...prev];

          // Replace empty lectures with bulk-uploaded lectures
          newLectures.forEach((newLecture: CurriculumFormdataType) => {
            if (emptyLectureIndex !== -1) {
              updatedLectures[emptyLectureIndex] = newLecture;
              emptyLectureIndex = updatedLectures.findIndex(
                (lecture: CurriculumFormdataType) =>
                  !lecture.title.trim() && !lecture.videoUrl.trim()
              ); // Find the next empty lecture
            } else {
              updatedLectures.push(newLecture); // Add to the curriculum if no empty lectures remain
            }
          });

          return updatedLectures;
        });

        console.log("Bulk upload completed. Updated lectures:", newLectures);
      }
    } catch (error) {
      console.error("Error uploading videos:", error);
    } finally {
      setMediaUploadProgress(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
           <h2 className="text-2xl font-black tracking-tight text-white mb-2">Curriculum Builder</h2>
           <p className="text-gray-400 text-sm">Upload video modules and structure your learning trails.</p>
        </div>
        <div>
          <Input
            type="file"
            ref={bulkUplaodInputRef}
            accept="video/*"
            multiple
            className="hidden"
            id="bulk-media-upload"
            onChange={(e) => {
              const files = e.target.files ? Array.from(e.target.files) : [];
              if (files.length > 0) {
                const bulkFormData = new FormData();
                files.forEach((fileItem) =>
                  bulkFormData.append("files", fileItem)
                );
                handleMediaBulkUpload(bulkFormData, setProgress);
              }
            }}
          />
          <Button 
            variant="outline" 
            onClick={handleBulkUploadOpen}
            className="bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-xl shadow-lg transition-all h-12 px-6"
          >
            <Upload className="w-4 h-5 mr-2 text-blue-400" /> Bulk Upload
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {curriculumFormData.map((curriculum, index) => (
          <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl relative overflow-hidden backdrop-blur-md transition-all hover:bg-white/[0.03]" key={index}>
            {/* Edge decorative line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 opacity-50"></div>
            
            <div className="flex flex-col xl:flex-row gap-5 xl:items-center">
              <div className="min-w-32">
                 <h3 className="text-xl font-bold text-white tracking-tight">Lecture {index + 1}</h3>
              </div>
              <Input
                name="title"
                placeholder="Enter lecture title..."
                value={curriculum.title}
                onChange={(e) =>
                  handleInputChange(index, "title", e.target.value)
                }
                className="flex-1 bg-white/5 border-white/10 h-12 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-white placeholder:text-gray-600 transition-all font-medium"
              />
              <div className="flex items-center space-x-3 bg-white/5 p-2 pr-4 rounded-xl border border-white/5">
                 <div className="bg-white/5 p-2 rounded-lg">
                    <Switch
                      checked={curriculum.freePreview}
                      id={`freePreview.${index + 1}`}
                      className="data-[state=checked]:bg-blue-600"
                      onCheckedChange={(checked) =>
                        handleInputChange(index, "freePreview", checked)
                      }
                    />
                 </div>
                <Label htmlFor={`freePreview.${index + 1}`} className="text-gray-300 font-semibold cursor-pointer">
                  Free Preview
                </Label>
              </div>
              <Button
                variant="ghost"
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl h-12 w-12 xl:w-auto p-0 xl:px-4 shrink-0 transition-colors"
                onClick={() =>
                  handleRemoveLecture(index, curriculum.public_id)
                }
              >
                <span className="hidden xl:inline">Remove</span>
                <span className="xl:hidden">✕</span>
              </Button>
            </div>
            
            <div className="mt-6">
              {curriculum.videoUrl ? (
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 bg-black/40 rounded-xl border border-white/5">
                  <div className="rounded-lg overflow-hidden border border-white/10 shadow-xl shadow-black/50">
                    <VideoPlayer
                      url={curriculum.videoUrl}
                      width="350px"
                      height="197px"
                    />
                  </div>
                  <div className="flex flex-col gap-3 w-full sm:w-auto">
                    <Button
                      className="bg-white/10 hover:bg-white/20 text-white rounded-xl h-10 w-full sm:w-auto transition-colors"
                      onClick={() => deleteVideo(curriculum.public_id, index)}
                    >
                      Replace Video
                    </Button>
                    <Button
                      className="bg-red-600/20 text-red-500 hover:bg-red-600/40 hover:text-red-100 rounded-xl h-10 w-full sm:w-auto transition-colors"
                      onClick={() =>
                        handleRemoveLecture(index, curriculum.public_id)
                      }
                    >
                      Delete Lecture
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]; // Safely access the file
                      if (file) {
                        const videoFormData = new FormData();
                        videoFormData.append("file", file);
                        handleUpload(videoFormData, index, setProgress);
                      } else {
                        setCurriculumFormData((prev: CurriculumFormdataType[]) =>
                          prev.map((lecture: CurriculumFormdataType, i: number) =>
                            i === index
                              ? {
                                  ...lecture,
                                  videoUrl: "",
                                  public_id: "",
                                }
                              : lecture
                          )
                        );
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 rounded-xl transition-all cursor-pointer">
                     <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-3">
                        <Upload className="w-6 h-6 text-blue-400" />
                     </div>
                     <p className="text-white font-semibold mb-1">Click to browse or drag & drop</p>
                     <p className="text-gray-500 text-sm">MP4, WebM, or OGG video format</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        
        <Button
          onClick={handleNewLecture}
          disabled={!isCurriculumValid(curriculumFormData)}
          className="w-full bg-white/5 hover:bg-white/10 border-2 border-dashed border-white/20 text-white h-16 rounded-2xl transition-all active:scale-[0.99] disabled:opacity-50 mt-4 font-bold tracking-wider"
        >
          + Add New Lecture
        </Button>
      </div>
      
      {/* Include the MediaProgressBar */}
      <MediaProgressBar
        isMediaUploading={mediaUploadProgress}
        progress={progress}
      />
    </div>
  );
};

export default Curriculum;
