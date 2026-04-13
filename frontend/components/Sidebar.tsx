"use client";
import { BarChart, BookOpen, LogOut, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = ({
  tab,
  setTab,
}: {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "courses", label: "My Courses", icon: BookOpen },
    { id: "logout", label: "Log out", icon: LogOut, destructive: true },
  ];

  return (
    <div className="w-full lg:w-72 h-auto lg:h-[calc(100vh-8rem)] sticky top-24 flex flex-col pt-8 pb-8 px-4 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
      <div className="mb-10 px-4">
        <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">
          Workspace
        </p>
        <p className="text-2xl font-black tracking-tight text-white">
          Instructor
        </p>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {menuItems.map((item) => {
          const isActive = tab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={cn(
                "group relative flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 w-full text-left outline-none",
                isActive
                  ? "bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[inset_0_0_20px_rgba(37,99,235,0.1)]"
                  : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent",
                item.destructive && !isActive && "hover:text-red-400 hover:bg-red-500/10"
              )}
            >
              <div
                className={cn(
                  "p-2 rounded-xl transition-colors duration-300",
                  isActive
                    ? "bg-blue-600/20 text-blue-400"
                    : "bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-white",
                  item.destructive && !isActive && "group-hover:bg-red-500/20 group-hover:text-red-400"
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-semibold">{item.label}</span>
              
              {isActive && (
                <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto px-4 pt-8">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/5">
           <p className="text-sm font-semibold text-white mb-1">Pro Tip</p>
           <p className="text-xs text-gray-400 leading-relaxed">Keep your course content updated to engage more students and improve ratings.</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
