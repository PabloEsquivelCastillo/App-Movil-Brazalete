import { createContext, useState, useEffect } from "react";
import axios from 'axios'
import {jwtDecode} from 'jwt-decode';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from '@env';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  useEffect(() => {
    checkLoginStatus(); // Verificar si hay sesión activa al iniciar la app
  }, []);

  const checkLoginStatus = async () => {
    const storedToken = await AsyncStorage.getItem("userToken");

    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp > currentTime) {
        setUser({ token: storedToken, payload: decodedToken });
        setToken(storedToken);
      } else {
        logout(); // Si el token está expirado, cerrar sesión
      }
    }
  };

  const login = async (username, password) => {
    try {
      // Realizar la petición POST a la API
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: username,
        password: password,
      });
  
      // Asumiendo que la API devuelve un token y un rol en la respuesta
      const { token } = response.data;
      // Decodificar el token usando jwt-decode
      const payload = jwtDecode(token);
      //guardar en asyncStorage
      await AsyncStorage.setItem("userToken", token);

      // Mostrar el payload decodificado
      console.log('Payload del token: ', payload);
  
      // Actualizar el estado del usuario con el rol recibido
      setUser({ token, payload });
      setToken(token);
      console.log('Login exitoso: ', response.data);
    }catch (error) {
      // Manejar errores de la petición
      if (error.response) {
        // Si la API devuelve un error (por ejemplo, credenciales incorrectas)
        if (error.response.status === 401) {
          alert("Credenciales incorrectas");
        } else {
          alert("Error en el servidor");
        }
      } else {
        // Si hay un error de red o otro problema
        alert("Error de conexión");
      }
      console.error('Error en el login:', error);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("userToken");
    setUser(null); // Asegurar que se reinicia correctamente
    setToken(null);
};

  return (
    <AuthContext.Provider value={{ user,token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};