import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";

import { AuthContext } from "../context/AuthContext";

import BrazaleteConfig from "../screens/caregiver/BrazaleteConfig";

import theme from "../themes/theme";
import Ionicons from '@expo/vector-icons/Ionicons';

import RequestsScreen from "../screens/admin/RequestsScreen";
import RecordatorioStack from "./stacks-admin/HistorialStack";
import MedicamentoStack from "./stacks-admin/MedicamentosStack";
import CuidadoresStack from "./stacks-admin/CuidadoresStack";

import { color } from "react-native-elements/dist/helpers";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


const Tab = createBottomTabNavigator();

const AdminNavigator = () => {
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
                }}
            >
                <Tab.Screen
                    name="Recordatorios"
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
                    name="Cuidadores"
                    component={CuidadoresStack}
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <Feather
                                name="users"
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
        position: "relative"
    },
    activeIcon: {
        color: 'green', // Asegura que el ícono sea negro
        fontSize: 26, // Tamaño del ícono
    },
});


export default AdminNavigator;
