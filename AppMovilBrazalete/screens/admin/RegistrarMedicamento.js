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
  const { token } = useContext(AuthContext); // Obtenemos el token
  const [nombre, setNombre] = useState("");
  const [description, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);
  const [nombreError, setNombreError] = useState("");
  const [descripcionError, setDescripcionError] = useState("");
  const navigation = useNavigation();

  // Función para eliminar caracteres no alfabéticos
  const cleanInput = (input) => {
    return input.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ""); // Permite letras y espacios
  };

  // Función para validar si un string contiene solo espacios en blanco
  const isWhitespaceOnly = (str) => {
    return !str || !str.trim();
  };

  const handleRegister = async () => {
    // Limpiar errores previos
    setNombreError("");
    setDescripcionError("");
    
    // Limpiar los campos
    const nombreLimpio = cleanInput(nombre);
    const descripcionLimpia = cleanInput(description);

    let isValid = true;

    // Validación para nombre
    if (isWhitespaceOnly(nombreLimpio)) {
      setNombreError("El nombre no puede estar vacío");
      isValid = false;
    }

    // Validación para descripción
    if (isWhitespaceOnly(descripcionLimpia)) {
      setDescripcionError("La descripción no puede estar vacía");
      isValid = false;
    } else if (descripcionLimpia.trim().length < 5) {
      setDescripcionError("La descripción debe tener al menos 5 caracteres");
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/medication`,
        {
          nombre: nombreLimpio.trim(),
          description: descripcionLimpia.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setNombre("");
      setDescripcion("");

      Alert.alert("Éxito", "Medicamento registrado", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error("Error en el registro:", error);
      Alert.alert("Error", "Algo falló en el registro del medicamento");
    } finally {
      setLoading(false);
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
                style={[
                  StylesGen.input,
                  nombreError ? styles.inputError : null
                ]}
                value={nombre}
                onChangeText={(text) => {
                  const cleaned = cleanInput(text);
                  setNombre(cleaned);
                  if (nombreError) setNombreError("");
                }}
              />
              <MaterialCommunityIcons
                name="pill"
                size={30}
                color={nombreError ? "red" : "gray"}
                style={StylesGen.icon}
              />
            </View>
            {nombreError ? (
              <Text style={styles.errorText}>{nombreError}</Text>
            ) : null}

            <View style={StylesGen.inputContainer}>
              <TextInput
                placeholder="Descripción"
                style={[
                  StylesGen.input,
                  descripcionError ? styles.inputError : null
                ]}
                value={description}
                onChangeText={(text) => {
                  const cleaned = cleanInput(text);
                  setDescripcion(cleaned);
                  if (descripcionError) setDescripcionError("");
                }}
                multiline
              />
              <MaterialCommunityIcons
                name="pill"
                size={30}
                color={descripcionError ? "red" : "gray"}
                style={StylesGen.icon}
              />
            </View>
            {descripcionError ? (
              <Text style={styles.errorText}>{descripcionError}</Text>
            ) : null}

            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={[
                  StylesGen.button,
                  loading ? styles.buttonDisabled : null
                ]}
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
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "left",
    alignSelf: "flex-start",
    marginLeft: 15,
  },

  buttonDisabled: {
    backgroundColor: "#ccc",
  },
});