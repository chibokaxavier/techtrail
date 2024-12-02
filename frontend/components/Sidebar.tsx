"use client";
import { BarChart, BookCheckIcon, LogOut } from "lucide-react";

const Sidebar = ({ tab, setTab }: { tab: string; setTab: React.Dispatch<React.SetStateAction<string>> }) => {
  return (
    <div className="w-[20%] border-r-2 h-screen flex flex-col pt-5 gap-10 bg-white shadow-2xl">
      <p className="text-3xl font-bold pl-[52px]">Instructor View</p>
      <div
        onClick={() => setTab("dashboard")}
        className={`${
          tab === "dashboard" ? "bg-gray-100" : ""
        } border-b-2 border-r-2 border-t-2 h-[50px] w-[250px] pl-[52px] border-black/10 flex gap-4 justify-start items-center cursor-pointer`}
      >
        <BarChart className="text-sm" />
        <p>Dashboard</p>
      </div>
      <div
        onClick={() => setTab("courses")}
        className={`${
          tab === "courses" ? "bg-gray-100" : ""
        } border-b-2 border-r-2 border-t-2 h-[50px] w-[250px] border-black/10 flex gap-4 justify-start pl-[52px] items-center cursor-pointer`}
      >
        <BookCheckIcon className="text-3xl" />
        <p>Courses</p>
      </div>
      <div
        onClick={() => setTab("logout")}
        className={`${
          tab === "logout" ? "bg-red-100" : ""
        } border-b-2 border-r-2 border-t-2 h-[50px] w-[250px] border-black/10 flex gap-4 justify-start pl-[52px] items-center cursor-pointer`}
      >
        <LogOut className="text-3xl" />
        <p>Log out</p>
      </div>
    </div>
  );
};

export default Sidebar;
