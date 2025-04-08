import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Background from "../../components/Background";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StylesGen from "../../themes/stylesGen";
import { API_BASE_URL } from "@env";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function RegistrarMedicamento({}) {
  const { token } = useContext(AuthContext); //Obtenemos el token
  const [nombre, setNombre] = useState("");
  const [description, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Función para eliminar caracteres no alfabéticos
  const cleanInput = (input) => {
    return input.replace(/[^a-zA-Z\s]/g, ""); // Elimina todo lo que no sea letra o espacio
  };

  const handleRegister = async () => {
    // Limpiar los campos antes de validarlos
    const nombreLimpio = cleanInput(nombre);
    const descripcionLimpia = cleanInput(description);

    // Validación de campos vacíos
    if (!nombreLimpio || !descripcionLimpia) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    // Validación de longitud de la descripción
    if (descripcionLimpia.length < 5) {
      Alert.alert("Error", "La descripción debe tener al menos 5 caracteres");
      return;
    }

    setLoading(true); // Inicia el estado de carga

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/medication`,
        {
          nombre: nombreLimpio,
          description: descripcionLimpia,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNombre(""); // Limpiar campo nombre
      setDescripcion(""); // Limpiar campo descripción

      Alert.alert("Éxito", "Medicamento registrado", [
        {
          text: "OK",
          onPress: () => navigation.goBack(), // Opción recomendada para flujo simple
        },
      ]);
    } catch (error) {
      console.error("Error en el registro:", error);
      Alert.alert("Error", "Algo falló en el registro del medicamento");
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  return (
    <>
      <Background />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={StylesGen.container}
      >
        <SafeAreaView style={StylesGen.container}>
          <View style={{ marginBottom: 30 }}>
            <View>
              <Text style={StylesGen.title}>Registrar medicamento</Text>
              <Text style={styles.descrip}>
                Aquí puedes registrar medicamentos.
              </Text>
            </View>
            <View style={StylesGen.inputContainer}>
              <TextInput
                placeholder="Nombre"
                style={StylesGen.input}
                value={nombre}
                onChangeText={setNombre}
              />
              <MaterialCommunityIcons
                name="pill"
                size={30}
                color="gray"
                style={StylesGen.icon}
              />
            </View>
            <View style={StylesGen.inputContainer}>
              <TextInput
                placeholder="Descripción"
                style={StylesGen.input}
                value={description}
                onChangeText={setDescripcion}
              />
              <MaterialCommunityIcons
                name="pill"
                size={30}
                color="gray"
                style={StylesGen.icon}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={[StylesGen.button]}
                onPress={handleRegister}
                disabled={loading}
              >
                <Text style={StylesGen.buttonText}>
                  {loading ? "Guardando..." : "Guardar"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  descrip: {
    fontSize: 18,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#4CAF89",
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    width: 300,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  createAccount: {
    marginTop: 20,
    color: "#666",
  },
  createLink: {
    color: "#4CAF89",
    fontWeight: "bold",
    marginTop: 25,
    textDecorationLine: "underline",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "left", // Alinea el texto a la izquierda
    alignSelf: "flex-start", // Asegura que el texto no esté centrado en el contenedor
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
});
