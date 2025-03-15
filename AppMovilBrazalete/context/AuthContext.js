import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    if (username === "admin@gmail.com" && password === "123") {
      setUser({ role: "admin" });
    } else if (username === "123" && password === "123") {
      setUser({ role: "cuidador" });
    } else {
      alert("Credenciales incorrectas");
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};