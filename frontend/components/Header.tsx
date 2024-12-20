"use client";
import { GraduationCap, MoonIcon, SunIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };
  const pathname = usePathname();

  // Define paths where the Header should be excluded
  const excludedPaths = "/instructor";

  // Check if the current path is excluded
  const isHeaderExcluded =
    pathname.includes("/instructor") || pathname.includes("/auth");

  if (isHeaderExcluded) {
    return null;
  }
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <Link href={"/"} className="flex items-center justify-center">
        <GraduationCap className="mr-5 size-10 " />{" "}
        <span className="text-2xl font-extrabold">TechTrail</span>
      </Link>
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
