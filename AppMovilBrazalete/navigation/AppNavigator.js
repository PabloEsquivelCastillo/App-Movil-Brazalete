import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoginScreen from "../screens/LoginScreen";
import AdminNavigator from "./AdminNavigator";
import CaregiverNavigator from "./CaregiverNavigator";
import StackGeneral from "./stacks/StackGeneral";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const { user } = useContext(AuthContext);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
                    user.role === "admin" ? (
                        <Stack.Screen name="AdminStack" component={AdminNavigator} />
                    ) : (
                        <Stack.Screen name="CaregiverStack" component={CaregiverNavigator} />
                    )
                ) : (
                    <Stack.Screen name="Login" component={StackGeneral} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
