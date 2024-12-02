import React from "react";
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

const CourseLandingPage = () => {
  return (
    <div>
      Course Landing Page
      <div className="mt-5 space-y-1">
        <Label htmlFor="title">Title</Label>
        <Input name="title" placeholder="Enter course title" />
      </div>
      <div className="mt-3 space-y-1">
        <Label htmlFor="title">Category</Label>
        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder="Select a Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* <SelectLabel>Fruits</SelectLabel> */}
              {courseCategories.map((category) => {
                return (
                  <SelectItem value={category.id} key={category.id}>
                    {category.label}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-3 space-y-1">
        <Label htmlFor="level">Level</Label>
        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder="Select a level" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* <SelectLabel>Fruits</SelectLabel> */}
              {courseLevelOptions.map((category) => {
                return (
                  <SelectItem value={category.id} key={category.id}>
                    {category.label}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>{" "}
      <div className="mt-3 space-y-1">
        <Label htmlFor="language">Primary Language</Label>
        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder="Select a Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* <SelectLabel>Fruits</SelectLabel> */}
              {languageOptions.map((category) => {
                return (
                  <SelectItem value={category.id} key={category.id}>
                    {category.label}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-3 space-y-1">
        <Label htmlFor="title">Subtitle</Label>
        <Input name="title" placeholder="Enter course subtitle" />
      </div>
      <div className="mt-3 space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea name="title" placeholder="Enter course description" />
      </div>{" "}
      <div className="mt-3 space-y-1">
        <Label htmlFor="price">Price</Label>
        <Input type="number" name="title" placeholder="Enter course pricing" />
      </div>
      <div className="mt-3 space-y-1">
        <Label htmlFor="objectives">objectives</Label>
        <Textarea name="title" placeholder="Enter course description" />
      </div>{" "}<div className="mt-3 space-y-1">
        <Label htmlFor="objectives">Welcome Message</Label>
        <Textarea name="welcomeMessage" placeholder="Welcome messagefor the students" />
      </div>{" "}
    </div>
  );
};

export default CourseLandingPage;
