import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import * as authApi from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currUser, setCurrUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    authApi
      .fetchCurrentUser()
      .then((user) => {
        setCurrUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        setCurrUser(null);
        setIsLoggedIn(false);
      })
      .finally(() => setCheckingSession(false));
  }, []);

  const login = useCallback(async (credentials) => {
    await authApi.login(credentials);
    const user = await authApi.fetchCurrentUser();
    setCurrUser(user);
    setIsLoggedIn(true);
    return user;
  }, []);

  const signup = useCallback(async (details) => {
    const user = await authApi.signup(details);
    setCurrUser(user);
    setIsLoggedIn(true);
    return user;
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout();
    setCurrUser(null);
    setIsLoggedIn(false);
  }, []);

  const value = {
    currUser,
    isLoggedIn,
    checkingSession,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
