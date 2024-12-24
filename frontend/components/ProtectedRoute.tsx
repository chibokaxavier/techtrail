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
    console.log(auth);
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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl p-8 rounded-lg shadow-lg bg-white">
          {/* Header Section */}
          <div className="flex items-center mb-8">
            {/* Circle Skeleton */}
            <div className="mr-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse duration-900"></div>
            </div>

            {/* Text Skeleton */}
            <div className="flex-1 space-y-4">
              <div className="w-72 h-6 bg-gray-200 animate-pulse duration-900 rounded"></div>
              <div className="w-48 h-6 bg-gray-200 animate-pulse duration-900 rounded"></div>
              <div className="w-64 h-4 bg-gray-200 animate-pulse duration-900 rounded"></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="mb-8">
            <div className="w-full h-80 bg-gray-200 animate-pulse duration-900 rounded"></div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-between">
            <div className="w-32 h-12 bg-gray-200 animate-pulse duration-900 rounded"></div>
            <div className="w-32 h-12 bg-gray-200 animate-pulse duration-900 rounded"></div>
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
