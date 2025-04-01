import React, { useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "@env";
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
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Background from "../../components/Background";
import { SearchBar } from "react-native-elements";
import StylesGen from "../../themes/stylesGen";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { shareAsync } from "expo-sharing";
import { printToFileAsync } from "expo-print";

export default function MedicamentosDisponibles({ navigation }) {
  const { token } = useContext(AuthContext); // Obtener el token del contexto
  const [medicamentos, setMedicamentos] = useState([]); // Estado para lista de medicamentos
  const [medicamentosDesac, setMedicamentosDesac] = useState([]); //estado para lita de medicamentos desactivados

  const [pdfUri, setPdfUri] = useState(null);

  useEffect(() => {
    if (token) {
      getMedicamentos();
      getMedicamentosDesactivados();
    }
  }, []);
  //recargar al regresar de otra pantalla
  useFocusEffect(
    useCallback(() => {
      getMedicamentos();
      getMedicamentosDesactivados();
    }, [])
  );

  const getMedicamentos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/medication`, {
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token en los headers
        },
      });

      setMedicamentos(response.data); // Guardar la respuesta en el estado
    } catch (error) {
      console.error("Error obteniendo medicamentos:", error);
      setMedicamentos("No hay solicitudes")
    }
  };

  const getMedicamentosDesactivados = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/medications/deactivated`, {
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token en los headers
        },
      });

      setMedicamentosDesac(response.data); // Guardar la respuesta en el estado
    } catch (error) {
      console.error("Error obteniendo medicamentos:", error);
      setMedicamentosDesac("No hay solicitudes");
    }
  };

  // Altura de cada elemento (ajusta según tu diseño)
  const itemHeight = 95; // Altura aproximada de cada elemento
  const maxHeight = itemHeight * 3; // Altura máxima para 5 elementos


  //ELiminar medicamento
  const handleDelete = (id) => {
    Alert.alert(
      "Eliminar medicamento",
      "¿Estás seguro de que deseas eliminar el medicamento?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí, desactivar",
          onPress: async () => {
            try {
              // Verificar token
              if (!token) {
                Alert.alert("Error", "No hay token de autenticación");
                return;
              }
              //ocultar el medicamento para evitar renderizar
              setMedicamentos((prev) => prev.filter((med) => med._id !== id));

              const response = await axios.put(
                `${API_BASE_URL}/api/medication/desactivate/${id}`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              );

              getMedicamentos(); // Recargar la lista
              getMedicamentosDesactivados();
              Alert.alert(
                "Éxito",
                "El medicamento ha sido eliminado correctamente"
              );
            } catch (error) {
              console.error("Error completo:", error);
              Alert.alert("Error", "Error al desactivar el medicamento");
            }
          },
        },
      ]
    );
  };

  const handleActivar = async (id) => {
    try {
      // Verificar token
      if (!token) {
        Alert.alert("Error", "No hay token de autenticación");
        return;
      }

      const response = await axios.get(
        `${API_BASE_URL}/api/medication/activate/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      getMedicamentos();
      getMedicamentosDesactivados(); // Recargar la lista
      Alert.alert(
        "Éxito",
        "El medicamento ha sido activado correctamente"
      );
    } catch (error) {
      console.error("Error completo:", error);
      Alert.alert("Error", "Error al activar el medicamento");
    }
  }

  const formatFecha = () => {
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const fecha = new Date();
    //para la fecha en el documento
    return `Fecha de creación: ${fecha.getDate()} de ${meses[fecha.getMonth()]} de ${fecha.getFullYear()}`;
  };


  //GENERACION DE PDF
  const generarPDF = async () => {
    try {
      // Generar tabla de medicamentos dinámicamente
      const tablaMedicamentos = medicamentos.map((med) => `
          <tr>
            <td style="border: 1px solid #000; padding: 8px;">${med.nombre}</td>
            <td style="border: 1px solid #000; padding: 8px;">${med.description}</td>
          </tr>
        `).join("");

      const html = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1 style="text-align: center;">Medicamentos disponibles</h1>
          <p style="text-align: right; font-size: 12px; color: #555;">${formatFecha()}</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <th style="border: 1px solid #000; padding: 10px; background-color: #4CAF89; color: black; font-size: 18px;">Nombre</th>
              <th style="border: 1px solid #000; padding: 10px; background-color: #4CAF89; color: black; font-size: 18px;">Descripción</th>
            </tr>
            ${tablaMedicamentos}
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
      <SafeAreaView style={StylesGen.container} nestedScrollEnabled={false}>
          <View style={styles.content}>
            <View style={styles.textContainer}>
              <Text style={StylesGen.title}>Medicamentos</Text>
              <Text style={StylesGen.descrip}>
                Aquí se muestran todos los medicamentos disponibles.
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Registro")}
                style={{ alignItems: "center" }}
              >
                <Ionicons name="medkit-outline" size={40} color="gray" />
                <Text style={styles.iconText}>Agregar</Text>
              </TouchableOpacity>
            </View>
          </View>

          {!Array.isArray(medicamentos) || medicamentos.length === 0 ? (
            <View>
              <Text style={StylesGen.descrip}>
                No hay medicamentos registrados.
              </Text>
            </View>
          ) : (
            <View>
              <View
                style={{
                  overflow: "hidden",
                  maxHeight: maxHeight,
                  marginBottom: 15,
                }}
              >
                <ScrollView
                  style={styles.scrollContainer}
                  showsVerticalScrollIndicator={false}
                >
                  {medicamentos.map((medicamento, index) => (
                    <View key={index} style={[styles.contactItem, {
                      marginBottom: 15, // Reducido de 15 a 10
                    }]}>
                      <View style={styles.contactInfo}>
                        <Text style={styles.contactName}>
                          {medicamento.nombre}
                        </Text>
                        <Text style={styles.contactEmail}>
                          {medicamento.description}
                        </Text>
                      </View>
                      <View style={styles.buttonContainer}>
                        {/* Botón de Aceptar con ícono de palomita (check) */}
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("Actualizar", {
                              id: medicamento._id,
                            })
                          } //envio de id
                          style={{ marginRight: 18 }}
                        >
                          <FontAwesome name="edit" size={30} color="black" />
                        </TouchableOpacity>

                        {/* Botón de Rechazar con ícono de equis (times) */}
                        <TouchableOpacity
                          onPress={() => handleDelete(medicamento._id)}
                        >
                          <Ionicons name="trash" size={30} color="red" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
              <View style={styles.buttonsContainer}></View>
              <TouchableOpacity style={styles.button} onPress={generarPDF}>
                <Text style={styles.buttonText}>Descargar PDF</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Desactivados")}>
                <Text style={styles.buttonText}>Medicamentos Desactivados</Text>
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
    backgroundColor: "white",
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  contactEmail: {
    fontSize: 14,
    color: "gray",
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
  buttonsContainer: {
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    margin: 5,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
    marginTop: 35
  },
  textContainer2: {
    flex: 1,
    marginTop: 30,
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
