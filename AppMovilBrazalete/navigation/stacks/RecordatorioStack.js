 import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Recordatorios from "../../screens/caregiver/Recordatorios";


 const Stack = createNativeStackNavigator();

 const RecordatorioStack = () => {

    return(
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen name="Recordatorios" component={Recordatorios}/>
        </Stack.Navigator>
    );
};


export default RecordatorioStack;