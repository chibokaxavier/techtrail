"use client";
import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
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

type FormDataType = {
  [key: string]: string; // Allows dynamic keys (e.g., 'name', 'email', etc.), all with string values
};
const CourseLandingPage = () => {
  const { formData, setFormData } = useStoreContext();

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: FormDataType) => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev: FormDataType) => ({ ...prev, [name]: value }));
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
      <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-500">
        <div className="mb-2">
           <h2 className="text-2xl font-black tracking-tight text-white">Trail Details</h2>
           <p className="text-gray-400 text-sm">Provide foundational metadata to make your trail discoverable.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Title */}
           <div className="space-y-2 col-span-1 md:col-span-2">
             <Label htmlFor="title" className="text-gray-300 font-semibold">Title</Label>
             <Input
               name="title"
               placeholder="e.g. Advanced System Architecture"
               value={formData.title}
               onChange={handleChange}
               className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-white placeholder:text-gray-600 transition-all font-medium"
             />
           </div>

           {/* Subtitle */}
           <div className="space-y-2 col-span-1 md:col-span-2">
             <Label htmlFor="subtitle" className="text-gray-300 font-semibold">Subtitle</Label>
             <Input
               name="subtitle"
               placeholder="A brief compelling hook for the trail"
               value={formData.subtitle}
               onChange={handleChange}
               className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-white placeholder:text-gray-600 transition-all font-medium"
             />
           </div>

           {/* Category */}
           <div className="space-y-2">
             <Label htmlFor="category" className="text-gray-300 font-semibold">Category</Label>
             <Select
               defaultValue={formData.category}
               onValueChange={(value) => handleSelectChange("category", value)}
             >
               <SelectTrigger className="bg-white/5 border-white/10 h-12 rounded-xl text-white font-medium focus:ring-blue-500 focus:border-blue-500 transition-all">
                 <SelectValue placeholder="Select a Domain" />
               </SelectTrigger>
               <SelectContent className="bg-gray-900 border-white/10 text-white rounded-xl">
                 <SelectGroup>
                   {courseCategories.map((category) => (
                     <SelectItem value={category.id} key={category.id} className="focus:bg-blue-600/30">
                       {category.label}
                     </SelectItem>
                   ))}
                 </SelectGroup>
               </SelectContent>
             </Select>
           </div>

           {/* Level */}
           <div className="space-y-2">
             <Label htmlFor="level" className="text-gray-300 font-semibold">Level</Label>
             <Select
               defaultValue={formData.level}
               onValueChange={(value) => handleSelectChange("level", value)}
             >
               <SelectTrigger className="bg-white/5 border-white/10 h-12 rounded-xl text-white font-medium focus:ring-blue-500 focus:border-blue-500 transition-all">
                 <SelectValue placeholder="Difficulty Tier" />
               </SelectTrigger>
               <SelectContent className="bg-gray-900 border-white/10 text-white rounded-xl">
                 <SelectGroup>
                   {courseLevelOptions.map((level) => (
                     <SelectItem value={level.id} key={level.id} className="focus:bg-blue-600/30">
                       {level.label}
                     </SelectItem>
                   ))}
                 </SelectGroup>
               </SelectContent>
             </Select>
           </div>

           {/* Language */}
           <div className="space-y-2">
             <Label htmlFor="language" className="text-gray-300 font-semibold">Primary Language</Label>
             <Select
               defaultValue={formData.language}
               onValueChange={(value) => handleSelectChange("language", value)}
             >
               <SelectTrigger className="bg-white/5 border-white/10 h-12 rounded-xl text-white font-medium focus:ring-blue-500 focus:border-blue-500 transition-all">
                 <SelectValue placeholder="Language Dialect" />
               </SelectTrigger>
               <SelectContent className="bg-gray-900 border-white/10 text-white rounded-xl">
                 <SelectGroup>
                   {languageOptions.map((language) => (
                     <SelectItem value={language.id} key={language.id} className="focus:bg-blue-600/30">
                       {language.label}
                     </SelectItem>
                   ))}
                 </SelectGroup>
               </SelectContent>
             </Select>
           </div>

           {/* Price */}
           <div className="space-y-2">
             <Label htmlFor="price" className="text-gray-300 font-semibold">Price (USD)</Label>
             <Input
               type="number"
               name="price"
               placeholder="0.00"
               value={formData.price}
               onChange={handleChange}
               className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-white placeholder:text-gray-600 transition-all font-medium font-mono"
             />
           </div>

           {/* Description */}
           <div className="space-y-2 col-span-1 md:col-span-2">
             <Label htmlFor="description" className="text-gray-300 font-semibold">Description</Label>
             <Textarea
               name="description"
               placeholder="Provide a comprehensive breakdown of the trail..."
               value={formData.description}
               onChange={handleChange}
               className="bg-white/5 border-white/10 min-h-32 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-white placeholder:text-gray-600 transition-all font-medium resize-none"
             />
           </div>

           {/* Objectives */}
           <div className="space-y-2 col-span-1 md:col-span-2">
             <Label htmlFor="objectives" className="text-gray-300 font-semibold">Objectives (Comma Separated)</Label>
             <Textarea
               name="objectives"
               placeholder="Learn React, Master Next.js, Deploy to Vercel"
               value={formData.objectives}
               onChange={handleChange}
               className="bg-white/5 border-white/10 min-h-24 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-white placeholder:text-gray-600 transition-all font-medium resize-none"
             />
           </div>

           {/* Welcome Message */}
           <div className="space-y-2 col-span-1 md:col-span-2">
             <Label htmlFor="welcomeMessage" className="text-gray-300 font-semibold">Welcome Message</Label>
             <Textarea
               name="welcomeMessage"
               placeholder="Greeting delivered upon enrollment..."
               value={formData.welcomeMessage}
               onChange={handleChange}
               className="bg-white/5 border-white/10 min-h-24 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-white placeholder:text-gray-600 transition-all font-medium resize-none"
             />
           </div>
        </div>
      </form>
    </>
  );
};

export default CourseLandingPage;
