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

interface StoreContextType {
  studentCourseList: [];
  setStudentCourseList: Dispatch<SetStateAction<[]>>;
  loadingState: boolean;
  setLoadingState: Dispatch<SetStateAction<boolean>>;
  globalParamId: string | null;
  setGlobalParamId: Dispatch<SetStateAction<string | null>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  filteredCourses: any;
  setFilteredCourses: Dispatch<SetStateAction<any>>;
  handleSearch: (query: string) => void;
}

export const StudentContext = createContext<StoreContextType | null>(null);

export default function StudentProvider({ children }: ProviderProps) {
  const [studentCourseList, setStudentCourseList] = useState<any>([]);
  const [filteredCourses, setFilteredCourses] =
    useState<any>(studentCourseList);
  const [loadingState, setLoadingState] = useState(true);
  // const [globalParamId, setGlobalParamId] = useState<number | null>(null);
  const [globalParamId, setGlobalParamId] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("globalParamId");
    }
    return null;
  });
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (!query) {
      setFilteredCourses(studentCourseList);
      return;
    }

    const filtered = studentCourseList.filter((course: any) =>
      course.title.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredCourses(filtered);
  };
  const contextValue: StoreContextType = {
    setStudentCourseList,
    loadingState,
    searchQuery,
    setSearchQuery,
    globalParamId,
    filteredCourses,
    setFilteredCourses,
    handleSearch,
    setGlobalParamId,
    setLoadingState,
    studentCourseList,
  };

  return (
    <StudentContext.Provider value={contextValue}>
      {children}
    </StudentContext.Provider>
  );
}

export const useStudentContext = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error(
      "useStoreContext must be used within a StoreContextProvider"
    );
  }
  return context;
};
