 import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Recordatorios from "../../screens/caregiver/Recordatorios";
import HistorialRecordatorios from "../../screens/caregiver/HistorialRecordatorios";
import RegistarRecordatorio from "../../screens/caregiver/RegistrarRecordatorio";


 const Stack = createNativeStackNavigator();

 const RecordatorioStack = () => {

    return(
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen name="Recordatorios" component={Recordatorios}/>
            <Stack.Screen name="Historial" component={HistorialRecordatorios}/>
            <Stack.Screen name="Registro" component={RegistarRecordatorio}/>
        </Stack.Navigator>
    );
};


export default RecordatorioStack;