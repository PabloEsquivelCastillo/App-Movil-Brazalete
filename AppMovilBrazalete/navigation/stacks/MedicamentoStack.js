import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MedicamentosDisponibles from "../../screens/caregiver/MedicamentosDisponibles";
import RegistrarMedicamento from "../../screens/caregiver/RegistroMedicamento";
import { View } from 'react-native';
import ActualizarMedicamento from "../../screens/caregiver/ActualizarMedicamento";


const Stack = createNativeStackNavigator()

export default function MedicamentoStack() {


    return(
        <>
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
                <Stack.Screen options={{ headerShown: false }}  name="Medicamentos" component={MedicamentosDisponibles}/>
                <Stack.Screen name="Registro" component={RegistrarMedicamento}/>
                <Stack.Screen name="Actualizar" component={ActualizarMedicamento}/>
            </Stack.Navigator>
        </>
    );
}