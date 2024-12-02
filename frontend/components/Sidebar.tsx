"use client";
import Link from "next/link";
import React from "react";
import { CiViewList } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { PiHandbagSimpleDuotone } from "react-icons/pi";
import { usePathname } from "next/navigation";
import { BookCheckIcon, LogOut } from "lucide-react";

const Sidebar = () => {
  const pathName = usePathname();
  return (
    <div className=" w-[20%] border-r-2 border-gray-300 h-screen  flex flex-col pt-5 gap-10 bg-white shadow-2xl">
      <p className="text-3xl font-bold pl-[52px]">Instructor view </p>
      <Link href={"/add"}>
        {" "}
        <div
          className={`${
            pathName.includes("add") ? "bg-red-100" : ""
          } border-b-2 border-r-2 border-t-2 h-[50px] w-[250px] pl-[52px] border-black/10 flex gap-4 justify-start  items-center cursor-pointer`}
        >
          {" "}
          <div className="h-7 w-7 rounded-full flex justify-center items-center border-2 border-black">
            <FaPlus className="text-sm" />
          </div>{" "}
          <p>Add items</p>
        </div>
      </Link>

      <Link href={"/list"}>
        {" "}
        <div
          className={`${
            pathName.includes("list") ? "bg-red-100" : ""
          } border-b-2 border-r-2 border-t-2 h-[50px] w-[250px] border-black/10 flex gap-4 justify-start pl-[52px] items-center cursor-pointer`}
        >
          <BookCheckIcon className="text-3xl" />
          <p>Courses</p>
        </div>{" "}
      </Link>

      <Link href={"/orders"}>
        <div
          className={`${
            pathName.includes("orders") ? "bg-red-100" : ""
          } border-b-2 border-r-2 border-t-2 h-[50px] w-[250px] border-black/10 flex gap-4 justify-start pl-[52px] items-center cursor-pointer`}
        >
          <LogOut className="text-3xl" />
          <p>Log out</p>
        </div>{" "}
      </Link>
    </div>
  );
};

export default Sidebar;
