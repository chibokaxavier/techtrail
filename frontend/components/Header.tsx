"use client";
import {
  BarChart,
  BookDown,
  BookOpen,
  GraduationCap,
  LaptopMinimal,
  Menu,
  MoonIcon,
  NotebookPen,
  Search,
  SunIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useStoreContext } from "@/context/authContext";
import { Input } from "./ui/input";
import { Sidebar } from "primereact/sidebar";
import MobileNav from "./MobileNav";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [visible, setVisible] = useState(false);
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };
  const pathname = usePathname();
  const { setAuth, setToken } = useStoreContext();
  const handleConfirm = () => {
    setAuth({ authenticate: false, user: null });
    setToken(null);
    localStorage.removeItem("token");
  };

  const excludedPaths = "/instructor";

  const isHeaderExcluded =
    pathname.includes("/instructor") || pathname.includes("/auth");

  if (isHeaderExcluded) {
    return null;
  }

  return (
    <header className="  fixed top-0 left-0 w-full z-50 dark:bg-gray-900 text-gray-300 ">
      <div className="  py-4 lg:py-0 lg:px-0 px-4 lg:justify-normal lg:block flex  justify-between lg:items-center ">
        <Link href={"/"} className="flex items-center justify-center lg:hidden">
          <LaptopMinimal className="md:mr-5 mr-2 md:size-8 size-6 " />{" "}
          <span className=" text-lg md:text-xl font-extrabold">TechTrail</span>
        </Link>
        <div className="lg:flex items-center justify-between hidden  max-w-screen-xl mx-auto px-4  py-5 sm:px-6 lg:px-8">
          <Link href={"/"} className="flex items-center justify-center">
            <LaptopMinimal className="mr-5 size-10 " />{" "}
            <span className="text-2xl font-extrabold uppercase">TechTrail</span>
          </Link>

          <div className="relative">
            <Input
              className="h-10 w-[294px] lg:block hidden rounded-lg px-4 border-none bg-black/20 "
              placeholder="Search Courses "
            />
            <div className="lg:absolute hidden  h-7 justify-center items-center lg:flex top-1 right-3">
              <BookOpen className="h-4" />
            </div>
          </div>

          <div className="flex gap-5">
            <div className="">
              <Link href="/courses">
                <Button className="rounded-md bg-black/20">Explore Courses</Button>
              </Link>
            </div>
            <Link href="/my-courses">
              <Button className="flex gap-2 bg-black/20">
                <p>My Courses</p> <NotebookPen />
              </Button>
            </Link>

            <Button onClick={handleConfirm} className="bg-black/20">Sign Out</Button>
          </div>
        </div>

        <div className="xl:hidden ml-3 ">
          <MobileNav />
        </div>
        {/* <button onClick={toggleTheme} className="">
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </button> */}
      </div>
    </header>
  );
};

export default Header;
