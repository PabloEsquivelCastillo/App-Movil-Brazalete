import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import RecoverScreen from "../../screens/RecoverScreen";
import LoginScreen from "../../screens/LoginScreen";
import RegisterScreen from "../../screens/RegisterScreen";



const Stack = createNativeStackNavigator();

const StackGeneral = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Inicio Sesion" component={LoginScreen} />
            <Stack.Screen name="Recuperar" component={RecoverScreen} />
            <Stack.Screen name="Registro" component={RegisterScreen} />
        </Stack.Navigator>
    );
};

export default StackGeneral;