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

export default function MedicamentosScreen({ navigation }) {
  const { token } = useContext(AuthContext); // Obtener el token del contexto
  const [medicamentos, setMedicamentos] = useState([]); // Estado para los cuidadores

  useEffect(() => {
    if (token) {
      getMedicamentos();
    }
  }, []);
  //recargar al regresar de otra pantalla
  useFocusEffect(
    useCallback(() => {
      getMedicamentos();
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
      setMedicamentos("No hay solicitudes");
    }
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Buscando:", query);
  };
  const itemHeight = 95; // Altura aproximada de cada elemento
  const maxHeight = itemHeight * 5; // Altura máxima para 5 elementos

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

  return (
    <>
      <Background />
      <SafeAreaView style={StylesGen.container}>
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
                height: maxHeight,
                marginBottom: 15,
              }}
            >
              <ScrollView
                style={StylesGen.scroll}
                showsVerticalScrollIndicator={true}
              >
                {medicamentos.map((medicamento, index) => (
                  <View key={index} style={styles.contactItem}>
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
                          navigation.navigate("ActualizarMed", {
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
