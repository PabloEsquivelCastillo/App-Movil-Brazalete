import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import brazalete from '../../assets/Images/brazalete.png';
import { Ionicons } from 'react-native-vector-icons';
import Background from "../../components/Background";
import theme from "../../themes/theme";


export default function BrazaleteRegistro({ navigation }) {
    const [isEnabled, setEnable] = useState(false);
    const conectado = isEnabled;

    const toggleSwitch = () => setEnable(previousState => !previousState);

    const SecondCard = ({ title, onEdit }) => (
        <View style={styles.secondCard}>
            <Text style={styles.secondCardTitle}>{title}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.editButton} onPress={onEdit}>
                    <Text style={styles.editText}>Editar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <>
            <Background />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Menú de Brazalete</Text>
                        <Text style={styles.text}>Aquí podrás agregar tus brazaletes de recordatorios.</Text>
                        <View style={styles.switchContainer}>
                            <Text style={styles.label}>Bluetooth</Text>
                            <Switch
                                trackColor={{ false: "#ccc", true: "#66CC99" }}
                                thumbColor={isEnabled ? theme.colors.primary : theme.colors.primary}
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                    </View>
                    {conectado ? (
                        <View style={styles.card}>
                            <Image source={brazalete} style={styles.image} />
                            <View style={styles.textContainer}>
                                <Text style={styles.cardTitle}>Brazalete Bluetooth</Text>
                                <TouchableOpacity
                                    style={styles.connectButton}
                                    onPress={() =>
                                        navigation.navigate("Brazalete Config", {
                                            mode: 'register',
                                            brazaleteName: "Brazalete de Juan", // Aquí puedes usar el nombre dinámico
                                        })
                                    }
                                >
                                    <Text style={styles.connectText}>Conectar</Text>
                                    <Ionicons name="add" size={20} color="#000" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <Text style={styles.warningText}>¡Asegúrate de encender tu bluetooth!</Text>
                    )}
                    <View style={styles.container}>
                        <Text style={styles.title}>Configuración del Brazalete</Text>
                        <Text style={styles.text}>Aquí podrás modificar la información de tu brazalete</Text>
                        <SecondCard
                            title="Brazalete de Juan"
                            onEdit={() =>
                                navigation.navigate("Brazalete Config", {
                                    mode: 'edit',
                                    brazaleteName: "Brazalete de Juan", // Pasamos el nombre del brazalete
                                })
                            }
                        />
                        <SecondCard
                            title="Brazalete de Alan"
                            onEdit={() =>
                                navigation.navigate("Brazalete Config", {
                                    mode: 'edit',
                                    brazaleteName: "Brazalete de Alan", // Pasamos el nombre del brazalete
                                })
                            }
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1, // Asegura que SafeAreaView ocupe todo el espacio
    },
    scrollView: {
        flexGrow: 1, // Hace que el ScrollView se expanda para ajustarse al contenido
        paddingHorizontal: 20, // Evita que el contenido se oculte detrás de la barra de navegación
        marginBottom: 100,
    },
    title: {
        fontFamily: "Poppins",
        color: "#66CC99",
        fontSize: 20,
        fontWeight: "bold",
    },
    titleContainer: {
        marginTop: 40,
        width: '100%',
    },
    text: {
        fontSize: 12,
        alignSelf: 'flex-start',
        fontWeight: "400",
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F2F2F2",
        borderRadius: 20,
        width: 190,
        justifyContent: "space-evenly",
        marginTop: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
    },
    warningText: {
        fontSize: 24,
        color: "#377F5B",
        fontWeight: "bold",
        marginTop: "30%",
        textAlign: "center",
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: "#000", // Color de la sombra
        shadowOffset: { width: 0, height: 4 }, // Dirección de la sombra
        shadowOpacity: 0.2, // Opacidad de la sombra
        shadowRadius: 4, // Radio de difuminado
        elevation: 5, // Sombra en Android
        marginTop: "20%",
        overflow: 'hidden',
        marginHorizontal: "auto",
        width: "80%"
    },
    image: {
        width: '100%',
        marginTop: 40,
        height: 200,
        resizeMode: "contain",
    },
    textContainer: {
        padding: 15,
        marginTop: 20
    },
    cardTitle: {
        fontSize: 21,
        fontWeight: '700',
        textAlign: "center",
        color: "#66CC99",
        marginBottom: 10,
    },
    connectButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F2F2F2",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignSelf: "center",
        marginTop: 10,
    },
    connectText: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#000",
        marginRight: 5,
    },
    container: {
        marginTop: "20%",
        marginBottom: "20%"
    },
    secondCard: {
        backgroundColor: theme.colors.primary,
        borderRadius: 10,
        padding: 15,
        marginTop: "10%",
        flexDirection: "row",
        alignItems: "center", // Alineación vertical
        justifyContent: "space-evenly", // Espaciado entre elementos
        shadowColor: "#000", // Color de la sombra
        shadowOffset: { width: 0, height: 4 }, // Dirección de la sombra
        shadowOpacity: 0.2, // Opacidad de la sombra
        shadowRadius: 4, // Radio de difuminado
        elevation: 5, // Sombra en Android
    },
    buttonContainer: {
        marginLeft: 10,
    },
    secondCardTitle: {
        fontSize: 16,
        fontWeight: "400",
    },
    editText: {
        color: "#66CC99",
        fontWeight: "bold",
    }
});

