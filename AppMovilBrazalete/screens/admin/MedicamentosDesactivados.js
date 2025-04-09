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

export default function MedicamentosDesactivados() {
  const { token } = useContext(AuthContext); // Obtener el token del contexto
  const [medicamentosDesac, setMedicamentosDesac] = useState([]); //estado para lita de medicamentos desactivados

  const itemHeight = 87; // Altura aproximada de cada elemento
  const maxHeight = itemHeight * 6; // Altura máxima para 5 elementos

  useEffect(() => {
    if (token) {
      getMedicamentosDesactivados();
    }
  }, []);
  //recargar al regresar de otra pantalla
  useFocusEffect(
    useCallback(() => {
      getMedicamentosDesactivados();
    }, [])
  );

  const getMedicamentosDesactivados = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/medications/deactivated`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Enviar el token en los headers
          },
        }
      );

      setMedicamentosDesac(response.data); // Guardar la respuesta en el estado
    } catch (error) {
      setMedicamentosDesac("No hay solicitudes");
    }
  };

  const handleActivar = async (id) => {
    try {
      // Verificar token
      if (!token) {
        Alert.alert("Error", "No hay token de autenticación");
        return;
      }
      Alert.alert("Éxito", "El medicamento ha sido activado correctamente");
      //Ocultar medicamento para evitar renderizar
      setMedicamentosDesac((prev) => prev.filter((med) => med._id !== id))
      const response = await axios.get(
        `${API_BASE_URL}/api/medication/activate/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      getMedicamentosDesactivados();
    } catch (error) {
      Alert.alert("Error", "Error al activar el medicamento");
    }
  };

  return (
    <>
      <Background />
      <SafeAreaView style={StylesGen.container}>
        <View style={styles.textContainer}>
          <Text style={StylesGen.title}>Medicamentos</Text>
          <Text style={StylesGen.descrip}>
            Aquí se muestran todos los medicamentos desactivados.
          </Text>
          {!Array.isArray(medicamentosDesac) ||
          medicamentosDesac.length === 0 ? (
            <View>
              <Text style={StylesGen.descrip}>
                No hay medicamentos desactivados.
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
                  showsVerticalScrollIndicator={true}
                >
                   {medicamentosDesac.map((medicamento, index) => (
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
                        <Text
                          style={{
                            color: "green",
                            fontWeight: "500",
                            marginLeft: 10,
                          }}
                          onPress={() => handleActivar(medicamento._id)}
                        >
                          Activar
                        </Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          )}
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
    marginTop:35
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
