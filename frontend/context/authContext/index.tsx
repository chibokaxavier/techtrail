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
import { StringDecoder } from "string_decoder";

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
  auth: Auth | null;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
  loading: boolean;
  formData: {
    title: string;
    category: string;
    level: string;
    language: string;
    subtitle: string;
    description: string;
    price: string;
    objectives: string;
    welcomeMessage: string;
    image: string;
  };
  setFormData: any;
  curriculumFormData: {
    title: string;
    videoUrl: string;
    freePreview: boolean;
    public_id: string;
  }[];
  setCurriculumFormData: any;
  mediaUploadProgressPercentage: number;
  setMediaUploadProgressPercentage: any;
  currentEditedCourseId: null | string;
  setCurrentEditedCourseId: Dispatch<SetStateAction<string | null>>;
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
  const [loading, setLoading] = useState(true); // New loading state
  const router = useRouter();
  const [mediaUploadProgressPercentage, setMediaUploadProgressPercentage] =
    useState(0);
  const [currentEditedCourseId, setCurrentEditedCourseId] = useState<
    null | string
  >(null);
  const checkAuth = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/checkStatus", {
        headers: { token },
      });
      if (res.data.success) {
        setAuth({ authenticate: true, user: res.data.user });
      } else {
        setAuth({ authenticate: false, user: null });
        setToken(null);
        localStorage.removeItem("token");
      }
    } catch (error) {
      setAuth({ authenticate: false, user: null });
      setToken(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false); // Set loading to false after auth check is complete
    }
  };
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    level: "",
    language: "",
    subtitle: "",
    description: "",
    price: "",
    objectives: "",
    welcomeMessage: "",
    image: "",
  });
  const [curriculumFormData, setCurriculumFormData] = useState([
    {
      title: "",
      videoUrl: "",
      freePreview: false,
      public_id: "",
    },
  ]);

  useEffect(() => {
    checkAuth();
  }, []);

  const contextValue: StoreContextType = {
    token,
    setToken,
    currentEditedCourseId,
    setCurrentEditedCourseId,
    auth,
    mediaUploadProgressPercentage,
    setMediaUploadProgressPercentage,
    formData,
    setFormData,
    curriculumFormData,
    setCurriculumFormData,
    setAuth,
    loading,
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
