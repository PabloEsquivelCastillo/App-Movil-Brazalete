import React, { useState } from "react";
import theme from "../../themes/theme";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import Background from "../../components/Background";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { SearchBar } from 'react-native-elements';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function MedicamentosDisponibles({ navigation }) {

    const [searchQuery1, setSearchQuery1] = useState('');


    const data1 = [
        { id: '1', name: 'Paracetamol', dosage: 'Medicamento realizado para.., con ... y con ....' },
        { id: '2', name: 'Ibuprofeno', dosage: 'Medicamento realizado para.., con ... y con ....' },
        { id: '3', name: 'Loratadina', dosage: 'Medicamento realizado para.., con ... y con ....' },
        { id: '5', name: 'Paracetamol', dosage: '1Medicamento realizado para.., con ... y con ....' },
        { id: '6', name: 'Ibuprofeno', dosage: 'Medicamento realizado para.., con ... y con ....' },
        { id: '7', name: 'Loratadina', dosage: 'Medicamento realizado para.., con ... y con ....' }
    ];


    const handleSearch1 = (query) => {
        setSearchQuery1(query);
    };




    const renderSecondHeader = () => (
        <View style={[styles.containerTitle, { marginBlock: 10 }]} >
            <Text style={styles.title}>Medicamentos disponibles</Text>
            <Text>Aquí puedes consultar los recordatorios ya completados.</Text>
        </View>
    );
    return (
        <>
            <Background />
            <SafeAreaView style={styles.containerMain}>

                {renderSecondHeader()}
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Registro")}>
                <MaterialIcons name="add-circle-outline" size={24} color="black" style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>Registrar Medicamento</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}


const styles = StyleSheet.create({
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
        flexDirection: "row", // Alinea los elementos horizontalmente
        alignItems: "center", // Centra verticalmente los elementos
        backgroundColor: theme.colors.secondary,
        paddingVertical: 15,
        borderRadius: 10,
        justifyContent: "center",
        alignSelf: "center",
        width: "80%",
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    buttonIcon: {
        marginRight: 8, // Espacio entre el ícono y el texto
        color: "white"
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
})