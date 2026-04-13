"use client";
import { useStoreContext } from "@/context/authContext";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface Protect {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Protect) => {
  const pathName = usePathname();
  const router = useRouter();
  const { auth, loading } = useStoreContext();

  useEffect(() => {
    if (!loading) {
      const isAuthenticated = auth?.authenticate;
      const userRole = auth?.user?.role;

      // If not authenticated and not on auth page → redirect to /auth
      if (!isAuthenticated && !pathName.includes("/auth")) {
        router.push("/auth");
      }

      // Authenticated but on /auth → redirect to correct dashboard
      else if (isAuthenticated && pathName.includes("/auth")) {
        switch (userRole) {
          case "admin":
            router.push("/admin");
            break;
          case "instructor":
            router.push("/instructor");
            break;
          default:
            router.push("/");
        }
      }

      // Authenticated instructor accessing non-instructor route (and not admin)
      else if (
        isAuthenticated &&
        userRole === "instructor" &&
        !pathName.includes("/instructor")
      ) {
        router.push("/instructor");
      }

      // Non-admin trying to access /admin route
      else if (
        isAuthenticated &&
        pathName.includes("/admin") &&
        userRole !== "admin"
      ) {
        router.push("/");
      }

      // Non-instructor trying to access /instructor route
      else if (
        isAuthenticated &&
        pathName.includes("/instructor") &&
        userRole !== "instructor" &&
        userRole !== "admin"
      ) {
        router.push("/");
      }

      // Admin can go anywhere — no redirect
    }
  }, [auth, pathName, router, loading]);

  if (loading && !pathName.includes("/auth")) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#050505] relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-[150px] animate-pulse"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative mb-6">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-blue-500 w-20 h-20 animate-spin opacity-70"></div>
            {/* Inner pulsing icon */}
            <div className="w-20 h-20 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.2)]">
               <svg 
                  className="w-10 h-10 text-white animate-pulse" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
               >
                 <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                 <path d="M6 12v5c3 3 9 3 12 0v-5"/>
               </svg>
            </div>
          </div>
          
          <h3 className="text-xl font-bold tracking-widest uppercase text-white mb-2">TechTrail</h3>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
             <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></span>
             Validating session...
          </div>
        </div>
      </div>
    );
  }

  if (
    (!auth?.authenticate && !pathName.includes("/auth")) || // Not logged in & not on /auth
    (auth?.authenticate &&
      pathName.includes("/auth") &&
      auth.user?.role !== "admin") || // Authenticated (not admin) on /auth
    (auth?.authenticate &&
      auth.user?.role === "instructor" &&
      !pathName.includes("/instructor")) || // Instructor not on /instructor
    (auth?.authenticate &&
      auth.user?.role !== "instructor" &&
      pathName.includes("/instructor") &&
      auth.user?.role !== "admin") // Non-instructor (not admin) on /instructor
  ) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
