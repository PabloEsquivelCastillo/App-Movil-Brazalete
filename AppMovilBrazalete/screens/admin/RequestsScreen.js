import react from "react";
import Background from "../../components/Background";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView, ScrollView, View, StyleSheet, Text, TouchableOpacity } from "react-native";

const contacts = [
    { name: 'Salem Román', email: '2023tm096@utez.edu.mx' },
    { name: 'Juan Pablo E.', email: '2023tm096@utez.edu.mx' },
    { name: 'Alan Mondragón', email: '2023tml14@utez.edu.mx' },
    { name: 'Daniel Aguilar', email: '2023tml15@utez.edu.mx' },
    { name: 'Francisco Cereth', email: '2023tml23@utez.edu.mx' },
  ];

export default function RequestsScreen (){
    const handleAccept = (contact) => {
    console.log('Aceptar:', contact.name);
    // Aquí puedes agregar la lógica para manejar la aceptación
  };

  const handleReject = (contact) => {
    console.log('Rechazar:', contact.name);
    // Aquí puedes agregar la lógica para manejar el rechazo
  };
    return (
        <>
        <Background/>
        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
                <View style={styles.container}>
                    <View>
                    <Text style={styles.title}>Solicitudes pendientes</Text>
                    <Text style={styles.description}>Aqui se encuentran las solicitudes pendientes de la gente que sera cuidadora.</Text>
                    </View>
                    {contacts.map((contact, index) => (
                    <View key={index} style={styles.contactItem}>
                        <View style={styles.contactInfo}>
                            <Text style={styles.contactName}>{contact.name}</Text>
                            <Text style={styles.contactEmail}>{contact.email}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            {/* Botón de Aceptar con ícono de palomita (check) */}
                            <TouchableOpacity
                                style={[styles.button, styles.acceptButton]}
                                onPress={() => handleAccept(contact)}
                                >
                                <FontAwesome name="check" size={24} color="green" />
                            </TouchableOpacity>

                            {/* Botón de Rechazar con ícono de equis (times) */}
                            <TouchableOpacity
                                style={[styles.button, styles.rejectButton]}
                                onPress={() => handleReject(contact)}
                                >
                                <FontAwesome name="times" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      justifyContent: "center"
    },
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 25,
        
      },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      marginTop:50,
      marginBottom: 30,
      color: "#4CAF89",
    },
    description:{
        fontSize: 20,
        textAlign:"justify",
        marginBottom:30
    },
    contactItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
      },
      contactInfo: {
        flex: 1,
      },
      contactName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom:5
      },
      contactEmail: {
        fontSize: 14,
        color: 'gray',
      },
      buttonContainer: {
        flexDirection: 'row',
      },
      button: {
        padding: 8,
        borderRadius: 15,
        marginLeft: 8,
        justifyContent: 'center',
        alignItems: 'center',
      },
     
});