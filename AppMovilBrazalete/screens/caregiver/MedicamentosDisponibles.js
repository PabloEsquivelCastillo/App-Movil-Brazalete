import React, { useContext, useEffect, useState } from "react";
import { API_BASE_URL } from '@env'
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

export default function MedicamentosDisponibles({ navigation }) {
  const { token } = useContext(AuthContext); //Obtener el token 
  const [medicamentos, setMedicamentos] = useState([])

  //Renderizado para obtener los medicamentos

  useEffect(() => {
    if (token) {
      getMedicamentos();
    }
  }, [token]);

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

  // Altura de cada elemento (ajusta según tu diseño)
  const itemHeight = 100; // Altura aproximada de cada elemento
  const maxHeight = itemHeight * 5; // Altura máxima para 5 elementos


  //ELiminar medicamento
  const handleDelete = async (id) => {
    Alert.alert(
      "Desactivar medicamento",
      "¿Estás seguro de que deseas desactivar este medicamento?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sí, desactivar",
          onPress: async () => {
            try {
              // Verificar token
              if (!token) {
                Alert.alert("Error", "No hay token de autenticación");
                return;
              }


              const response = await axios.put(
                `${API_BASE_URL}/api/medication/desactivate/${id}`,
                {},
                {
                  headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                  }
                }
              );




            } catch (error) {
              console.error("Error completo:", error);
              Alert.alert("Error", "Error al desactivar el medicamento");
            }
          }
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
            <Text style={StylesGen.descrip}>No hay medicamentos registrados.</Text>
          </View>
        ) : (
          <View>
            <View style={{ overflow: "hidden", height: maxHeight, marginBottom: 15 }}>
              <ScrollView
                style={StylesGen.scroll}
                showsVerticalScrollIndicator={true}
              >



                {medicamentos.map((medicamento,index) => (
                  <View key={index} style={styles.contactItem}>
                    <View style={styles.contactInfo}>
                      <Text style={styles.contactName}>{medicamento.nombre}</Text>
                      <Text style={styles.contactEmail}>{medicamento.description}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                      {/* Botón de Aceptar con ícono de palomita (check) */}
                      <TouchableOpacity
                        onPress={() => navigation.navigate("Actualizar", { id: medicamento._id })} //envio de id
                        style={{ marginRight: 18 }}
                      >
                        <FontAwesome name="edit" size={30} color="black" />
                      </TouchableOpacity>

                      {/* Botón de Rechazar con ícono de equis (times) */}
                      <TouchableOpacity onPress={() => handleDelete(medicamento._id)}>
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
    marginBottom: 10,
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
