import React, { useContext, useEffect, useState } from "react";
import Background from "../../components/Background";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Alert } from "react-native";
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import StylesGen from "../../themes/stylesGen";
import { API_BASE_URL } from "@env";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function UsersScreen({ navigation }) {
  const { token } = useContext(AuthContext); // Obtener el token del contexto
  const [contacts, setContacts] = useState([]); // Estado para los cuidadores
  useEffect(() => {
    if (token) {
      getCuidadores();
    }
  }, []);

  //recargar al regresar de otra pantalla
  useFocusEffect(
    useCallback(() => {
      getCuidadores();
    }, [])
  );

  const getCuidadores = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/users/listKeeperss`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Enviar el token en los headers
          },
        }
      );
      setContacts(response.data); // Guardar la respuesta en el estado
    } catch (error) {
      setContacts("No hay cuidadores");
    }
  };

  const handleReject = async (id) => {
    try {
      // Enviar el id y la acción de rechazar a la API
      const response = await axios.put(
        `${API_BASE_URL}/api/users/deactivate/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        Alert.alert("Éxito", "Usuario eliminado correctamente.");
        getCuidadores(); // Refresca la lista de solicitudes
      } else {
        Alert.alert("Error", "No se pudo eliminar.");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al eliminar el cuidador.");
    }
  };

  const itemHeight = 90; // Altura aproximada de cada elemento
  const maxHeight = itemHeight * 6; // Altura máxima para 5 elementos

  return (
    <>
      <Background />
      <SafeAreaView style={StylesGen.container}>
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={StylesGen.title}>Cuidadores</Text>
            <Text style={StylesGen.descrip}>
              Aquí se muestran todos los cuidadores registrados
            </Text>
          </View>
        </View>
        <View
          style={{
            overflow: "hidden",
            maxHeight: maxHeight,
            marginBottom: 15,
          }}
        >
          <ScrollView
            style={StylesGen.scroll}
            showsVerticalScrollIndicator={true}
          >
            {/* Cuidadores activos */}
            {contacts.length === 0 ? (
              <Text style={{ textAlign: "center", color: "gray" }}>
                No hay cuidadores registrados
              </Text>
            ) : (
              contacts.map((contact, index) => (
                <View key={index} style={styles.contactItem}>
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{contact.name}</Text>
                    <Text style={styles.contactEmail}>{contact.email}</Text>
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={{ marginRight: 15 }}
                      onPress={() => {
                        navigation.navigate("Cuidador update", {
                          id: contact._id,
                        });
                      }}
                    >
                      <FontAwesome name="edit" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleReject(contact._id)}>
                      <Ionicons name="trash" size={30} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Solicitudes")}
              style={{ alignItems: "center" }}
            >
              <Ionicons name="person-add-outline" size={40} color="black" />
              <Text style={styles.iconText}>Solicitudes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Desac")}
              style={{ alignItems: "center" }}
            >
              <FontAwesome name="times-circle" size={38} color="#e74c3c" />
              <Text style={styles.iconText}>Desactivados</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    marginBottom: 10,
    padding: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#4CAF89",
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
  },
  contactEmail: {
    fontSize: 14,
    color: "gray",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    padding: 8,
    borderRadius: 15,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
    marginTop: 35,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginHorizontal: 40,
    flexDirection: "row",
  },
  iconText: {
    fontSize: 16,
    color: "black",
    fontWeight: "300",
  },
});
