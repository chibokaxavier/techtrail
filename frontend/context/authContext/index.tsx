'use client'
import { createContext, ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext(null);
export default function AuthProvider({ children }: ProviderProps) {
  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
}
