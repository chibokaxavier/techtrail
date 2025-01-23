"use client";
import {
  BookDown,
  GraduationCap,
  LaptopMinimal,
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

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
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
    <header className=" flex items-center justify-between max-w-screen-xl mx-auto px-4  py-5 sm:px-6 lg:px-8 ">
      <Link href={"/"} className="flex items-center justify-center">
        <LaptopMinimal className="mr-5 size-10 " />{" "}
        <span className="text-2xl font-extrabold">TechTrail</span>
      </Link>
      <div className="relative">
        <Input
          className="h-10 w-[564px] rounded-3xl px-4 border-black "
          placeholder="What do you wnat to learn ? "
        />
        <div className="absolute  p-4 bg-blue-300 rounded-3xl h-7 justify-center items-center flex top-1 right-3">
          <Search className="h-4" />
        </div>
      </div>

      <div className="flex gap-5">
        <div className="">
          <Link href="/courses">
            <Button className="rounded-md">Explore Courses</Button>
          </Link>
        </div>
        <Button className="flex gap-2">
          <p>My Courses</p> <NotebookPen />
        </Button>
        <Button onClick={handleConfirm}>Sign Out</Button>
      </div>

      {/* <button
        onClick={toggleTheme}
        className=""
      >
        {isDarkMode ? <SunIcon /> : <MoonIcon />}
      </button> */}
    </header>
  );
};

export default Header;
