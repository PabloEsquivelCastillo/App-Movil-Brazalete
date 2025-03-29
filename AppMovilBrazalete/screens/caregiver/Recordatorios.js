import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert
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
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      getRecordatorios(cuidadorId);
    }, [])
  );

  const getRecordatorios = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/reminders/timeout/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecordatorios(response.data);
    } catch (error) {
      console.error("Error obteniendo recordatorios:", error);
      Alert.alert("Error", "No se pudieron cargar los recordatorios");
    } finally {
      setLoading(false);
    }
  };

  const formatFecha = () => {
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const fecha = new Date();
    return `Fecha de creación: ${fecha.getDate()} de ${meses[fecha.getMonth()]} de ${fecha.getFullYear()}`;
  };

  const generarPDF = async () => {
    try {
      const tablarecordatorios = recordatorios.map((rec) => `
          <tr>
            <td style="border: 1px solid #000; padding: 8px;">${rec.usuario.name}</td>
            <td style="border: 1px solid #000; padding: 8px;">${rec.medicamentos.nombre}</td>
            <td style="border: 1px solid #000; padding: 8px;">${rec.nombre_paciente}</td>
            <td style="border: 1px solid #000; padding: 8px;">${rec.inicio}</td>
            <td style="border: 1px solid #000; padding: 8px;">${rec.fin}</td>
          </tr>
        `).join("");

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
      console.error("Error generando PDF:", error);
      Alert.alert("Error", "Hubo un problema al generar el PDF");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
      <SafeAreaView style={styles.container}>
        
          <View style={styles.header}>
            <Text style={styles.title}>Historial de recordatorios</Text>
            <Text style={styles.description}>
              Aquí puedes consultar los recordatorios ya completados. Para ver su historial haz clic en un registro.
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
                    onPress={() => navigation.navigate("Historial", {
                      id: recordatorio._id
                    })}
                    style={styles.card}
                  >
                    <View style={styles.recordatorioContent}>
                      <Text style={styles.cuidadorName}>{recordatorio.usuario.name}</Text>
                      <Text style={styles.medicamentoName}>{recordatorio.medicamentos.nombre}</Text>
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
                        <Text style={[
                          styles.statusText,
                          recordatorio.edo ? styles.statusCompleted : styles.statusPending
                        ]}>
                          {recordatorio.edo ? "Finalizado" : "Pendiente"}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </ScrollView>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={generarPDF}
              disabled={!Array.isArray(recordatorios) || recordatorios.length === 0}
            >
              <Text style={styles.buttonText}>Descargar PDF</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Registro")}
            >
              <Text style={styles.buttonText}>Nuevo recordatorio</Text>
            </TouchableOpacity>
          </View>
        
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
  listContainer: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  recordatorioContent: {
    flex: 1,
  },
  cuidadorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  medicamentoName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  pacienteName: {
    fontSize: 14,
    color: '#4CAF89',
    marginBottom: 5,
  },
  cronicoBadge: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 10,
  },
  datesContainer: {
    marginTop: 10,
  },
  dateText: {
    fontSize: 13,
    color: '#555',
    marginBottom: 3,
  },
  statusContainer: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  statusCompleted: {
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
  },
  statusPending: {
    backgroundColor: '#FFEBEE',
    color: '#C62828',
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
});