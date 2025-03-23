import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import brazalete from "../../assets/Images/brazalete.png";
import { Ionicons } from "react-native-vector-icons";
import Background from "../../components/Background";
import theme from "../../themes/theme";
import StylesGen from "../../themes/stylesGen";
import { FontAwesome } from "@expo/vector-icons";

export default function BrazaleteRegistro({ navigation }) {
  const [isEnabled, setEnable] = useState(false);
  const conectado = isEnabled;

  // Altura de cada elemento (ajusta según tu diseño)
  const itemHeight = 100; // Altura aproximada de cada elemento
  const maxHeight = itemHeight * 5; // Altura máxima para 5 elementos

  const contacts = [
    {
      name: "Juan Perez",
      topico: "juan",
      estado: "Activo",
    },
    {
      name: "Pulido Cereth",
      topico: "pulido",
      estado: "Activo",
    },
    {
      name: "Freddy Julian",
      topico: "freddy",
      estado: "Activo",
    },
    {
      name: "Juan Perez",
      topico: "juanp",
      estado: "Activo",
    },
    {
      name: "Pulido Cereth",
      topico: "cerect",
      estado: "Desactivado",
    },
    {
      name: "Pulido Cereth",
      topico: "pulidocereth",
      estado: "Desactivado",
    },
    {
      name: "Pulido Cereth",
      topico: "pcereth",
      estado: "Desactivado",
    },
    {
      name: "Pulido Cereth",
      topico: "cerpulido",
      estado: "Desactivado",
    },
  ];

  return (
    <>
      <Background />
      <SafeAreaView style={StylesGen.container}>
        <View>
          <Text style={StylesGen.title}>Brazaletes</Text>
          <Text style={StylesGen.descrip}>
            Aquí podrás visualizar los brazaletes registrados.
          </Text>
          {contacts.length === 0 ? ( // Verifica si no hay contactos
            <View style={styles.noContactsContainer}>
              <Text style={styles.noContactsText}>
                No hay brazaletes registrados
              </Text>
            </View>
          ) : (
            <View style={{ overflow: "hidden", height: maxHeight, marginBottom:15 }}>
              <ScrollView
                style={StylesGen.scroll}
                showsVerticalScrollIndicator={true}
              >
                {contacts.map((contact, index) => (
                  <View key={index} style={styles.contactItem}>
                    <View style={styles.contactInfo}>
                      <View style={styles.edit}>
                        <Text style={styles.nameCui}>{contact.name}</Text>
                        {contact.estado === "Desactivado" ? (
                          ""
                        ) : (
                          <View>
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate("Brazalete Config", {
                                  mode: "edit", // Parámetro "edit"
                                  contact: contact, // Datos del contacto
                                })
                              }
                            >
                              <FontAwesome
                                name="edit"
                                size={24}
                                color="black"
                              />
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                      <Text>Topico: {contact.topico}</Text>
                      <View style={styles.estado}>
                        <Text
                          style={[
                            styles.estado,
                            contact.estado === "Activo"
                              ? styles.estadoFinalizado
                              : styles.estadoPendiente,
                          ]}
                        >
                          Estado: {contact.estado}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Brazalete Config")}
          >
            <Text style={styles.buttonText}>Agregar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 7,
  },
  estado: {
    alignItems: "flex-end",
    fontSize: 14,
    fontWeight: "bold",
  },
  estadoFinalizado: {
    color: "#4CAF89", // Verde
  },
  estadoPendiente: {
    color: "gray", // Rojo
  },
  edit: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
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
  noContactsContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 100, // Altura del contenedor del mensaje
  },
  noContactsText: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
  },
});