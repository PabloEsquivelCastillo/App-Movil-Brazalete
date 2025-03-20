import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import RecoverScreen from "../../screens/RecoverScreen";
import LoginScreen from "../../screens/LoginScreen";
import RegisterScreen from "../../screens/RegisterScreen";
import { View } from 'react-native';


const Stack = createNativeStackNavigator();

const StackGeneral = () => {

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
            <Stack.Screen name="Inicio Sesion" component={LoginScreen} />
            <Stack.Screen name="Recuperar" component={RecoverScreen} />
            <Stack.Screen name="Registro" component={RegisterScreen} />
        </Stack.Navigator>
    );
};

export default StackGeneral;