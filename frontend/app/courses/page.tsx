"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
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
import { ArrowUpDownIcon, Filter } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Paginator } from "primereact/paginator";
import { Sidebar } from "primereact/sidebar";
import React, { useEffect, useState } from "react";

const page = () => {
  // const [filters, setFilters] = useState<Filters>({});
  // const [sort, setSort] = useState<FilterOption["id"]>("price-lowtohigh");
  const { setGlobalParamId, globalParamId } = useStudentContext();
  const [visible, setVisible] = useState(false);
  const [courseLoading, setCourseLoading] = useState(false);
  const searchParams = useSearchParams();
  const initialSort = "price-lowtohigh";
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const transactionsPerPage = 10;
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);

  const initialFilters: Filters = {};
  Object.keys(filterOptions).forEach((key) => {
    const value = searchParams.get(key);
    if (value) {
      initialFilters[key as FilterSections] = value.split(",");
    }
  });

  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [sort, setSort] = useState<FilterOption["id"]>(
    searchParams.get("sort") || initialSort
  );
  const {
    setStudentCourseList,
    studentCourseList,
    setFilteredCourses,
    filteredCourses,
    loadingState,
    setLoadingState,
  } = useStudentContext();
  const router = useRouter();

  const fetchStudentCourses = async (
    filters: any,
    sort: any,
    page = 1,
    limit = 5
  ) => {
    setCourseLoading(true);
    const query = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters,
      sortBy: sort,
    });
    try {
      const res = await axios.get(
        `http://localhost:4000/api/v1/student/get?${query}`
      );
      console.log(res.data);
      if (res.data.success) {
        setStudentCourseList(res.data.data);
        setFilteredCourses(res.data.data);
        setCourseLoading(false);
        setTotalRecords(res.data.totalCourses);
      }
    } catch (error) {
      setStudentCourseList([]);
      console.log(studentCourseList);
      setCourseLoading(false);
      console.error(error);
    }
  };

  const onPageChange = (event: any) => {
    setFirst(event.first);
    setCurrentPage(event.page + 1); // PrimeReact uses zero-based index
    fetchStudentCourses(filters, sort, event.page + 1, rows);
  };
  // Helper function to update query string
  const updateQueryParams = (newFilters: Filters, sortBy: any) => {
    const queryParams = new URLSearchParams(searchParams as any);

    // Add/Update filters
    Object.entries(newFilters).forEach(([section, values]) => {
      if (values.length > 0) {
        queryParams.set(section, values.join(","));
      } else {
        queryParams.delete(section);
      }
    });

    // Update sort option
    queryParams.set("sort", sortBy);

    // Push the updated URL
    router.push(`?${queryParams.toString()}`, { scroll: false });
  };

  const handleCheckedChange = (
    sectionId: FilterSections,
    option: FilterOption
  ) => {
    const updatedFilters: Filters = { ...filters };

    if (!updatedFilters[sectionId]) {
      updatedFilters[sectionId] = [option.id];
    } else {
      const index = updatedFilters[sectionId]?.indexOf(option.id);
      if (index === -1) {
        updatedFilters[sectionId]!.push(option.id);
      } else {
        updatedFilters[sectionId]!.splice(index, 1);
      }
    }

    setFilters(updatedFilters);
    sessionStorage.setItem("filters", JSON.stringify(updatedFilters));
    updateQueryParams(updatedFilters, sort);
    if (Object.keys(filters).length > 0 && sort) {
      console.log(filters, sort);
      fetchStudentCourses(filters, sort);
    }
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    updateQueryParams(filters, value);
  };

  useEffect(() => {
    const storedFilters = sessionStorage.getItem("filters");
    if (storedFilters) {
      const parsedFilters = JSON.parse(storedFilters);
      setFilters(parsedFilters);
    }
    setLoadingState(false); // Initialization complete
    console.log(globalParamId);
  }, []);
  useEffect(() => {
    // Sync filters with sessionStorage whenever they change
    sessionStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    if (!loadingState) {
      fetchStudentCourses(filters, sort);
    }
  }, [filters, sort, loadingState]);

  useEffect(() => {
    fetchStudentCourses(filters, sort, currentPage, rows);
  }, [filters, sort, currentPage, rows]);
  useEffect(() => {
    const params: Filters = {};

    // Populate filters from URL
    Object.keys(filterOptions).forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        params[key as FilterSections] = value.split(",");
      }
    });

    // Set initial state from URL
    setFilters(params);

    // Set sort from URL
    const sortValue = searchParams.get("sort");
    if (sortValue) {
      setSort(sortValue);
    }
  }, [searchParams]);

  console.log(globalParamId);

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-20 text-white">
      <h1 className="text-3xl font-bold mb-4">All Courses</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <Sidebar
          visible={visible}
          position="left"
          onHide={() => setVisible(false)}
        >
          <aside className="w-full md:w-64 space-y-4">
            <div className="p-4 space-y-4">
              {Object.keys(filterOptions).map((keyItem) => {
                const typedKeyItem = keyItem as keyof typeof filterOptions;
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
                            checked={
                              filters[typedKeyItem]?.includes(option.id) ||
                              false
                            }
                            onCheckedChange={() =>
                              handleCheckedChange(typedKeyItem, option)
                            }
                            className="bg-white"
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
        </Sidebar>

        <aside className="w-full md:w-64 space-y-4 hidden lg:block">
          <div className="p-4 space-y-4">
            {Object.keys(filterOptions).map((keyItem) => {
              const typedKeyItem = keyItem as keyof typeof filterOptions;
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
                          checked={
                            filters[typedKeyItem]?.includes(option.id) || false
                          }
                          onCheckedChange={() =>
                            handleCheckedChange(typedKeyItem, option)
                          }
                          className="bg-white"
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
            <button
              onClick={() => setVisible(true)}
              className="flex items-center justify-center gap-2 lg:hidden"
            >
              <Filter /> Filter
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center p-5 gap-1" size="sm">
                  <ArrowUpDownIcon className="size-4" />{" "}
                  <span className="text-[16px]">Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="absolute z-50 mt-2 w-48  shadow-lg border rounded-md">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={handleSortChange}
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
            <span className="text-sm  font-bold">
              {filteredCourses?.length} Results
            </span>
          </div>
          <div className="space-y-4 ">
            {filteredCourses && filteredCourses.length > 0 ? (
              filteredCourses.map((course: any, i: number) => (
                <Link href={`/courses/${course._id}`}>
                  <div className="bg-black rounded-md">
                    <Card
                      className="cursor-pointer text-white bg-inherit border-0 my-2"
                      key={course.id}
                    >
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
                          <p className="text-sm  mb-1">
                            Created by{" "}
                            <span className="font-bold">
                              {course?.instructorName}
                            </span>
                          </p>
                          <p className="text-18  mt-3 mb-2">
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
                  </div>
                </Link>
              ))
            ) : courseLoading ? (
              <>
                <div className=" h-40 bg-gray-100 animate-pulse duration-900 rounded"></div>
                <div className=" h-40 bg-gray-100 animate-pulse duration-900 rounded"></div>
                <div className=" h-40 bg-gray-100 animate-pulse duration-900 rounded"></div>
                <div className=" h-40 bg-gray-100 animate-pulse duration-900 rounded"></div>
                <div className=" h-40 bg-gray-100 animate-pulse duration-900 rounded"></div>
              </>
            ) : (
              <h1 className="font-extrabold text-4xl">No courses found</h1>
            )}
          </div>
          <Paginator
            first={first}
            rows={rows}
            totalRecords={totalRecords} // Ensure this is updated dynamically
            onPageChange={onPageChange}
          />
        </main>
      </div>
    </div>
  );
};

export default page;
