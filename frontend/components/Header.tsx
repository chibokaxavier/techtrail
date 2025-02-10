"use client";
import {
  BarChart,
  BookDown,
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

  // Define paths where the Header should be excluded
  const excludedPaths = "/instructor";

  // Check if the current path is excluded
  const isHeaderExcluded =
    pathname.includes("/instructor") || pathname.includes("/auth");

  if (isHeaderExcluded) {
    return null;
  }

  return (
    <header className="  fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 ">
      <div className="  py-4 lg:py-0 lg:px-0 px-4 lg:justify-normal lg:block flex  justify-between items-center">
      <Link href={"/"} className="flex items-center justify-center lg:hidden">
        <LaptopMinimal className="mr-5 size-8 " />{" "}
        <span className="text-xl font-extrabold">TechTrail</span>
      </Link>
      <div className="lg:flex items-center justify-between hidden  max-w-screen-xl mx-auto px-4  py-5 sm:px-6 lg:px-8">
        <Link href={"/"} className="flex items-center justify-center">
          <LaptopMinimal className="mr-5 size-10 " />{" "}
          <span className="text-2xl font-extrabold">TechTrail</span>
        </Link>

        <div className="relative">
          <Input
            className="h-10 w-[564px] lg:block hidden rounded-3xl px-4 border-black "
            placeholder="What do you wnat to learn ? "
          />
          <div className="lg:absolute hidden   p-4 bg-blue-300 rounded-3xl h-7 justify-center items-center lg:flex top-1 right-3">
            <Search className="h-4" />
          </div>
        </div>

        <div className="flex gap-5">
          <div className="">
            <Link href="/courses">
              <Button className="rounded-md">Explore Courses</Button>
            </Link>
          </div>
          <Link href="/my-courses">
            <Button className="flex gap-2">
              <p>My Courses</p> <NotebookPen />
            </Button>
          </Link>

          <Button onClick={handleConfirm}>Sign Out</Button>
        </div>
      </div>

      <div className="xl:hidden ml-3">
        <MobileNav />
      </div>
      {/* <button
        onClick={toggleTheme}
        className=""
      >
        {isDarkMode ? <SunIcon /> : <MoonIcon />}
      </button> */}

      </div>
          </header>
  );
};

export default Header;
