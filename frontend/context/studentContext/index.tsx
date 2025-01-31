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
}

export const StudentContext = createContext<StoreContextType | null>(null);

export default function StudentProvider({ children }: ProviderProps) {
  const [studentCourseList, setStudentCourseList] = useState<any>([]);
  const [loadingState, setLoadingState] = useState(true);
  // const [globalParamId, setGlobalParamId] = useState<number | null>(null);
  const [globalParamId, setGlobalParamId] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("globalParamId");
    }
    return null;
  });
  const contextValue: StoreContextType = {
    setStudentCourseList,
    loadingState,
    globalParamId,
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
