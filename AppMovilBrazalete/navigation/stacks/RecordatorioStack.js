 import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Recordatorios from "../../screens/caregiver/Recordatorios";
import HistorialRecordatorios from "../../screens/caregiver/HistorialRecordatorios";
import RegistarRecordatorio from "../../screens/caregiver/RegistrarRecordatorio";
import { View } from 'react-native';
import RecordatoriosDesactivados from "../../screens/caregiver/RecordatoriosDesactivados";

 const Stack = createNativeStackNavigator();

 const RecordatorioStack = () => {

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
                headerShadowVisible: false, // 🔹 **Elimina sombras adicionales en versiones recientes**
              }}>
            <Stack.Screen options={{ headerShown: false }}  name="Recordatorios" component={Recordatorios}/>
            <Stack.Screen name="Historial" component={HistorialRecordatorios}/>
            <Stack.Screen name="Registro" component={RegistarRecordatorio}/>
            <Stack.Screen name="Desactivados" component={RecordatoriosDesactivados}/>
        </Stack.Navigator>
    );
};


export default RecordatorioStack;