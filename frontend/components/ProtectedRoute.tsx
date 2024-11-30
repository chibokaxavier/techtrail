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
        router.push("/");
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
    return <div>Loading...</div>; // Replace with a loading spinner or skeleton UI
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
