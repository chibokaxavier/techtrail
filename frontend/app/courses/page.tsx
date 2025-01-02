"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  FilterOption,
  filterOptions,
  Filters,
  FilterSections,
  sortOptions,
} from "@/config/utils";
import { useStudentContext } from "@/context/studentContext";
import axios from "axios";
import { ArrowUpDownIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const page = () => {
  // const [sort, setSort] = useState("price-lowtohigh");
  const [filters, setFilters] = useState<Filters>({});
  const [sort, setSort] = useState<FilterOption["id"]>("price-lowtohigh");
  const { setStudentCourseList, studentCourseList } = useStudentContext();

  const fetchStudentCourses = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/student/get");
      if (res.data.success) {
        setStudentCourseList(res.data.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchStudentCourses();
  }, []);
  const handleCheckedChange = (
    sectionId: FilterSections,
    option: FilterOption
  ) => {
    // Create a copy of the filters
    let cpyFilters: Filters = { ...filters };

    // Check if the section already exists in the filters
    if (!cpyFilters[sectionId]) {
      // Initialize as an array with the selected option
      cpyFilters[sectionId] = [option.id];
    } else {
      // Check if the option already exists in the section
      const indexOfCurrentOption = cpyFilters[sectionId]?.indexOf(option.id);

      if (indexOfCurrentOption === -1) {
        // Add the option if it doesn't exist
        cpyFilters[sectionId]!.push(option.id);
      } else {
        // Remove the option if it already exists
        cpyFilters[sectionId]!.splice(indexOfCurrentOption, 1);
      }
    }

    // Update the state and session storage
    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));

    console.log("Updated filters:", cpyFilters);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4  sm:px-6 lg:px-8 py-4">
      <h1 className="text-3xl font-bold mb-4">All Courses</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <aside className="w-full md:w-64 space-y-4">
          <div className="p-4 space-y-4">
            {Object.keys(filterOptions).map((keyItem) => {
              const typedKeyItem = keyItem as keyof typeof filterOptions; // Type assertion
              return (
                <div className="p-4 space-y-4" key={typedKeyItem}>
                  <h3 className="font-bold mb-3">
                    {typedKeyItem.toUpperCase()}
                  </h3>
                  <div className="grid gap-2 mt-2">
                    {filterOptions[typedKeyItem].map((option) => (
                      <Label
                        className="flex items-center gap-3 font-normal"
                        key={option.id}
                      >
                        <Checkbox
                          // checked={false}
                          onCheckedChange={() =>
                            handleCheckedChange(typedKeyItem, option)
                          }
                        />
                        {option.label}
                      </Label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
        <main className="flex-1">
          <div className="flex justify-end items-center mb-4 gap-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center p-5 gap-1" size="sm">
                  <ArrowUpDownIcon className="size-4" />{" "}
                  <span className="text-[16px]">Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="absolute z-50 mt-2 w-48 bg-white shadow-lg border rounded-md">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={(value) => setSort(value)}
                >
                  {sortOptions.map((sortItem: any) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-sm text-black font-bold">
              {studentCourseList?.length} Results
            </span>
          </div>
          <div className="space-y-4">
            {studentCourseList && studentCourseList.length > 0
              ? studentCourseList.map((course: any, i: number) => (
                  <Card className="cursor-pointer" key={course.id}>
                    <CardContent className="flex gap-4 p-4">
                      <div className="w-48 h-32 flex-shrink-0">
                        <img
                          src={course.image}
                          alt="course-image"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">
                          {course.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mb-1">
                          Created by{" "}
                          <span className="font-bold">
                            {course?.instructorName}
                          </span>
                        </p>
                        <p className="text-18 text-gray-600 mt-3 mb-2">
                          {`${course?.curriculum?.length} ${
                            course?.curriculum?.length <= 1
                              ? "Lecture"
                              : "Lectures"
                          } - ${course?.level.toUpperCase()} Level`}
                        </p>
                        <p className="font-bold text-lg">${course?.price}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              : "No courses found"}
          </div>
        </main>
      </div>
    </div>
  );
};

export default page;
