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
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Background from "../../components/Background";
import { useNavigation } from "@react-navigation/native";
import { SearchBar } from "react-native-elements";

export default function UpdateProfileScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Buscando:", query);
  };
  const contacts = [
    { name: 'Paracetamol', email: 'Juan Perez' },
    { name: 'Ibuprofeno', email: 'Alan Barrera' },
    { name: 'Loratadina', email: 'Paco Pulido' },
    { name: 'Paracetamol', email: 'Juan Perez' },
    { name: 'Ibuprofeno', email: 'Alan Barrera' },
  ];

  return (
    <>
      <Background />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ marginBottom: 30 }}>
              <View>
                <Text style={styles.title}>Historial de recordatorios</Text>
                <Text style={styles.descrip}>
                  Aquí puedes consultar los recordatorios ya completados.
                </Text>
              </View>
              <SearchBar
                placeholder="Buscar..."
                onChangeText={handleSearch}
                value={searchQuery}
                platform="ios" // Puedes usar "android" para otro estilo
                round // Esquinas redondeadas
                searchIcon={{ name: "search", size: 24 }} // Personaliza el ícono de búsqueda
                containerStyle={{
                  backgroundColor: "transparent",
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                }}
                inputContainerStyle={{
                  backgroundColor: "#f0f0f0",
                  borderRadius: 25,
                }}
                inputStyle={{
                  color: "#333",
                }}
              />
              <ScrollView>
              {contacts.map((contact, index) => (
                
                  <View key={index} style={styles.contactItem}>
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{contact.name}</Text>
                    <Text style={styles.contactEmail}>{contact.email}</Text>
                  </View>
                  <View style={styles.buttonContainer}>
                    {/* Botón de Aceptar con ícono de palomita (check) */}
                    <TouchableOpacity
                      
                    >
                      <Text>Información</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                
              ))}
              </ScrollView>
              <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Descargar PDF</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 35,
  },
  scrollContainer: {
    flexGrow: 1,
    marginTop:30,
    flex: 1,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#4CAF89",
  },
  descrip: {
    fontSize: 18,
    marginBottom: 15,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#E7F7EF',
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
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft:10,
    marginRight:10
  },
});
