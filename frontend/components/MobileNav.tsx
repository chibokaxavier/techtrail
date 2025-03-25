"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { useStoreContext } from "@/context/authContext";

const MobileNav = () => {
  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Explore Courses",
      path: "/courses",
    },
    {
      name: "My Courses",
      path: "/my-courses",
    },
  ];
  const pathName = usePathname();
  const [visible, setVisible] = useState(false);
  const { setAuth, setToken } = useStoreContext();
  const handleConfirm = () => {
    setAuth({ authenticate: false, user: null });
    setToken(null);
    localStorage.removeItem("token");
  };
  return (
    <>
      <CiMenuFries onClick={() => setVisible(true)} className="text-[25px]" />
      <Sidebar
        visible={visible}
        position="right"
        onHide={() => setVisible(false)}
      >
        <div className="mt-32 mb-40 text-center text-2xl">
          <Link href={"/"}>
            <h1 className="tetx-4xl font-semibold">
              Techtrail<span className="text-accent">.</span>
            </h1>
          </Link>
        </div>
        <nav className="flex flex-col space-y-8 items-center justify-center">
          {links.map((link, index) => {
            return (
              <Link
                href={link.path}
                key={index}
                className={`${
                  link.path === pathName &&
                  "text-gray-400 border-b-2 border-accent"
                } text-xl capitalize hover:text-accent transition-all `}
              >
                {link.name}
              </Link>
            );
          })}
          <p
            onClick={handleConfirm}
            className="text-lg text-red-300 px-2 bg-red-500 py-2 rounded-lg"
          >
            Sign Out
          </p>
        </nav>
      </Sidebar>
    </>
  );
};

export default MobileNav;
