import React, { useState } from "react";
import theme from "../../themes/theme";
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Text, Modal, FlatList } from "react-native";
import Background from "../../components/Background";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';




export default function HistorialRecordatorios({ navigation }) {
    const [searchQuery1, setSearchQuery1] = useState('');
    const [searchQuery2, setSearchQuery2] = useState('');

    const data1 = [
        { id: '1', name: 'Paracetamol', dosage: '1 Tableta cada 8 horas' },
        { id: '2', name: 'Ibuprofeno', dosage: '1 Tableta cada 6 horas' },
        { id: '3', name: 'Loratadina', dosage: '1 Tableta cada 24 horas' },
        { id: '4', name: 'Paracetamol', dosage: '1 Tableta cada 8 horas' },

    ];


    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handlePress = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const handleSearch1 = (query) => {
        setSearchQuery1(query);
    };





    return (
        <>
            <SafeAreaView style={styles.SafeAreaView}>
                <Background />
                <View style={styles.container}>

                    {/**Botono para volver */}
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back-circle-outline" size={30} color="green" style={styles.buttonBack} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Historial de recordatorios</Text>
                    <Text style={styles.Text}>Aquí puedes consultar los recordatorios ya completados.</Text>



                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    SafeAreaView: {
        flex: 1,
    },
    container: {
        height: "50%",
        width: "100%",
        alignSelf: "center",
        paddingHorizontal: 20,
        paddingVertical: 20,
        justifyContent: "center"
    },
    title: {
        paddingTop: 20,
        fontFamily: "Poppins",
        color: theme.colors.secondary,
        fontSize: 28,
        fontWeight: "bold",
    },
    text: {
        fontSize: 12,
        alignSelf: 'flex-start',
        fontWeight: "400",
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
    buttonBack: {
        paddingTop: 30,
        color: theme.colors.secondary
    },
});