"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  name: string;
  email: string;
  avatar?: string;
  batch?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  loginModalOpen: boolean;
  login: (email?: string, password?: string) => void;
  logout: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // Check saved session in localStorage
    try {
      const savedAuth = localStorage.getItem("aod_auth_user");
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        setUser(parsed);
        setIsLoggedIn(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const login = (email: string = "student@artofdesign.academy") => {
    const dummyUser: User = {
      name: "Tanvir Ahmed",
      email: email,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      batch: "Batch 05 - Active",
    };
    setUser(dummyUser);
    setIsLoggedIn(true);
    setLoginModalOpen(false);
    try {
      localStorage.setItem("aod_auth_user", JSON.stringify(dummyUser));
    } catch {
      // ignore
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    try {
      localStorage.removeItem("aod_auth_user");
    } catch {
      // ignore
    }
  };

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        loginModalOpen,
        login,
        logout,
        openLoginModal,
        closeLoginModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
