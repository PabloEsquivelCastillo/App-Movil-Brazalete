import React, { useContext, useEffect, useState } from "react";
import Background from "../../components/Background";
import { FontAwesome } from "@expo/vector-icons";
import { Alert } from "react-native"; // Añade esto al inicio
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { API_BASE_URL } from "@env";
import StylesGen from "../../themes/stylesGen";

export default function RequestsScreen() {
  const { token } = useContext(AuthContext); // Obtener el token del contexto
  const [solicitudes, setSolicitudes] = useState([]); // Estado para los cuidadores
  const [loading, setLoading] = useState(false); // Estado para mostrar carga
  useEffect(() => {
    if (token) {
      getSolicitudes();
    }
  }, []);

  const getSolicitudes = async () => {
    setLoading(true); // Inicia el estado de carga
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/users/listKeepers`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Enviar el token en los headers
          },
        }
      );

      setSolicitudes(response.data); // Guardar la respuesta en el estado
      setLoading(false); // Inicia el estado de carga
    } catch (error) {
      setSolicitudes("No hay solicitudes");
    }
  };
  const handleAccept = async (id) => {
    try {
      // Enviar el id y la acción de aceptar a la API
      const response = await axios.get(
        `${API_BASE_URL}/api/acepKeep/${id}`,
        
        {
          headers: {
            Authorization: `Bearer ${token}`, // Asegúrate de enviar el token
          },
        }
      );

      if (response.status === 200) {
        Alert.alert("Éxito", "Solicitud aceptada correctamente.");
        getSolicitudes(); // Refresca la lista de solicitudes
      } else {
        Alert.alert("Error", "No se pudo aceptar la solicitud.");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al aceptar la solicitud.");
    }
  };

  const handleReject = async (id) => {
    try {
      // Enviar el id y la acción de rechazar a la API
      const response = await axios.get(
        `${API_BASE_URL}/api/users/deny/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Asegúrate de enviar el token
          },
        }
      );

      if (response.status === 200) {
        Alert.alert("Éxito", "Solicitud rechazada correctamente.");
        getSolicitudes(); // Refresca la lista de solicitudes
      } else {
        Alert.alert("Error", "No se pudo rechazar la solicitud.");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al rechazar la solicitud.");
    }
  };

  return (
    <>
      <Background />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>Solicitudes pendientes</Text>
              <Text style={styles.description}>
                Aqui se encuentran las solicitudes pendientes de la gente que
                sera cuidadora.
              </Text>
            </View>
            {loading === true ? (
              <View>
                <Text style={StylesGen.descrip}>Cargando...</Text>
              </View>
            ) : Array.isArray(solicitudes) && solicitudes.length === 0 ? (
              <View>
                <Text style={StylesGen.descrip}>
                  No hay solicitudes pendientes.
                </Text>
              </View>
            ) : (
              <View>
                {solicitudes.map((contact, index) => (
                  <View key={index} style={styles.contactItem}>
                    <View style={styles.contactInfo}>
                      <Text style={styles.contactName}>{contact.name}</Text>
                      <Text style={styles.contactEmail}>{contact.email}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                      {/* Botón de Aceptar con ícono de palomita (check) */}
                      <TouchableOpacity
                        style={[styles.button, styles.acceptButton]}
                        onPress={() => handleAccept(contact._id)}
                      >
                        <FontAwesome name="check" size={24} color="green" />
                      </TouchableOpacity>

                      {/* Botón de Rechazar con ícono de equis (times) */}
                      <TouchableOpacity
                        style={[styles.button, styles.rejectButton]}
                        onPress={() => handleReject(contact._id)}
                      >
                        <FontAwesome name="times" size={24} color="red" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 30,
    color: "#4CAF89",
  },
  description: {
    fontSize: 20,
    textAlign: "justify",
    marginBottom: 30,
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
});
