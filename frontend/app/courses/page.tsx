import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Courses</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <aside className="w-full md:w-64 space-y-4">
          <div className="p-4 space-y-4"></div>
        </aside>
        <main className="flex-1">
          <div className="flex justify-end items-center mb-4 gap-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center p-5 gap-1" size="sm">
                  <ArrowUpDownIcon className="size-4" />
                </Button>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </div>
        </main>
      </div>
    </div>
  );
};

export default page;
