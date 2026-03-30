"use client";
import { LaptopMinimal, Mail, MapPin, Sparkles, Send } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { FaInstagram, FaYoutube, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Footer = () => {
  const pathname = usePathname();
  const isHeaderExcluded = pathname.includes("/auth");

  if (isHeaderExcluded) return null;

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 pt-24 pb-12 overflow-hidden relative">
      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-3">
               <div className="size-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                  <LaptopMinimal className="size-7 text-white" />
               </div>
               <span className="text-3xl font-black tracking-tighter text-white uppercase italic">Tech<span className="text-blue-500">Trail</span></span>
            </div>
            
            <p className="text-gray-500 text-lg leading-relaxed max-w-sm">
              Navigating the future of technological education through curated trails led by industry pioneers. Join 10,000+ students already advancing their frontier.
            </p>

            <div className="flex gap-4">
              {[FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaLinkedin].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-300"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div className="space-y-6">
               <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-300 flex items-center gap-2">
                  <span className="w-4 h-px bg-blue-600"></span>
                  Ecosystem
               </h4>
               <ul className="space-y-4">
                  {['Home', 'Exploration', 'Library', 'Instructor Center', 'Trail Settings'].map(link => (
                    <li key={link}>
                       <a href="#" className="text-sm font-medium text-gray-500 hover:text-white transition-colors">{link}</a>
                    </li>
                  ))}
               </ul>
            </div>
            <div className="space-y-6">
               <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-300 flex items-center gap-2">
                  <span className="w-4 h-px bg-purple-600"></span>
                  Corporate
               </h4>
               <ul className="space-y-4">
                  {['About TechTrail', 'Privacy Protocol', 'Service Terms', 'Support Node', 'Hiring'].map(link => (
                    <li key={link}>
                       <a href="#" className="text-sm font-medium text-gray-500 hover:text-white transition-colors">{link}</a>
                    </li>
                  ))}
               </ul>
            </div>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
               <h4 className="text-sm font-black uppercase tracking-widest text-white mb-6 flex items-center gap-2">
                  <Sparkles className="size-4 text-yellow-400" />
                  Newsletter
               </h4>
               <div className="relative group">
                  <Input 
                    placeholder="Enter emailNode..." 
                    className="h-12 bg-white/5 border-white/10 rounded-xl pl-4 pr-12 focus:ring-blue-500/50"
                  />
                  <Button className="absolute right-1 top-1 h-10 w-10 p-0 bg-blue-600 hover:bg-blue-700 rounded-lg">
                     <Send className="size-4" />
                  </Button>
               </div>
               <p className="text-[10px] text-gray-600 mt-4 font-bold uppercase tracking-tighter">Secure encrypted delivery • Weekly updates</p>
            </div>
            
            <div className="space-y-3 px-2">
               <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Mail className="size-4 text-blue-500" />
                  <span>support@techtrail.io</span>
               </div>
               <div className="flex items-center gap-3 text-sm text-gray-500">
                  <MapPin className="size-4 text-purple-500" />
                  <span>Global HQ • Silicon Trail</span>
               </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">
              © 2026 TechTrail Systems. All Rights Reserved.
           </p>
           <div className="flex items-center gap-8">
              <span className="text-[10px] font-black italic text-blue-500/50 uppercase tracking-widest">Bridging the Gap</span>
              <div className="flex items-center gap-2">
                 <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
                 <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Atlas Node Online</span>
              </div>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
