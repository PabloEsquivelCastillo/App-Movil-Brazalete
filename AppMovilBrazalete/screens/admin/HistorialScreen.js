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
  Alert,
} from "react-native";
import Background from "../../components/Background";
import StylesGen from "../../themes/stylesGen";
import { API_BASE_URL } from "@env";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { shareAsync } from "expo-sharing";
import { printToFileAsync } from "expo-print";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

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
      const response = await axios.get(`${API_BASE_URL}/api/reminders`, {
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token en los headers
        },
      });

      setHistorial(response.data); // Guardar la respuesta en el estado
    } catch (error) {
      setHistorial("No hay solicitudes");
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  // Altura de cada elemento (ajusta según tu diseño)
  const itemHeight = 90; // Altura aproximada de cada elemento
  const maxHeight = itemHeight * 5; // Altura máxima para 5 elementos

  // Función para formatear la fecha
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
  const [pdfUri, setPdfUri] = useState(null);
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
    //para la fecha en el documento
    return `Fecha de creación: ${fecha.getDate()} de ${
      meses[fecha.getMonth()]
    } de ${fecha.getFullYear()}`;
  };

  const generarPDF = async () => {
    try {
      // Generar tabla de recordatorios dinámicamente
      const tablarecordatorios = historial
        .map(
          (rec) => `
            <tr style="page-break-inside: avoid; break-inside: avoid;">
              <td style="border: 1px solid #000; padding: 8px;">${
                rec.usuario.name
              }</td>
              <td style="border: 1px solid #000; padding: 8px;">${
                rec.medicamentos.nombre
              }</td>
              <td style="border: 1px solid #000; padding: 8px;">${
                rec.nombre_paciente
              }</td>
              <td style="border: 1px solid #000; padding: 8px;">${formatDate(
                rec.inicio
              )}</td>
              <td style="border: 1px solid #000; padding: 8px;">${formatDate(
                rec.fin
              )}</td>
            </tr>
          `
        )
        .join("");

      const html = `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h1 style="text-align: center;">Recordatorios activos</h1>
            <p style="text-align: right; font-size: 14px; color: #555;">${formatFecha()}</p>
            
            <table style="width: 100%; border-collapse: collapse; -webkit-print-color-adjust: exact;">
              <tr style="page-break-inside: avoid; break-inside: avoid;">
                <th style="border: 1px solid #000; padding: 10px; background-color: #66CC99; color: white;">Cuidador</th>
                <th style="border: 1px solid #000; padding: 10px; background-color: #66CC99; color: white;">Medicamento</th>
                <th style="border: 1px solid #000; padding: 10px; background-color: #66CC99; color: white;"">Paciente</th>
                <th style="border: 1px solid #000; padding: 10px; background-color: #66CC99; color: white;">Inicio</th>
                <th style="border: 1px solid #000; padding: 10px; background-color: #66CC99; color: white;">Fin</th>
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

              getSolicitudes();
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

  return (
    <>
      <Background />
      <SafeAreaView style={StylesGen.container}>
        <View style={styles.headerContainer}>
          <Text style={StylesGen.title}>Historial de recordatorios</Text>
         <TouchableOpacity style={{ alignItems: "center" }} onPress={generarPDF}>
         <FontAwesome
            name="file-pdf-o"
            size={50}
            color="#e74c3c"
            style={styles.pdfIcon}
          />
          <Text style={styles.iconText}>Descargar</Text>
         </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollContainer}>
          {!Array.isArray(historial) || historial.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No hay recordatorios registrados.
              </Text>
            </View>
          ) : (
            <View style={styles.listContainer}>
              {historial.map((recordatorio) => (
                <TouchableOpacity
                  key={recordatorio._id}
                  onPress={() =>
                    navigation.navigate("Historico", {
                      id: recordatorio._id,
                    })
                  }
                  style={styles.card}
                >
                  <View style={styles.recordatorioContent}>
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
    marginBottom: 20,
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
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    alignItems: 'center', // Alinea verticalmente
    justifyContent:'center', // Espacio entre título e icono
    marginBottom: 10, // Ajusta según necesites
  },
  pdfIcon: {
    marginLeft: 100
  },
  iconText: {
    fontSize: 16,
    color: "black",
    fontWeight: "300",
    marginLeft: 100
  },
});
