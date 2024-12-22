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
}

export const StudentContext = createContext<StoreContextType | null>(null);

export default function StudentProvider({ children }: ProviderProps) {
  const [studentCourseList, setStudentCourseList] = useState<any>([]);

  const contextValue: StoreContextType = {
    setStudentCourseList,
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
