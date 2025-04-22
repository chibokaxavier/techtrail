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

      // Admin can go anywhere — no redirect
    }
  }, [auth, pathName, router, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <div className="w-full max-w-5xl p-8 rounded-lg shadow-lg ">
          {/* Course Header Section */}
          <div className="flex items-center mb-6">
            {/* Course Thumbnail Skeleton */}
            <div className="w-32 h-32 rounded-lg bg-gray-200 animate-pulse"></div>

            {/* Course Title & Instructor */}
            <div className="ml-6 flex-1 space-y-3">
              <div className="w-80 h-6 bg-gray-200 animate-pulse rounded"></div>
              <div className="w-56 h-6 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>

          {/* Video Preview Section */}
          <div className="w-full h-64 bg-gray-200 animate-pulse rounded mb-6"></div>

          {/* Course Content Section */}
          <div className="space-y-4 mb-6">
            <div className="w-full h-6 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-4/5 h-6 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-3/4 h-6 bg-gray-200 animate-pulse rounded"></div>
          </div>

          {/* Syllabus Section */}
          <div className="space-y-4 mb-6">
            <div className="w-full h-8 bg-gray-300 rounded"></div>
            <div className="w-full h-6 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-full h-6 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-full h-6 bg-gray-200 animate-pulse rounded"></div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <div className="w-36 h-12 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-36 h-12 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    ); // Replace with a loading spinner or skeleton UI
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
