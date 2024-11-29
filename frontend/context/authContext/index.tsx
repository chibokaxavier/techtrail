"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface ProviderProps {
  children: ReactNode;
}
interface Auth {
  authenticate: boolean;
  user: {
    _id: string;
    userName: string;
    role: string;
    email: string;
  } | null;
}
interface StoreContextType {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  auth: Auth | null; // Cart items are now full CartItem objects
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
}

export const AuthContext = createContext<StoreContextType | null>(null);
export default function AuthProvider({ children }: ProviderProps) {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  });
  const [auth, setAuth] = useState<Auth>({ authenticate: false, user: null });
  const router = useRouter();
  const checkAuth = async () => {
    console.log("first");
    try {
      const res = await axios.get("http://localhost:4000/api/v1/checkStatus", {
        headers: { token },
      });
      if (res.data.success) {
        setAuth({ authenticate: true, user: res.data.user });
      } else {
        setAuth({ authenticate: false, user: null });
        console.log("removed");
        setToken(null);
        localStorage.removeItem("token");
      }
    } catch (error) {
      setAuth({ authenticate: false, user: null });
      console.log("removed");
      setToken(null);
      localStorage.removeItem("token");
      router.push("/auth");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const contextValue: StoreContextType = {
    token,
    setToken,
    auth,
    setAuth,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useStoreContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useStoreContext must be used within a StoreContextProvider"
    );
  }
  return context;
};
