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
import { shareAsync } from "expo-sharing";
import { printToFileAsync } from "expo-print";


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

  // Función para formatear la fecha
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
  const [pdfUri, setPdfUri] = useState(null);
  const formatFecha = () => {
      const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
      const fecha = new Date();
      //para la fecha en el documento
      return `Fecha de creación: ${fecha.getDate()} de ${meses[fecha.getMonth()]} de ${fecha.getFullYear()}`;
    };
  
  
    const generarPDF = async () => {
      try {
        // Generar tabla de recordatorios dinámicamente
        const tablarecordatorios = historial.map((rec) => `
            <tr style="page-break-inside: avoid; break-inside: avoid;">
              <td style="border: 1px solid #000; padding: 8px;">${rec.usuario.name}</td>
              <td style="border: 1px solid #000; padding: 8px;">${rec.medicamentos.nombre}</td>
              <td style="border: 1px solid #000; padding: 8px;">${rec.nombre_paciente}</td>
              <td style="border: 1px solid #000; padding: 8px;">${formatDate(rec.inicio)}</td>
              <td style="border: 1px solid #000; padding: 8px;">${formatDate(rec.fin)}</td>
            </tr>
          `).join("");
  
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
        console.error("Error generando PDF:", error);
        Alert.alert("Error", "Hubo un problema al generar el PDF");
      }
    };

  


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
                    onPress={() => navigation.navigate("Historico",  {
                      id: contact._id,
                    })}
                  >
                    <View key={index} style={styles.contactItem}>
                      <View style={styles.contactInfo}>
                        <Text style={styles.nameCui}>{contact.usuario.name}</Text>
                        <Text style={styles.nameMed}>{contact.medicamentos.nombre}</Text>
                        <Text style={styles.namePac}>
                          Paciente: {contact.nombre_paciente}
                        </Text>
                        {contact.cronico && <Text style={{color:'blue'}}>Cronico</Text>}
                        
                        <View style={styles.estado}>
                        <View style={styles.fechas}>
                          <Text style={styles.contactEmail}>
                            Inicio: {formatDate(contact.inicio)}
                          </Text>
                          <Text style={styles.contactEmail}>
                            Fin:     {formatDate(contact.fin)}
                          </Text>
                        </View>
                          
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <TouchableOpacity style={styles.button} onPress={generarPDF}>
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
