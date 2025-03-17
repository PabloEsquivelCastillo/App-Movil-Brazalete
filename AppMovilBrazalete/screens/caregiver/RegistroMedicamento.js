import React from "react";
import Background from "../../components/Background";
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, TextInput, TouchableOpacity,  StyleSheet } from "react-native";
import theme from "../../themes/theme";




export default function RegistrarMedicamento({navigation}) {

    const renderHeader = () => (
        <View style={styles.containerTitle}>
            <Text style={styles.title}>Registro de medicamento</Text>
            <Text>Aquí podrás registrar medicamentos</Text>
        </View>
    );

    return (
        <>
            <Background />
            <SafeAreaView style={styles.containerMain}>
                {/**Botono para volver */}
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-circle-outline" size={30} color="green" style={styles.buttonBack} />
                </TouchableOpacity>

                {renderHeader()}


                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Nombre del medicamento"
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Descripcion del medicamento"
                        style={styles.input}
                    />
                </View>

                <TouchableOpacity
                    style={styles.button} // Desactiva el botón solo si el nombre no es válido
                >
                    <Text style={styles.buttonText}>Registrar medicamento</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create(
    {
        containerMain: {
            flex: 1,
            width: "90%",
            alignSelf: "center",
    
        },
        title: {
            color: theme.colors.secondary,
            fontSize: 25,
            fontWeight: "bold",
            marginTop: "20%"
        },
        inputContainer: {
            borderWidth: 1,
            borderColor: theme.colors.secondary,
            backgroundColor: theme.colors.primary,
            borderRadius: 10,
            paddingHorizontal: 10,
            marginTop: 20,
        },
        input: {
            fontSize: 16,
            color: "#333",
            height: 50,
        },
        button: {
            backgroundColor: theme.colors.secondary,
            paddingVertical: 15,
            borderRadius: 10,
            width: "100%", // Mismo ancho que el input y el dropdown
            alignItems: "center",
            shadowColor: "#000",
            alignSelf: "center",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 3,
            marginTop: 20
        },
    
        buttonText: {
            color: "#fff",
            fontSize: 18,
            fontWeight: "bold",
            marginLeft: 10,
            marginRight: 10,
        },
        buttonBack: {
            paddingTop: 30,
            color: theme.colors.secondary
        },
    }
)  