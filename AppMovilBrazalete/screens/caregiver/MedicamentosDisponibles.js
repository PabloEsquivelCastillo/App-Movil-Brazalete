import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Background from "../../components/Background";
import { SearchBar } from "react-native-elements";
import StylesGen from "../../themes/stylesGen";

export default function MedicamentosDisponibles({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Buscando:", query);
  };
   // Altura de cada elemento (ajusta según tu diseño)
   const itemHeight = 100; // Altura aproximada de cada elemento
   const maxHeight = itemHeight * 5; // Altura máxima para 5 elementos
  const contacts = [
    {
      name: "Paracetamol",
      email: "Alivia dolor de cabeza y también cansancio extremo.",
    },
    {
      name: "Ibuprofeno",
      email: "Alivia dolor de cabeza y también cansancio extremo .",
    },
    {
      name: "Loratadina",
      email: "Alivia dolor de cabeza y también cansancio extremo.",
    },
    {
      name: "Paracetamol",
      email: "Alivia dolor de cabeza y también cansancio extremo.",
    },
    {
      name: "Ibuprofeno",
      email: "Alivia dolor de cabeza y también cansancio extremo.",
    },
    {
      name: "Loratadina",
      email: "Alivia dolor de cabeza y también cansancio extremo.",
    },
    {
      name: "Paracetamol",
      email: "Alivia dolor de cabeza y también cansancio extremo.",
    },
    {
      name: "Ibuprofeno",
      email: "Alivia dolor de cabeza y también cansancio extremo.",
    },
  ];

  const handleLogout = () => {
          Alert.alert(
              "Eliminar medicamento",
              "¿Estás seguro de que deseas eliminar el medicamento?",
              [
                  { text: "Cancelar", style: "cancel" },
                  { text: "Sí, salir"},
              ]
          );
      };

  return (
    <>
      <Background />
      <SafeAreaView style={StylesGen.container}>
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={StylesGen.title}>Medicamentos</Text>
            <Text style={StylesGen.descrip}>
              Aquí se muestran todos los medicamentos disponibles.
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Registro")}
              style={{ alignItems: "center" }}
            >
              <Ionicons name="medkit-outline" size={40} color="gray" />
              <Text style={styles.iconText}>Agregar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ overflow: "hidden", height: maxHeight, marginBottom:15 }}>
        <ScrollView
          style={StylesGen.scroll}
          showsVerticalScrollIndicator={true}
        >
          {contacts.map((contact, index) => (
            <View key={index} style={styles.contactItem}>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactEmail}>{contact.email}</Text>
              </View>
              <View style={styles.buttonContainer}>
                {/* Botón de Aceptar con ícono de palomita (check) */}
                <TouchableOpacity
                  onPress={() => navigation.navigate("ActualizarMed")}
                  style={{ marginRight: 18 }}
                >
                  <FontAwesome name="edit" size={30} color="black" />
                </TouchableOpacity>

                {/* Botón de Rechazar con ícono de equis (times) */}
                <TouchableOpacity onPress={handleLogout}>
                  <Ionicons name="trash" size={30} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Descargar PDF</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  descrip: {
    fontSize: 18,
    marginBottom: 15,
  },
  contactItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4CAF89",
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  contactEmail: {
    fontSize: 14,
    color: "gray",
  },
  button: {
    backgroundColor: "#4CAF89",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    margin: 5,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
  },
  iconContainer: {
    alignItems: "center",
    marginTop: 35,
    marginRight: 1,
  },
  iconText: {
    fontSize: 16,
    color: "gray",
  },
});
