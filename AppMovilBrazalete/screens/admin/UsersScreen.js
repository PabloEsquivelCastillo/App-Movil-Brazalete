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
  const [desactivados, setDesactivados] = useState([]);
  useEffect(() => {
    if (token) {
      getCuidadores();
      getCuidadoresDesactivados();
    }
  }, []);

  //recargar al regresar de otra pantalla
  useFocusEffect(
    useCallback(() => {
      getCuidadores();
      getCuidadoresDesactivados();
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
      console.error("Error obteniendo cuidadores:", error);
      setContacts("No hay cuidadores");
    }
  };

  const getCuidadoresDesactivados = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/users/disabled`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Enviar el token en los headers
          },
        }
      );

      setDesactivados(response.data); // Guardar la respuesta en el estado
    } catch (error) {
      console.error("Error obteniendo cuidadores:", error);
      setDesactivados("No hay cuidadores");
    }
  };

  const handleReject = async (id) => {
    try {
      console.log("ID A ELIMINAR: ", id);
      // Enviar el id y la acción de rechazar a la API
      const response = await axios.put(
        `${API_BASE_URL}/api/users/deactivate/${id}`,
        {}, // Body vacío si no necesitas enviar datos
        {
          // Configuración como TERCER parámetro
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        Alert.alert("Éxito", "Usuario eliminado correctamente.");
        getCuidadores(); // Refresca la lista de solicitudes
        getCuidadoresDesactivados();
      } else {
        Alert.alert("Error", "No se pudo eliminar.");
      }
    } catch (error) {
      console.error("Error eliminando al cuidador:", error);
      Alert.alert("Error", "Hubo un problema al eliminar el cuidador.");
    }
  };

  const itemHeight = 90; // Altura aproximada de cada elemento
  const maxHeight = itemHeight * 5; // Altura máxima para 5 elementos

  const  handleActivar = async (id) => {
    try {
      // Verificar token
      if (!token) {
        Alert.alert("Error", "No hay token de autenticación");
        return;
      }
     
      const response = await axios.get(
        `${API_BASE_URL}/api/users/reactivate/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      getCuidadores();
      getCuidadoresDesactivados(); // Recargar la lista
      Alert.alert(
        "Éxito",
        "El cuidador ha sido activado correctamente"
      );
    } catch (error) {
      console.error("Error completo:", error);
      Alert.alert("Error", "Error al activar el cuidador");
    }
  }
  return (
    <>
      <Background />
      <SafeAreaView style={StylesGen.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.textContainer}>
              <Text style={StylesGen.title}>Cuidadores</Text>
              <Text style={StylesGen.descrip}>
                Aquí se muestran todos los{"\n"}cuidadores registrados
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Solicitudes")}
                style={{ alignItems: "center" }}
              >
                <Ionicons name="person-add-outline" size={40} color="gray" />
                <Text style={styles.iconText}>Solicitudes</Text>
              </TouchableOpacity>
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
                      <TouchableOpacity
                        onPress={() => handleReject(contact._id)}
                      >
                        <Ionicons name="trash" size={30} color="red" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              )}
            </ScrollView>
          </View>
          <View style={styles.textContainer}>
            <Text style={StylesGen.title}>Cuidadores desactivados</Text>
            <Text style={StylesGen.descrip}>
              Aquí se muestran todos los{"\n"}cuidadores que fueron
              desactivados.
            </Text>
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
              {desactivados.length === 0 ? (
                <Text style={StylesGen.descrip}>
                  No hay cuidadores desactivados.
                </Text>
              ) : (
                  desactivados.map((contact, index) => (
                <View key={index} style={styles.contactItem}>
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{contact.name}</Text>
                    <Text style={styles.contactEmail}>{contact.email}</Text>
                  </View>
                  <View style={styles.buttonContainer}>
                        <Text style={{color:'green', fontWeight: "500", marginLeft:10}}onPress={() => handleActivar(contact._id) }>Activar</Text>
                      </View>
                </View>
              ))
            )}
            </ScrollView>
          </View>
        </ScrollView>
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
    marginTop: 35,
    marginRight: 1,
  },
  iconText: {
    fontSize: 16,
    color: "gray",
  },
});
