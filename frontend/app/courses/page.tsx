/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { CourseList, useStudentContext } from "@/context/studentContext";
import axiosInstance from "@/api/axiosInstance";
import { ArrowUpDownIcon, Filter, Layers, Users, BookOpen, Search } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { Sidebar } from "primereact/sidebar";
import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * High-Fidelity Modernized Courses Page for TechTrail
 */
const Page = () => {
  const [visible, setVisible] = useState(false);
  const [courseLoading, setCourseLoading] = useState(false);
  const searchParams = useSearchParams();
  const initialSort = "price-lowtohigh";

  const [first, setFirst] = useState(0);
  const rows = 5;
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
    setFilteredCourses,
    filteredCourses,
    loadingState,
    setLoadingState,
  } = useStudentContext();
  const router = useRouter();

  const fetchStudentCourses = useCallback(async (
    filters: Filters,
    sort: string,
    page = 1,
    limit = 5
  ) => {
    setCourseLoading(true);
    //@ts-expect-error typescript error
    const query = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters,
      sortBy: sort,
    });
    try {
      const res = await axiosInstance.get(`/api/v1/student/get?${query}`);
      if (res.data.success) {
        setStudentCourseList(res.data.data);
        setFilteredCourses(res.data.data);
        setTotalRecords(res.data.totalCourses);
      }
    } catch (error) {
      setStudentCourseList([]);
      console.error(error);
    } finally {
      setCourseLoading(false);
    }
  }, [setStudentCourseList, setFilteredCourses]);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    fetchStudentCourses(filters, sort, event.page + 1, rows);
  };

  const updateQueryParams = useCallback((newFilters: Filters, sortBy: string) => {
    const queryParams = new URLSearchParams(searchParams.toString());
    Object.entries(newFilters).forEach(([section, values]) => {
      if (values.length > 0) {
        queryParams.set(section, values.join(","));
      } else {
        queryParams.delete(section);
      }
    });
    queryParams.set("sort", sortBy);
    router.push(`?${queryParams.toString()}`, { scroll: false });
  }, [searchParams, router]);

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
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    updateQueryParams(filters, value);
  };

  useEffect(() => {
    const storedFilters = sessionStorage.getItem("filters");
    if (storedFilters) {
      setFilters(JSON.parse(storedFilters));
    }
    setLoadingState(false);
  }, [setLoadingState]);

  useEffect(() => {
    if (!loadingState) {
      fetchStudentCourses(filters, sort);
    }
  }, [filters, sort, loadingState, fetchStudentCourses]);

  useEffect(() => {
    const params: Filters = {};
    Object.keys(filterOptions).forEach((key) => {
      const value = searchParams.get(key);
      if (value) params[key as FilterSections] = value.split(",");
    });
    setFilters(params);
    const sortValue = searchParams.get("sort");
    if (sortValue) setSort(sortValue);
  }, [searchParams]);

  const FilterSidebarContent = () => (
    <div className="space-y-8 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="size-5 text-blue-500" />
        <h2 className="text-xl font-bold tracking-tight">Refine Results</h2>
      </div>
      {Object.keys(filterOptions).map((keyItem) => {
        const typedKeyItem = keyItem as keyof typeof filterOptions;
        return (
          <div key={typedKeyItem} className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
              <span className="w-4 h-px bg-gray-800"></span>
              {typedKeyItem}
            </h3>
            <div className="grid gap-3">
              {filterOptions[typedKeyItem].map((option) => (
                <Label
                  key={option.id}
                  className="flex items-center gap-3 group cursor-pointer transition-colors hover:text-blue-400"
                >
                  <Checkbox
                    checked={filters[typedKeyItem]?.includes(option.id) || false}
                    onCheckedChange={() => handleCheckedChange(typedKeyItem, option)}
                    className="border-gray-700 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                    {option.label}
                  </span>
                </Label>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 text-blue-500 mb-2">
               <Layers className="size-5" />
               <span className="text-sm font-bold uppercase tracking-widest italic">All Trails</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter">Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Expert Trails</span></h1>
            <p className="text-gray-500 mt-4 max-w-md">Embark on a journey through curated knowledge paths led by industry professionals.</p>
          </motion.div>

          <div className="flex items-center gap-4">
             <div className="bg-white/5 border border-white/10 rounded-full px-4 py-2 flex items-center gap-2">
                <Search className="size-4 text-gray-500" />
                <span className="text-sm text-gray-500 font-medium">{totalRecords} Results Found</span>
             </div>
             
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 rounded-full py-6 transition-all px-6">
                    <ArrowUpDownIcon className="mr-2 size-4" /> 
                    <span className="font-bold">Sort By</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#0f0f0f] border-white/10 text-white min-w-48">
                  <DropdownMenuRadioGroup value={sort} onValueChange={handleSortChange}>
                    {sortOptions.map((item) => (
                      <DropdownMenuRadioItem key={item.id} value={item.id} className="focus:bg-blue-600 focus:text-white cursor-pointer py-3">
                        {item.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
             </DropdownMenu>

             <Button 
               variant="outline" 
               className="lg:hidden bg-blue-600 border-none hover:bg-blue-700 rounded-full py-6"
               onClick={() => setVisible(true)}
             >
                <Filter className="mr-2 size-4" /> Filter
             </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar - Desktop */}
          <motion.aside 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden lg:block w-72 shrink-0 h-fit sticky top-32 bg-white/[0.02] border border-white/10 rounded-3xl backdrop-blur-xl"
          >
            <FilterSidebarContent />
          </motion.aside>

          {/* Sidebar - Mobile */}
          <Sidebar
            visible={visible}
            onHide={() => setVisible(false)}
            className="w-full bg-[#050505] border-r border-white/10"
            content={({ hide }) => (
               <div className="h-full overflow-y-auto">
                  <div className="flex justify-end p-4">
                     <button onClick={hide} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        ✕
                     </button>
                  </div>
                  <FilterSidebarContent />
               </div>
            )}
          />

          {/* Main Course List */}
          <div className="flex-1 space-y-6">
            <AnimatePresence mode="wait">
              {courseLoading ? (
                <div className="space-y-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-48 shimmer border border-white/10 rounded-3xl" />
                  ))}
                </div>
              ) : filteredCourses && filteredCourses.length > 0 ? (
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {filteredCourses.map((course: CourseList, i: number) => (
                    <motion.div
                      key={course._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link href={`/courses/${course._id}`}>
                        <Card className="group bg-white/[0.02] border-white/10 hover:border-blue-500/50 hover:bg-white/[0.04] transition-all duration-300 rounded-3xl overflow-hidden cursor-pointer backdrop-blur-sm">
                          <CardContent className="p-0 flex flex-col md:flex-row items-stretch">
                            <div className="md:w-64 h-48 md:h-auto overflow-hidden">
                              <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <div className="flex-1 p-6 flex flex-col">
                              <div className="flex justify-between items-start mb-4">
                                <span className="bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-blue-500/20">
                                  {course.category}
                                </span>
                                <span className="text-2xl font-black text-white">${course.price}</span>
                              </div>
                              
                              <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                                {course.title}
                              </h3>
                              
                              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                                <div className="flex items-center gap-1.5">
                                   <Users className="size-4" />
                                   <span>{course.instructorName}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                   <BookOpen className="size-4" />
                                   <span>{course.curriculum.length} Lectures</span>
                                </div>
                                <span className="text-xs bg-white/5 px-2 py-0.5 rounded border border-white/10 italic">
                                   {course.level}
                                </span>
                              </div>

                              <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                                <span className="text-xs font-medium text-gray-600">Updated recently</span>
                                <div className="text-blue-500 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                                   View Trail <span className="text-lg">→</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                   <div className="bg-white/5 p-8 rounded-full mb-6 italic text-gray-500">
                      Empty Trail
                   </div>
                   <h2 className="text-3xl font-bold mb-2">No courses found</h2>
                   <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                </div>
              )}
            </AnimatePresence>

            <div className="pt-12">
               <Paginator
                first={first}
                rows={rows}
                totalRecords={totalRecords}
                onPageChange={onPageChange}
                className="bg-transparent border-none p-0 custom-paginator"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-paginator .p-paginator-page,
        .custom-paginator .p-paginator-next,
        .custom-paginator .p-paginator-last,
        .custom-paginator .p-paginator-first,
        .custom-paginator .p-paginator-prev {
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: white !important;
          border-radius: 12px !important;
          margin: 0 4px !important;
          transition: all 0.3s ease !important;
        }
        .custom-paginator .p-paginator-page.p-highlight {
          background: #2563eb !important;
          border-color: #2563eb !important;
        }
        .custom-paginator .p-paginator-page:hover:not(.p-highlight) {
          background: rgba(255, 255, 255, 0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default Page;
