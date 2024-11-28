import { GraduationCap } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <Link href={"/"} className="flex items-center justify-center">
        <GraduationCap className="mr-5 size-10 " />{" "}
        <span className="text-2xl font-extrabold">TechTrail</span>
      </Link>
    </header>
  );
};

export default Header;
