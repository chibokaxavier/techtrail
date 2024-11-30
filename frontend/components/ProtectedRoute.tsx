import { Router } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

interface Protect {
  authenticate: boolean | undefined;
  user:
    | {
        _id: string;
        userName: string;
        role: string;
        email: string;
      }
    | null
    | undefined;
  children: ReactNode;
}

const ProtectedRoute = ({ authenticate, user, children }: Protect) => {
  const pathName = usePathname();
  const router = useRouter();
  if (!authenticate && !pathName.includes("/auth")) {
    router.push("/auth");
    return null;
  }
  if (
    (authenticate &&
      user?.role !== "instructor" &&
      pathName.includes("/instructor")) ||
    pathName.includes("/auth")
  ) {
    router.push("/");
    return null;
  }
  if (
    authenticate &&
    user?.role !== "instructor" &&
    !pathName.includes("/instructor")
  ) {
    router.push("/instructor");
    return null;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
