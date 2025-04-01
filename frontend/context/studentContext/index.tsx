"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { CurriculumFormdataType } from "../authContext";

interface ProviderProps {
  children: ReactNode;
}

export interface CourseList {
  _id: string;
  id: string;
  instructorId: string;
  instructorName: string;
  // date: Date;
  title: string;
  category: string;
  level: string;
  language: string;
  subtitle: string;
  image: string;
  description: string;
  welcomeMessage: string;
  price: string;
  objectives: string;
  students: [
    {
      studentId: string;
      studentName: string;
      StudentEmail: string;
    }
  ];
  curriculum: CurriculumFormdataType[];
}

interface StoreContextType {
  studentCourseList: CourseList[];
  setStudentCourseList: Dispatch<SetStateAction<CourseList[]>>;
  loadingState: boolean;
  setLoadingState: Dispatch<SetStateAction<boolean>>;
  globalParamId: string | null;
  setGlobalParamId: Dispatch<SetStateAction<string | null>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  filteredCourses: CourseList[];
  setFilteredCourses: Dispatch<SetStateAction<CourseList[]>>;
  handleSearch: (query: string) => void;
}

export const StudentContext = createContext<StoreContextType | null>(null);

export default function StudentProvider({ children }: ProviderProps) {
  const [studentCourseList, setStudentCourseList] = useState<CourseList[]>([]);
  const [filteredCourses, setFilteredCourses] =
    useState<CourseList[]>(studentCourseList);
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
