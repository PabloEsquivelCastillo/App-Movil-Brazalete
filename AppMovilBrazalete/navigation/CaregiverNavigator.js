import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import BrazaleteConfig from "../screens/caregiver/BrazaleteConfig";
import theme from "../themes/theme";
import Ionicons from '@expo/vector-icons/Ionicons';
import BrazaletesStack from "./stacks/BrazaleteStack";
import RecordatorioStack from "./stacks/RecordatorioStack";
import MedicamentoStack from "./stacks/MedicamentoStack";
import { color } from "react-native-elements/dist/helpers";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


const Tab = createBottomTabNavigator();

const CaregiverNavigator = () => {
    const { logout } = useContext(AuthContext);

    // Función para mostrar el alert de confirmación
    const handleLogout = () => {
        Alert.alert(
            "Cerrar sesión",
            "¿Estás seguro de que deseas cerrar sesión?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Sí, salir", onPress: logout },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: styles.tabBar,
                    tabBarActiveTintColor: "black", // Color negro para el ícono y la etiqueta activa
                    tabBarInactiveTintColor: "black", // Color negro para el ícono y la etiqueta inactiva
                    tabBarLabelStyle: styles.tabBarLabel,
                    tabBarStyle: {
                        alignContent:'center',
                        height: 80, // Aumenta la altura de la barra
                    },
                }}
            >
                <Tab.Screen
                    name="Inicio"
                    component={BrazaletesStack}
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons
                                name="watch-outline"
                                size={24}
                                color="black"
                                style={focused ? styles.activeIcon : {}}
                            />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Recordatorio"
                    component={RecordatorioStack}
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons
                                name="notifications-outline"
                                size={24}
                                color="black"
                                style={focused ? styles.activeIcon : {}}
                            />
                        ),
                    }}
                />


                <Tab.Screen
                    name="Medicamento"
                    component={MedicamentoStack}
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons
                                name="medkit-outline"
                                size={24}
                                color="black"
                                style={focused ? styles.activeIcon : {}}
                            />
                        )
                    }}
                />


                <Tab.Screen
                    name="Cerrar sesión"
                    component={BrazaleteConfig} // No es necesario un componente aquí
                    listeners={{
                        tabPress: (e) => {
                            e.preventDefault(); // Evita que la pestaña navegue
                            handleLogout();
                        },
                    }}
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <Feather
                                name="log-out"
                                size={24}
                                color="black"
                                style={focused ? styles.activeIcon : {}}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0", // Color de fondo general
        flexDirection: 0, // Espacio para que la barra no toque el borde inferior
        paddingHorizontal: 0,
        position: "relative",
    },
    activeIcon: {
        color: 'green', // Asegura que el ícono sea negro
        fontSize: 26, // Tamaño del ícono
    },
    activeIconText: {
        marginTop:5,
        color: 'green', // Asegura que el ícono sea negro
        fontSize: 10, // Tamaño del ícono
    },
    desactIconText: {
        marginTop:5,
        color: 'black', // Asegura que el ícono sea negro
        fontSize: 10, // Tamaño del ícono
    },
});


export default CaregiverNavigator;
