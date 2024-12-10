"use client";
import React, { useContext, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  courseCategories,
  courseLevelOptions,
  languageOptions,
} from "@/config/utils";
import { Textarea } from "./ui/textarea";
import { useStoreContext } from "@/context/authContext";
import { useRouter } from "next/navigation";

const CourseLandingPage = () => {
  const { formData, setFormData } = useStoreContext();
  const router = useRouter();

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted Form Data:", formData);

    // Add submission logic (e.g., API call) here
  };

  console.log(formData);

  return (
    <>
      <form onSubmit={handleSubmit} className="p-5 space-y-5">
        <h1 className="text-2xl font-bold">Course Landing Page</h1>

        {/* Title */}
        <div className="space-y-1">
          <Label htmlFor="title">Title</Label>
          <Input
            name="title"
            placeholder="Enter course title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        {/* Category */}
        <div className="space-y-1">
          <Label htmlFor="category">Category</Label>
          <Select
            onValueChange={(value) => handleSelectChange("category", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {courseCategories.map((category) => (
                  <SelectItem value={category.id} key={category.id}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Level */}
        <div className="space-y-1">
          <Label htmlFor="level">Level</Label>
          <Select onValueChange={(value) => handleSelectChange("level", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {courseLevelOptions.map((level) => (
                  <SelectItem value={level.id} key={level.id}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Language */}
        <div className="space-y-1">
          <Label htmlFor="language">Primary Language</Label>
          <Select
            onValueChange={(value) => handleSelectChange("language", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {languageOptions.map((language) => (
                  <SelectItem value={language.id} key={language.id}>
                    {language.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Subtitle */}
        <div className="space-y-1">
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            name="subtitle"
            placeholder="Enter course subtitle"
            value={formData.subtitle}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            placeholder="Enter course description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Price */}
        <div className="space-y-1">
          <Label htmlFor="price">Price</Label>
          <Input
            type="number"
            name="price"
            placeholder="Enter course price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        {/* Objectives */}
        <div className="space-y-1">
          <Label htmlFor="objectives">Objectives</Label>
          <Textarea
            name="objectives"
            placeholder="Enter course objectives"
            value={formData.objectives}
            onChange={handleChange}
          />
        </div>

        {/* Welcome Message */}
        <div className="space-y-1">
          <Label htmlFor="welcomeMessage">Welcome Message</Label>
          <Textarea
            name="welcomeMessage"
            placeholder="Enter a welcome message for the students"
            value={formData.welcomeMessage}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
      </form>
      {/* <button
        type="submit"
        onClick={() => router.back()}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Save Course
      </button> */}
    </>
  );
};

export default CourseLandingPage;
