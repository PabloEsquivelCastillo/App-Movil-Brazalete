import React, { useContext, useEffect, useState } from "react";
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
import Background from "../../components/Background";
import StylesGen from "../../themes/stylesGen";
import { API_BASE_URL } from "@env";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function HistorialScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { token } = useContext(AuthContext); // Obtener el token del contexto
  const [historial, setHistorial] = useState([]); // Estado para los cuidadores
  useEffect(() => {
    if (token) {
      getSolicitudes();
    }
  }, [token]);

  const getSolicitudes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/reminder`, {
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token en los headers
        },
      });

      setHistorial(response.data); // Guardar la respuesta en el estado
    } catch (error) {
      console.error("Error obteniendo cuidadores:", error);
      setHistorial("No hay solicitudes");
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Buscando:", query);
  };
  // Altura de cada elemento (ajusta según tu diseño)
  const itemHeight = 90; // Altura aproximada de cada elemento
  const maxHeight = itemHeight * 5; // Altura máxima para 5 elementos

  return (
    <>
      <Background />
      <SafeAreaView style={StylesGen.container}>
        <View>
          <Text style={StylesGen.title}>Historial de recordatorios</Text>
        </View>
        {!Array.isArray(historial) || historial.length === 0 ? (
          <View>
            <Text style={StylesGen.descrip}>
              No hay recordatorios registrados.
            </Text>
          </View>
        ) : (
          <View>
            <Text style={styles.descrip}>
              Aquí puedes consultar los recordatorios ya completados. Para ver
              su historial haz clic en un registro.
            </Text>
            <View
              style={{
                overflow: "hidden",
                height: maxHeight,
                marginBottom: 15,
              }}
            >
              <ScrollView
                style={StylesGen.scroll}
                showsVerticalScrollIndicator={true}
              >
                {historial.map((contact, index) => (
                  <TouchableOpacity
                    key={contact._id}
                    onPress={() => navigation.navigate("Historico")}
                  >
                    <View key={index} style={styles.contactItem}>
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
                          <Text style={styles.contactEmail}>
                            Fin: {contact.fin}
                          </Text>
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
          </View>
        )}
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
    fontWeight: "1000",
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
    alignItems: "flex-end",
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
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 10,
  },
});
