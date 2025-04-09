import { createContext, useState, useEffect } from "react";
import axios from 'axios'
import {jwtDecode} from 'jwt-decode';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from '@env';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [authStatus, setAuthStatus] = useState(null); 
  useEffect(() => {
    checkLoginStatus(); // Verificar si hay sesión activa al iniciar la app
  }, []);

  const checkLoginStatus = async () => {
    const storedToken = await AsyncStorage.getItem("userToken");

    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp > currentTime) {
        // Verificar el estado de la solicitud
        if (decodedToken.edoReq === 0) {
          setAuthStatus('pending');
        } else if (decodedToken.edoReq === 1) {
          setAuthStatus('approved');
          setUser({ token: storedToken, payload: decodedToken });
          setToken(storedToken);
        } else if (decodedToken.edoReq === 2) {
          setAuthStatus('rejected');
          await AsyncStorage.removeItem("userToken");
        }
      } else {
        logout();
      }
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: username,
        password: password,
      });

      const { token } = response.data;
      const payload = jwtDecode(token);
      
      // Verificar el estado de la solicitud antes de permitir el acceso
      if (payload.edoReq === 0) {
        setAuthStatus('pending');
        await AsyncStorage.setItem("userToken", token);
        return;
      } else if (payload.edoReq === 2) {
        setAuthStatus('rejected');
        await AsyncStorage.removeItem("userToken");
        return;
      }

      // Si está aprobado (edoReq === 1)
      await AsyncStorage.setItem("userToken", token);
      setUser({ token, payload });
      setToken(token);
      setAuthStatus('approved');
      
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          throw new Error("Correo y/o Contraseña incorrecta.");
        } else {
          throw new Error("Error en el servidor");
        }
      } else {
        throw new Error("Error de conexión");
      }
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("userToken");
    setUser(null); // Asegurar que se reinicia correctamente
    setToken(null);
};

  return (
    <AuthContext.Provider value={{ user,token, authStatus, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};