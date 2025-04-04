import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UsersScreen from "../../screens/admin/UsersScreen";
import UpdateCarer from "../../screens/admin/UpdateCarer";
import RequestsScreen from "../../screens/admin/RequestsScreen";
import { View } from 'react-native';
import UsuariosDesactivados from "../../screens/admin/UsuariosDesactivados";
const Stack = createNativeStackNavigator();

const CuidadoresStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
          backgroundColor: "transparent", // Hace el fondo del header transparente
          elevation: 0, // 🔹 Elimina la sombra en Android
          shadowOpacity: 0, // 🔹 Elimina la sombra en iOS
          borderBottomWidth: 0, // 🔹 Elimina el borde inferior
        },
        headerBackground: () => <View style={{ flex: 1, backgroundColor: 'transparent' }} />, // Asegura la transparencia en Android
        headerTitle: "",
        headerTintColor: "#6FCF97", // Color de la flecha y el texto
        headerTitleAlign: "left", // Alinear el título a la izquierda
        headerTitleStyle: {
          fontSize: 20, // Tamaño del texto
          fontWeight: "bold",
        },
        headerBackTitle: "Volver",
        headerShadowVisible: false, // 🔹 **Elimina sombras adicionales en versiones recientes**
      }}>
      <Stack.Screen name="Lista" options={{ headerShown: false }} component={UsersScreen} />
      <Stack.Screen name="Cuidador update" component={UpdateCarer} />
      <Stack.Screen name="Solicitudes" component={RequestsScreen} />
      <Stack.Screen name="Desac" component={UsuariosDesactivados} />
      {/* Agregar otras pantallas de brazaletes aquí */}
    </Stack.Navigator>
  );
};

export default CuidadoresStack;