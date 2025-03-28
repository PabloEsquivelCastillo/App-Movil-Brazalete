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
import StylesGen from "../../themes/stylesGen";

export default function Recordatorios({navigation}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Buscando:", query);
   
  
  };
   // Altura de cada elemento (ajusta según tu diseño)
  const itemHeight = 90; // Altura aproximada de cada elemento
  const maxHeight = itemHeight * 5; // Altura máxima para 5 elementos
  const contacts = [
    {
      name: "Juan Perez",
      nameMedic: "Paracetamol",
      namePac: "Alan Barrera",
      inicio: "05/03/2025",
      fin: "08/03/2025",
      estado: "Finalizado",
    },
    {
      name: "Pulido Cereth",
      nameMedic: "Ibuprofeno",
      namePac: "Paco Alarcon",
      inicio: "01/03/2025",
      fin: "05/03/2025",
      estado: "Finalizado",
    },
    {
      name: "Freddy Julian",
      nameMedic: "Loratadina",
      namePac: "Cereth Mondragon",
      inicio: "02/03/2025",
      fin: "03/03/2025",
      estado: "Finalizado",
    },
    {
      name: "Pablo Pasita",
      nameMedic: "Ambroxol",
      namePac: "Jonathan Bar",
      inicio: "03/03/2025",
      fin: "05/03/2025",
      estado: "Finalizado",
    },
    {
      name: "Paquinno",
      nameMedic: "Naproxeno",
      namePac: "Leo Sanchez",
      inicio: "01/03/2025",
      fin: "05/03/2025",
      estado: "Finalizado",
    },
    {
      name: "Salem roman",
      nameMedic: "Paracetamol",
      namePac: "Oscar Montes",
      inicio: "04/03/2025",
      fin: "08/03/2025",
      estado: "Finalizado",
    },
  ];

  return (
    <>
      <Background />
      <SafeAreaView style={StylesGen.container}>
        <View style={styles.textContainer}>
          <Text style={StylesGen.title}>Historial de recordatorios</Text>
          <Text style={styles.descrip}>
            Aquí puedes consultar los recordatorios ya completados. Para ver su historial haz clic en un registro.
          </Text>
        </View>
        <View style={{ overflow: "hidden", height: maxHeight, marginBottom:15}}>
        <ScrollView
          style={StylesGen.scroll}
          showsVerticalScrollIndicator={true}
        >
          {contacts.map((contact, index) => (
            <TouchableOpacity onPress={() => navigation.navigate("Historial")} >
              <View key={index} style={[styles.contactItem, styles.card]}>
              <View style={styles.contactInfo}>
                <Text style={styles.nameCui}>{contact.name}</Text>
                <Text style={styles.nameMed}>{contact.nameMedic}</Text>
                <Text style={styles.namePac}>
                  Paciente: {contact.namePac}
                </Text>
                <View style={styles.fechas}>
                  <Text style={styles.contactEmail}>
                    Inicio: {contact.inicio}
                  </Text>
                  <Text style={styles.contactEmail}>Fin:     {contact.fin}</Text>
                </View>
                <View style={styles.estado}>
                  <Text
                    style={[
                      styles.estado,
                      contact.estado === "Finalizado"
                        ? styles.estadoFinalizado
                        : styles.estadoPendiente,
                    ]}
                  >
                    Estado: {contact.estado}
                  </Text>
                </View>
              </View>
            </View>
            </TouchableOpacity>
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
    width: "100%",
  },
  contactInfo: {
    flex: 1,
  },
  nameCui: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  nameMed: {
    fontSize: 18,
    fontWeight: '1000',
    color: "#000",
  },
  namePac: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#4CAF89", // Verde para destacar
  },
  fechas: {
    marginTop: 15,
    fontSize: 14,
  },
  estado: {
    alignItems:'flex-end',
    fontSize: 14,
    fontWeight: "bold",
  },
  estadoFinalizado: {
    color: "#4CAF89", // Verde
  },
  estadoPendiente: {
    color: "red", // Rojo
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
    marginBottom:10
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    marginTop:35
  },
  card:{
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#66CC99", // Color de la sombra
    shadowOffset: { width: 2, height: 2 }, // Dirección de la sombra
    shadowOpacity: 0.6, // Opacidad de la sombra
    shadowRadius: 5, // Radio de difuminado
    elevation: 5, // Sombra en Android
    marginTop:5
  }
});
