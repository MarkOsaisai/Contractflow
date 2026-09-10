"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { login as apiLogin, register as apiRegister, type AuthSession, type AuthUser } from "./api";

type AuthContextValue = {
  isReady: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  session: AuthSession | null;
  user: AuthUser | null;
  setSession: (session: AuthSession) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    displayName: string,
    organizationName: string,
  ) => Promise<void>;
  signOut: () => void;
  logout: () => void;
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

  const login = async (email: string, password: string) => {
    const nextSession = await apiLogin(email, password);
    setSession(nextSession);
  };

  const register = async (
    email: string,
    password: string,
    displayName: string,
    organizationName: string,
  ) => {
    const nextSession = await apiRegister({ email, password, displayName, organizationName });
    setSession(nextSession);
  };

  const signOut = () => {
    window.localStorage.removeItem(storageKey);
    setSessionState(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isReady,
        isLoading: !isReady,
        isAuthenticated: !!session,
        session,
        user: session?.user ?? null,
        setSession,
        login,
        register,
        signOut,
        logout: signOut,
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