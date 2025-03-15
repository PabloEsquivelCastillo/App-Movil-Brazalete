import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import BrazaleteConfig from "../screens/BrazaleteConfig";
import theme from "../themes/theme";
import BrazaleteRegistro from "../screens/BrazaleteRegistro";

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
                    tabBarActiveTintColor: "#ffffff",
                    tabBarInactiveTintColor: "#b0c4b1",
                    tabBarLabelStyle: styles.tabBarLabel,
                }}
            >
                <Tab.Screen
                    name="Inicio"
                    component={BrazaleteRegistro}
                    options={{
                        tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
                    }}
                />
                <Tab.Screen
                    name="Brazalete Config"
                    component={BrazaleteConfig}
                    options={{
                        tabBarIcon: ({ color }) => <Feather name="settings" size={24} color={color} />,
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
                        tabBarIcon: ({ color }) => <Feather name="log-out" size={24} color={color} />,
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
    tabBar: {
        position: "absolute",
        bottom: 20, // Espaciado desde el borde inferior
        left: 20,
        right: 20,
        backgroundColor: theme.colors.secondary, // Color de fondo
        height: 70,
        borderRadius: 20, // 🔥 Bordes redondeados
        borderTopWidth: 0, // 🔥 Eliminar línea superior
        elevation: 5, // 🔥 Sombra en Android
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginHorizontal: 20
    },
    tabBarLabel: {
        fontSize: 12,
        fontWeight: "bold",
    },
});

export default CaregiverNavigator;