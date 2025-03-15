import React, { useState } from "react";
import Background from "../components/Background";
import { SafeAreaView, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, TextInput, View, Alert } from "react-native";
import theme from "../themes/theme";

export default function BrazaleteConfig() {
    const [name, setName] = useState('');
    const [isValidName, setIsValidName] = useState(true);


    

    // Función para validar el nombre de usuario
    const validateName = (text) => {
        setName(text);
        // Validación: El nombre debe tener al menos 3 caracteres y solo letras y espacios
        const nameRegex = /^[a-zA-Z\s]{3,}$/;
        setIsValidName(nameRegex.test(text));
    };

    const [error, setError] = useState(false);

    // Función para validar el formulario
    const validateForm = () => {
        if (!name) {
            setError(true); // Muestra el mensaje de error general
            return false;
        }
        setError(false); // Oculta el mensaje de error si el formulario es válido
        return true;
    };

    // Función para manejar el registro
    const handleRegister = () => {
        if (!validateForm()) {
            return; // Detiene el proceso si la validación falla
        }
        Alert.alert("Éxito", "Configuración del brazalete guardada correctamente.");
        // Aquí puedes agregar la lógica para guardar los datos
    };

    return (
        <>
            <Background />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}>
                <Text style={[styles.title, { marginTop: 50 }]}>Configuración del brazalete</Text>
                <Text style={styles.text}>Aquí podrás modificar el nombre de tu brazalete</Text>

                {/* Input para el nombre del usuario */}
                <View style={[styles.inputContainer, !isValidName && styles.inputError]}>
                    <TextInput
                        placeholder="Nombre del brazalete"
                        style={styles.input}
                        value={name}
                        onChangeText={validateName}
                    />
                </View>
                {!isValidName && (
                    <Text style={styles.errorText}>
                        El nombre debe tener al menos 3 caracteres y solo letras y espacios.
                    </Text>
                )}

                {/* Botón para guardar */}
                <TouchableOpacity
                    style={[styles.button, !isValidName && styles.buttonDisabled]} // Desactiva el botón solo si el nombre no es válido
                    onPress={handleRegister}
                    disabled={!isValidName} // Desactiva el botón solo si el nombre no es válido
                >
                    <Text style={styles.buttonText}>Guardar</Text>
                </TouchableOpacity>

                {error && (
                    <Text style={styles.errorText}>Complete todos los campos.</Text>
                )}
            </KeyboardAvoidingView>
            <SafeAreaView />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignSelf: "center",
        paddingHorizontal: 20,
        paddingVertical: 20,
        justifyContent: "space-between"
    },
    title: {
        fontSize: 35,
        fontWeight: "bold",
        marginBottom: 30,
        color: "#6DCE9D",
    },
    text: {
        fontSize: 16,
        color: "#666",
        marginBottom: 20,
    },
    // Input
    inputContainer: {
        borderWidth: 1,
        borderColor: theme.colors.secondary,
        backgroundColor: theme.colors.primary,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    inputError: {
        backgroundColor: theme.colors.errorBackground, // Cambia el color del botón si está deshabilitado
        borderColor: theme.colors.errorBorder
    },
    input: {
        fontSize: 16,
        color: "#333",
        height: 50,
    },
    errorText: {
        color: theme.colors.errorBorder,
        fontSize: 14,
        marginTop: 0,
        marginBottom: 10,
        alignSelf: "center",
    },
    button: {
        backgroundColor: theme.colors.secondary,
        paddingVertical: 12,
        borderRadius: 10,
        width: "100%",
        alignItems: "center",
        shadowColor: "#000",
        alignSelf: "center",
        position: "static",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
        marginTop: "auto", // Se empuja hacia abajo sin afectar el layout
        
    },

    buttonDisabled: {
        backgroundColor: "#ccc", // Cambia el color del botón si está deshabilitado
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
        marginRight: 10,
    },
});