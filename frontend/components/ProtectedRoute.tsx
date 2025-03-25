"use client";
import { useStoreContext } from "@/context/authContext";
import { usePathname, useRouter } from "next/navigation";
import { Skeleton } from "primereact/skeleton";
import { ReactNode, useEffect } from "react";

interface Protect {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Protect) => {
  const pathName = usePathname();
  const router = useRouter();
  const { auth, loading } = useStoreContext();

  useEffect(() => {
    // console.log(auth);
    if (!loading) {
      if (!auth?.authenticate && !pathName.includes("/auth")) {
        router.push("/auth");
      } else if (
        auth?.authenticate &&
        auth.user?.role !== "instructor" &&
        pathName.includes("/instructor")
      ) {
        router.push("/");
      } else if (auth?.authenticate && pathName.includes("/auth")) {
        // Redirect authenticated users away from the /auth page
        if (auth?.user?.role === "instructor") {
          router.push(`/instructor`);
        } else {
          router.push(`/`);
        }
      } else if (
        auth?.authenticate &&
        auth.user?.role === "instructor" &&
        !pathName.includes("/instructor")
      ) {
        router.push("/instructor");
      }
    }
  }, [auth, pathName, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <div className="w-full max-w-5xl p-8 rounded-lg shadow-lg bg-white">
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
    (!auth?.authenticate && !pathName.includes("/auth")) ||
    (auth?.authenticate && pathName.includes("/auth")) ||
    (auth?.authenticate &&
      auth.user?.role !== "instructor" &&
      pathName.includes("/instructor")) ||
    (auth?.authenticate &&
      auth.user?.role === "instructor" &&
      !pathName.includes("/instructor"))
  ) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
