"use client";
import { LaptopMinimal, LogOut, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useStoreContext } from "@/context/authContext";
import { Input } from "./ui/input";
import MobileNav from "./MobileNav";
import { useStudentContext } from "@/context/studentContext";
import { motion } from "framer-motion";

const Header = () => {
  const { handleSearch, searchQuery } = useStudentContext();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { setAuth, setToken } = useStoreContext();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    setAuth({ authenticate: false, user: null });
    setToken(null);
    localStorage.removeItem("token");
  };

  const isHeaderExcluded = pathname.includes("/instructor") || pathname.includes("/auth");
  if (isHeaderExcluded) return null;

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled 
        ? "py-4 px-4" 
        : "py-6 px-0"
      }`}
    >
      <div className={`mx-auto max-w-screen-xl transition-all duration-500 rounded-full border border-white/10 ${
        scrolled 
        ? "bg-black/60 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] px-8 py-3" 
        : "bg-transparent px-8 py-4 border-transparent"
      }`}>
        <div className="flex items-center justify-between">
          
          {/* Logo Section */}
          <Link href="/" className="group flex items-center gap-3">
             <div className="relative size-10 bg-blue-600 rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                <LaptopMinimal className="size-6 text-white" />
                <div className="absolute -top-1 -right-1">
                   <Sparkles className="size-3 text-yellow-400 animate-pulse" />
                </div>
             </div>
             <span className="text-xl font-black tracking-tighter text-white uppercase italic">Tech<span className="text-blue-500">Trail</span></span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-12">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
              <Input
                className="h-11 w-full rounded-2xl pl-12 pr-4 border-white/5 bg-white/5 focus:bg-white/10 focus:ring-1 focus:ring-blue-500/50 transition-all text-sm placeholder:text-gray-600"
                placeholder="Find your next path..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                 <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-gray-500 opacity-100">
                    <span className="text-xs">⌘</span>K
                 </kbd>
              </div>
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center gap-2">
            <nav className="hidden lg:flex items-center gap-1 mr-4">
               <Link href="/courses">
                  <Button variant="ghost" className="rounded-full text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 px-6">
                     Explore
                  </Button>
               </Link>
               <Link href="/my-courses">
                  <Button variant="ghost" className="rounded-full text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 px-6 flex gap-2">
                     Library <div className="size-1.5 rounded-full bg-blue-500"></div>
                  </Button>
               </Link>
            </nav>

            <div className="hidden lg:block h-8 w-px bg-white/10 mx-2" />

            <div className="hidden lg:flex items-center gap-3">
               <Button 
                 variant="ghost" 
                 size="icon" 
                 onClick={handleLogout} 
                 className="rounded-xl bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 transition-all group"
               >
                 <LogOut className="size-5 group-hover:-translate-x-1 transition-transform" />
               </Button>
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden flex items-center gap-4">
               <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
