 import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HistorialScreen from "../../screens/admin/HistorialScreen";
import RegistarRecordatorio from "../../screens/caregiver/RegistrarRecordatorio";
import { View } from 'react-native';
import HistoricoScreen from "../../screens/admin/HistoricoScreen";

 const Stack = createNativeStackNavigator();

 const HistorialStack = () => {

    return(
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
              }} >
            <Stack.Screen name="Historial" component={HistorialScreen}/>
            <Stack.Screen name="Historico" component={HistoricoScreen}/>
            
        </Stack.Navigator>
    );
};


export default HistorialStack;