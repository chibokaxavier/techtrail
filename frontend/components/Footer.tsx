"use client";
import { LaptopMinimal } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

import { FaInstagram } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { GiFoodTruck } from "react-icons/gi";

const Footer = () => {
  const pathname = usePathname();
  const isHeaderExcluded = pathname.includes("/auth");

  if (isHeaderExcluded) {
    return null;
  }

  return (
    <footer className="flex flex-col  text-gray-400  border-t-[1px] border-gray-200 max-w-screen-xl mx-auto  py-5 sm:px-6 lg:px-8">
      <div className="flex  xl:flex-row flex-col justify-evenly pt-20 pb-5 px-5 ">
        <div className="pb-20">
          <p className="text-4xl pb-3 gap-2 text-gray-400  flex items-center justify-self-center8 font-bold">
            <span>
              {" "}
              <LaptopMinimal className="mr-5 size-10" />
            </span>
            Techtrail
          </p>
          <div className=" gap-8  flex">
            <FaFacebook className="social" />
            <FaInstagram className="social" />
            <FaPinterest className="social" />
            <FaYoutube className="social" />
            <FaTwitter className="social" />
          </div>
        </div>
        <div className="grid xl:grid-cols-2 grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-20 pb-10">
          <div className="text-gray-400">
            <p className="mb-6 font-bold text-gray-300 text-2xl capitalize">
              COMPANY
            </p>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              Home
            </div>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              About us
            </div>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              Delivery
            </div>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              Privacy Policy
            </div>
          </div>
          <div className="text-gray-400">
            <p className="mb-6 font-bold text-gray-300 text-2xl">GET IN TOUCH </p>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              +1 789 5422
            </div>
            <div className="cursor-pointer hover:text-white transition-all ease-in-out py-1">
              techtrail@gmail.com
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
