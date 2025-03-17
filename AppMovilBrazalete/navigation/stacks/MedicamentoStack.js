import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MedicamentosDisponibles from "../../screens/caregiver/MedicamentosDisponibles";
import RegistrarMedicamento from "../../screens/caregiver/RegistroMedicamento";



const Stack = createNativeStackNavigator()

export default function MedicamentoStack() {


    return(
        <>
            <Stack.Navigator screenOptions={{ headerShown: false}}>
                <Stack.Screen name="Medicamentos" component={MedicamentosDisponibles}/>
                <Stack.Screen name="Registro" component={RegistrarMedicamento}/>
            </Stack.Navigator>
        </>
    );
}