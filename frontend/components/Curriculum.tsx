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
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Create course curriculum</CardTitle>
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
          <Button variant="outline" onClick={handleBulkUploadOpen}>
            <Upload className="w-4 h-5 mr-2" /> Bulk upload
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Button
          onClick={handleNewLecture}
          disabled={!isCurriculumValid(curriculumFormData)}
        >
          Add lecture
        </Button>
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
                  onClick={() =>
                    handleRemoveLecture(index, curriculum.public_id)
                  }
                >
                  Remove
                </Button>
              </div>
              <div className="mt-4">
                {curriculum.videoUrl ? (
                  <div className="flex gap-3 ">
                    <VideoPlayer
                      url={curriculum.videoUrl}
                      width="450px"
                      height="200px"
                    />
                    <Button
                      onClick={() => deleteVideo(curriculum.public_id, index)}
                    >
                      Replace video
                    </Button>{" "}
                    <Button
                      className="bg-red-700"
                      onClick={() =>
                        handleRemoveLecture(index, curriculum.public_id)
                      }
                    >
                      Delete lecture
                    </Button>
                  </div>
                ) : (
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]; // Safely access the file
                      if (file) {
                        const videoFormData = new FormData();
                        videoFormData.append("file", file);
                        handleUpload(videoFormData, index, setProgress);
                        // handleInputChange(index, "videoUrl", file);
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
                    className="mb-4 cursor-pointer"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Include the MediaProgressBar */}
        <MediaProgressBar
          isMediaUploading={mediaUploadProgress}
          progress={progress}
        />
      </CardContent>
    </Card>
  );
};

export default Curriculum;
