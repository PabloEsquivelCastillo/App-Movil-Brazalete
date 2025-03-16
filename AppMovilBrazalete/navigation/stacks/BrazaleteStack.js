import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BrazaleteConfig from "../../screens/caregiver/BrazaleteConfig";
import BrazaleteRegistro from "../../screens/caregiver/BrazaleteRegistro";

const Stack = createNativeStackNavigator();

const BrazaletesStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Brazalete Registro" component={BrazaleteRegistro} />
      <Stack.Screen name="Brazalete Config" component={BrazaleteConfig} />
      {/* Agregar otras pantallas de brazaletes aquí */}
    </Stack.Navigator>
  );
};

export default BrazaletesStack;
