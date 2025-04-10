import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import Background from "../../components/Background";
import StylesGen from "../../themes/stylesGen";
import { API_BASE_URL } from "@env";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { shareAsync } from "expo-sharing";
import { printToFileAsync } from "expo-print";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

export default function Recordatorios({ navigation }) {
  const { user, token } = useContext(AuthContext);
  const [recordatorios, setRecordatorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pdfUri, setPdfUri] = useState(null);

  const cuidadorId = user?.payload?.id;

  useEffect(() => {
    if (token) {
      getRecordatorios(cuidadorId);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      getRecordatorios(cuidadorId);
    }, [])
  );

  //Obtener recordatorios
  const getRecordatorios = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/api/reminders/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRecordatorios(response.data);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los recordatorios");
    } finally {
      setLoading(false);
    }
  };

  //Formater fecha
  const formatFecha = () => {
    const meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    const fecha = new Date();
    return `Fecha de creación: ${fecha.getDate()} de ${
      meses[fecha.getMonth()]
    } de ${fecha.getFullYear()}`;
  };

  //Generar PDF
  const generarPDF = async () => {
    try {
      const tablarecordatorios = recordatorios
        .map(
          (rec) => `
          <tr>
            <td style="border: 1px solid #000; padding: 8px;">${rec.usuario.name}</td>
            <td style="border: 1px solid #000; padding: 8px;">${rec.medicamentos.nombre}</td>
            <td style="border: 1px solid #000; padding: 8px;">${rec.nombre_paciente}</td>
            <td style="border: 1px solid #000; padding: 8px;">${formatDate(rec.inicio)}</td>
            <td style="border: 1px solid #000; padding: 8px;">${formatDate(rec.fin)}</td>
          </tr>
        `
        )
        .join("");

      const html = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1 style="text-align: center;">Recordatorios disponibles</h1>
          <p style="text-align: right; font-size: 12px; color: #555;">${formatFecha()}</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <th style="border: 1px solid #000; padding: 10px; background-color: #4CAF89; color: white; font-size: 15px;">Cuidador</th>
              <th style="border: 1px solid #000; padding: 10px; background-color: #4CAF89; color: white; font-size: 15px;">Medicamento</th>
              <th style="border: 1px solid #000; padding: 10px; background-color: #4CAF89; color: white; font-size: 15px;">Paciente</th>
              <th style="border: 1px solid #000; padding: 10px; background-color: #4CAF89; color: white; font-size: 15px;">Inicio</th>
              <th style="border: 1px solid #000; padding: 10px; background-color: #4CAF89; color: white; font-size: 15px;">Fin</th>
            </tr>
            ${tablarecordatorios}
          </table>
        </div>
      `;
      const file = await printToFileAsync({ html, base64: false });
      setPdfUri(file.uri);
      await shareAsync(file.uri);
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al generar el PDF");
    }
  };

  //Desactivar Recordatorio
  const handleDelete = (recordatorio_id) => {

    Alert.alert(
      "Eliminar recordatorio",
      "¿Estás seguro de eliminar el recordatorio?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Si, desactivar",
          onPress: async () => {
            try {
              if (!token) {
                Alert.alert("Error", "No hay token de autenticación");
                return;
              }

              const response = await axios.put(
                `${API_BASE_URL}/api/reminder/${recordatorio_id}/deactivate`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              );

              getRecordatorios(cuidadorId);
              Alert.alert(
                "Exito",
                "El medicamento ha sido eliminado correctament"
              );
            } catch (error) {
              Alert.alert("Error", "Error al desactivar el medicamento");
            }
          },
        },
      ]
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <Background>
        <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF89" />
        </SafeAreaView>
      </Background>
    );
  }

  return (
    <>
      <Background />
      <SafeAreaView style={StylesGen.container}>
        <View style={styles.header}>
          <Text style={StylesGen.title}>Historial de recordatorios</Text>
          <Text style={StylesGen.descrip}>
            Para ver su historial haz
            clic en un registro.
          </Text>
        </View>

        <ScrollView style={styles.scrollContainer}>
          {!Array.isArray(recordatorios) || recordatorios.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No hay recordatorios registrados.
              </Text>
            </View>
          ) : (
            <View style={styles.listContainer}>
              {recordatorios.map((recordatorio) => (
                <TouchableOpacity
                  key={recordatorio._id}
                  onPress={() =>
                    navigation.navigate("Historial", {
                      id: recordatorio._id,
                    })
                  }
                  style={styles.card}
                >
                  <View>
                    <View
                      style={[
                        styles,
                        {
                          flexDirection: "row",
                          justifyContent: "space-between",
                        },
                      ]}
                    >
                      <Text style={styles.cuidadorName}>
                        {recordatorio.usuario.name}
                      </Text>
                      <TouchableOpacity
                        onPress={() => handleDelete(recordatorio._id)}
                        style={[styles, { alignSelf: "flex-end" }]}
                      >
                        <Ionicons name="trash" size={30} color="red" />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.medicamentoName}>
                      {recordatorio.medicamentos.nombre}
                    </Text>
                    <Text style={styles.pacienteName}>
                      Paciente: {recordatorio.nombre_paciente}
                    </Text>
                    {recordatorio.cronico && (
                      <Text style={styles.cronicoBadge}>Crónico</Text>
                    )}
                    <View style={styles.datesContainer}>
                      <Text style={styles.dateText}>
                        Inicio: {formatDate(recordatorio.inicio)}
                      </Text>
                      <Text style={styles.dateText}>
                        Fin: {formatDate(recordatorio.fin)}
                      </Text>
                    </View>
                    <View style={styles.statusContainer}>
                      <Text
                        style={[
                          styles.statusText,
                          recordatorio.edo
                            ? styles.statusCompleted
                            : styles.statusPending,
                        ]}
                      >
                        {recordatorio.edo ? "Finalizado" : "Pendiente"}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>

        <View style={styles.iconContainer}>
          {/*PARA REGISTRAR */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Registro")}
            style={{ alignItems: "center" }}
          >
            <Ionicons name="watch-outline" size={40} color="green" />
            <Text style={styles.iconText}>Agregar</Text>
          </TouchableOpacity>
          {/*PARA VER DESACTIVADOS */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Desactivados")}
            style={{ alignItems: "center" }}
          >
            <FontAwesome name="times-circle" size={38} color="#e74c3c" />
            <Text style={styles.iconText}>Desactivados</Text>
          </TouchableOpacity>
          {/*PARA DESCARGAR PDF */}
          <TouchableOpacity
            onPress={generarPDF}
            style={{ alignItems: "center" }}
          >
            <FontAwesome name="file-pdf-o" size={38} color="#e74c3c" />
            <Text style={styles.iconText}>Descargar</Text>
          </TouchableOpacity>
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
    marginBottom: 16,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4CAF89",
    width: "100%",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
  },
  listContainer: {
    marginBottom: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  recordatorioContent: {
    flex: 1,
  },
  cuidadorName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  medicamentoName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  pacienteName: {
    fontSize: 14,
    color: "#4CAF89",
    marginBottom: 5,
  },
  cronicoBadge: {
    color: "red",
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 10,
  },
  datesContainer: {
    marginTop: 10,
  },
  dateText: {
    fontSize: 13,
    color: "#555",
    marginBottom: 3,
  },
  statusContainer: {
    marginTop: 10,
    alignItems: "flex-end",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  statusCompleted: {
    backgroundColor: "#E8F5E9",
    color: "#2E7D32",
  },
  statusPending: {
    backgroundColor: "#FFEBEE",
    color: "#C62828",
  },
  buttonsContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#4CAF89",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
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
  header: {
    marginTop:15,
    marginBottom:10
  },
  pdfIcon: {
    marginRight:20
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    flexDirection: "row",
    marginTop: 20,
    marginBottom:40
  },
  iconText: {
    fontSize: 16,
    color: "black",
    fontWeight: "300",
  },
});