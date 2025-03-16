import React, { useState, useEffect } from "react";
import { SafeAreaView, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, TextInput, View, Alert } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Background from "../../components/Background";
import theme from "../../themes/theme";

export default function BrazaleteConfig({ route, navigation }) {

    
    // Si estamos en modo edición, llenamos el nombre del brazalete
    useEffect(() => {
        if (mode === 'edit') {
            setName(brazaleteName); // Llenamos el nombre del brazalete si estamos en edición
        }
    }, [mode, brazaleteName]);

    // Obtenemos el parámetro desde la navegación
    const { mode, brazaleteName } = route.params || {}; // 'mode' puede ser 'edit' o 'register'

    const title = mode === 'edit' ? 'Configuración del Brazalete' : 'Registro del Brazalete';

    // Función para validar el nombre de usuario
    const validateName = (text) => {
        setName(text);
        const nameRegex = /^[a-zA-Z\s]{3,}$/;
        setIsValidName(nameRegex.test(text));
    };


        
    const [name, setName] = useState('');
    const [isValidName, setIsValidName] = useState(true);

    const [error, setError] = useState(false);

    const validateForm = () => {
        if (!name) {
            setError(true);
            return false;
        }
        setError(false);
        return true;
    };

    const handleRegister = () => {
        if (!validateForm()) {
            return;
        }
        Alert.alert("Éxito", "Configuración del brazalete guardada correctamente.");
    };



    return (
        <>
            <Background />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="back" size={24} color="black" style={styles.buttonBack} />
                </TouchableOpacity>
                <Text style={[styles.title, { marginTop: 50 }]}>{title}</Text>
                <Text style={styles.text}>Aquí podrás modificar el nombre de tu brazalete</Text>

                <View style={[styles.inputContainer, !isValidName && styles.inputError]}>
                    <TextInput
                        placeholder="Nombre del brazalete"
                        style={styles.input}
                        value={name}
                        onChangeText={validateName}
                    />
                </View>
                <View style={[styles.inputContainer]}>
                    <TextInput placeholder="Topico" style={styles.input} />
                </View>
                {!isValidName && (
                    <Text style={styles.errorText}>
                        El nombre debe tener al menos 3 caracteres y solo letras y espacios.
                    </Text>
                )}

                <TouchableOpacity
                    style={[styles.button, !isValidName && styles.buttonDisabled]}
                    onPress={handleRegister}
                    disabled={!isValidName}
                >
                    <Text style={styles.buttonText}>Guardar</Text>
                </TouchableOpacity>

                {error && <Text style={styles.errorText}>Complete todos los campos.</Text>}
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
    inputContainer: {
        borderWidth: 1,
        borderColor: theme.colors.secondary,
        backgroundColor: theme.colors.primary,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    inputError: {
        backgroundColor: theme.colors.errorBackground,
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
        marginTop: "auto",
    },
    buttonDisabled: {
        backgroundColor: "#ccc",
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
});
