import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BrazaleteConfig from "../../screens/caregiver/BrazaleteConfig";
import BrazaleteRegistro from "../../screens/caregiver/BrazaleteRegistro";
import { View } from 'react-native';
import DispostivosScreen from "../../screens/caregiver/DispostivosScreen";
import Scanner from "../../screens/caregiver/ScannerQR";
import RegisterBrazalete from "../../screens/caregiver/RegisterBrazalete";
const Stack = createNativeStackNavigator();

const BrazaletesStack = () => {
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
            headerShadowVisible: false, // 🔹 **Elimina sombras adicionales en versiones recientes**
          }}>
      <Stack.Screen  options={{ headerShown: false }}  name="Brazalete Registro" component={BrazaleteRegistro} />
      <Stack.Screen name="Brazalete Config" component={BrazaleteConfig} />
      <Stack.Screen name="Scanner" component={Scanner}/>
      <Stack.Screen name="Registro" component={RegisterBrazalete}/>
{/* Agregar otras pantallas de brazaletes aquí */}
    </Stack.Navigator>
  );
};

export default BrazaletesStack;
