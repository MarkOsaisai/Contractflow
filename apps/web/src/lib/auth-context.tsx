"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type AuthSession, type AuthUser } from "./api";

type AuthContextValue = {
  isReady: boolean;
  session: AuthSession | null;
  user: AuthUser | null;
  setSession: (session: AuthSession) => void;
  signOut: () => void;
};

const storageKey = "contractflow.session";
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [session, setSessionState] = useState<AuthSession | null>(null);

  useEffect(() => {
    const storedSession = window.localStorage.getItem(storageKey);
    if (storedSession) {
      try {
        setSessionState(JSON.parse(storedSession) as AuthSession);
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }
    setIsReady(true);
  }, []);

  const setSession = (nextSession: AuthSession) => {
    window.localStorage.setItem(storageKey, JSON.stringify(nextSession));
    setSessionState(nextSession);
  };

  const signOut = () => {
    window.localStorage.removeItem(storageKey);
    setSessionState(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isReady,
        session,
        user: session?.user ?? null,
        setSession,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used within an AuthProvider");
  return value;
}
