import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/organizations/me",
          { withCredentials: true }
        );
        setUser(data);
      } catch (error) {
        console.log("Not authenticated");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      await axios.post(
        "http://localhost:5000/auth/login",
        { email, password },
        { withCredentials: true }
      );
      const { data } = await axios.get(
        "http://localhost:5000/organizations/me",
        { withCredentials: true }
      );
      setUser(data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    await axios.post(
      "http://localhost:5000/auth/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
