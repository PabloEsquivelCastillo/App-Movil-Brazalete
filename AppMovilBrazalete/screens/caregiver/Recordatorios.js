import React, { useState } from "react";
import theme from "../../themes/theme";
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Text, Modal, FlatList } from "react-native";
import Background from "../../components/Background";



export default function Recordatorios() {
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
            <Background />

        </>
    );
}

const styles = StyleSheet.create({
    containerMain: {
        flex: 1,
        width: "90%",
        alignSelf: "center",
        justifyContent: "space-between",
    },
    title: {
        color: theme.colors.secondary,
        fontSize: 25,
        fontWeight: "bold",
    },
    containerTitle: {
        marginTop: 80,
        width: "100%",
        marginBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: theme.colors.primary,
    },
    textContainer: {
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: '400',
    },
    itemDosage: {
        fontSize: 14,
        color: '#666',
    },
    flatList: {
        width: "100%",
        alignSelf: "center",
        marginBottom: 20,
        height: 100, // Altura fija de la FlatList
    },

    button: {
        backgroundColor: theme.colors.secondary,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        width: "80%", // Ajusta el tamaño del botón
        marginTop: 10, // Espaciado después de la FlatList
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },

    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },

    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalCard: {
        width: 300,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: "none",
        borderRadius: 5
    },
    closeText: {
        color: "black",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "00"
    }
});