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
    tabBar: {
        position: "absolute",
        bottom: 20, // Espaciado desde el borde inferior
        left: 20,
        right: 20,
        backgroundColor: theme.colors.secondary, // Color de fondo
        height: 70,
        borderRadius: 20, // Bordes redondeados
        borderTopWidth: 0, // Eliminar línea superior
        elevation: 5, // Sombra en Android
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
    activeIconContainer: {
        width: 60, // Tamaño del círculo
        height: 60, // Tamaño del círculo
        borderRadius: 60, // Forma circular
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Color gris más oscuro con opacidad para el círculo
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "black", // Color de la sombra
        shadowOffset: { width: 0, height: 0 }, // Sombra hacia abajo
        shadowOpacity: 0.5, // Sombra más opaca
        shadowRadius: 10, // Mayor difusión de la sombra
        elevation: 8, // Sombra más prominente en Android
        transform: [{ scale: 1.1 }], // Agregar un pequeño aumento de tamaño para destacar
        transition: 'all 0.3s ease', // Transición suave en el cambio de tamaño
    },
    icon: {
        color: 'black', // Asegura que el ícono sea negro
        fontSize: 26, // Tamaño del ícono
    },
});


export default CaregiverNavigator;
