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
import { useFocusEffect } from "@react-navigation/native";//Renderizado extra
import { useCallback } from "react"; //Renderizado extra
import { shareAsync } from "expo-sharing";
import { printToFileAsync } from "expo-print";


export default function recordatorios({ navigation }) {
  const { user, token } = useContext(AuthContext); // Obtener el token del contexto
  const [recordatorios, setRecordatorios] = useState([]); // Estado para los cuidadores

  const [pdfUri, setPdfUri] = useState(null);


  const cuidadorId = user?.payload?.id;
  console.log("User ID:", cuidadorId);

  useEffect(() => {
    if (token) {

      getRecordatorios(cuidadorId);
    }
  }, [token]);

  //recargar al regresar de otra pantalla
  useFocusEffect(
    useCallback(() => {
      getRecordatorios(cuidadorId);
    }, [])
  );


  const getRecordatorios = async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/reminders/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token en los headers
        },
      });

      setRecordatorios(response.data); // Guardar la respuesta en el estado
    } catch (error) {
      console.error("Error obteniendo cuidadores:", error);
      setRecordatorios("No hay solicitudes");
    }
  };

  // Altura de cada elemento (ajusta según tu diseño)
  const itemHeight = 90; // Altura aproximada de cada elemento
  const maxHeight = itemHeight * 5; // Altura máxima para 5 elementos


  const formatFecha = () => {
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const fecha = new Date();
    //para la fecha en el documento
    return `Fecha de creación: ${fecha.getDate()} de ${meses[fecha.getMonth()]} de ${fecha.getFullYear()}`;
  };


  const generarPDF = async () => {
    try {
      // Generar tabla de recordatorios dinámicamente
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
          <h1 style="text-align: center;">recordatorios disponibles</h1>
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





  return (
    <>
      <Background />
      <SafeAreaView style={[StylesGen.container]}>
        <View>
          <Text style={[StylesGen.title]}>Recordatorios</Text>
        </View>
        {!Array.isArray(recordatorios) || recordatorios.length === 0 ? (
          <View>
            <Text style={[StylesGen.descrip]}>
              No hay recordatorios registrados.
            </Text>
          </View>
        ) : (
          <View style={{flex: 1}}>
            <Text style={styles.descrip}>
              Aquí puedes consultar los recordatorios ya completados. Para ver
              su recordatorios haz clic en un registro.
            </Text>
            <View
              style={{
                height: maxHeight,
                marginBottom: -10,
              }}
            >
              <ScrollView
                style={[StylesGen.scroll, { marginTop: 40}]}
                showsVerticalScrollIndicator={true}
                
              >
                {recordatorios.map((recordatorio, index) => (
                  <TouchableOpacity
                    key={recordatorio._id}
                  >
                    <View key={index} style={styles.recordatorioItem}>
                      <View style={styles.recordatorioInfo}>
                        <Text style={styles.nameCui}>{recordatorio.usuario.name}</Text>
                        <Text style={styles.nameMed}>{recordatorio.medicamentos.nombre}</Text>
                        <Text style={styles.namePac}>
                          Paciente: {recordatorio.nombre_paciente}
                        </Text>
                        {recordatorio.cronico && <Text>Cronico</Text>}
                        <View style={styles.fechas}>
                          <Text style={styles.recordatorioEmail}>
                            Inicio: {formatDate(recordatorio.inicio)}
                          </Text>
                          <Text style={styles.recordatorioEmail}>
                            Fin:     {formatDate(recordatorio.fin)}
                          </Text>
                        </View>
                        <View style={styles.estado}>
                          <Text
                            style={[
                              styles.estado,
                              recordatorio.estado === "Finalizado"
                                ? styles.estadoFinalizado
                                : styles.estadoPendiente,
                            ]}
                          >
                            Estado: {recordatorio.estado}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <View style={[ styles.buttonContainer]}>
              <TouchableOpacity style={styles.button} onPress={generarPDF}>
                <Text style={styles.buttonText}>Descargar PDF</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText} onPress={() => navigation.navigate("Registro")}>Nuevo recordatorio</Text>
              </TouchableOpacity>
            </View>
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
  recordatorioItem: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4CAF89",
    width: "100%",
  },
  recordatorioInfo: {
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
  
  buttonContainer: {
    marginTop: 'auto', // Empuja los botones hacia abajo
    paddingBottom: 0, // Espacio adicional en la parte inferior

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
    marginBottom: 5, // Espacio entre botones
  },
  
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 10,
  },
});
