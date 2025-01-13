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
}

export const StudentContext = createContext<StoreContextType | null>(null);

export default function StudentProvider({ children }: ProviderProps) {
  const [studentCourseList, setStudentCourseList] = useState<any>([]);
  const [loadingState, setLoadingState] = useState(true);
  const contextValue: StoreContextType = {
    setStudentCourseList,
    loadingState,
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
