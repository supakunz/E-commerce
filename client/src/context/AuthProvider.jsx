/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
    toast.dismiss();
    toast.success("Login successful", {
      theme: "colored",
    });
  };
  const logout = () => {
    setIsAuthenticated(false);
    toast.dismiss();
    toast.success("Logout successful", {
      theme: "colored",
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
