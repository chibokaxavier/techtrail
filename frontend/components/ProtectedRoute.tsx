import { Router } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

interface Protect {
  authenticate: boolean;
  user: {
    _id: string;
    userName: string;
    role: string;
    email: string;
  } | null;
  element: ReactNode;
}

const ProtectedRoute = ({ authenticate, user, element }: Protect) => {
  const pathName = usePathname();
  const router = useRouter();
  if (!authenticate && !pathName.includes("/auth")) {
    router.push("/auth");
    return null;
  }
  if (
    (authenticate && user?.role !== "instructor" && pathName.includes("/instructor")) ||
    pathName.includes("/auth")
  ) {
    router.push("/");
    return null;
  }
  if (authenticate && user?.role !== "instructor" && !pathName.includes("/instructor")) {
    router.push("/instructor");
    return null;
  }
  return <>{element}</>;
};

export default ProtectedRoute;
