import React, { useContext, useState } from "react";
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
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Background from "../../components/Background";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StylesGen from "../../themes/stylesGen";
import { AuthContext } from "../../context/AuthContext";
import { API_BASE_URL } from "@env";
import axios from "axios";

export default function RegistroMedicamento() {
  const { token } = useContext(AuthContext); //Obtenemos el token
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!nombre || !descripcion) {
      //Validamos lo campos
      Alert.alert("Error", "Completa todos los campos");
      return;
    }
    setLoading(true); //Inicia el estado de carga

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/medication`,
        {
          //aqui debe ir el nombnre de mis campos o como los espera la api?
          nombre: nombre,
          description: descripcion,
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
          onPress: () => navigation.goBack(), // Opción recomendada para flujo simple
        },
      ]);
    } catch (error) {
      console.error("Error al registrar:", error);
      Alert.alert("Error", "Algo fallo en el registro del medicamento", [
        { text: "OK" },
      ]);
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
                Aqui puedes registrar medicamentos.
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
                placeholder="Descripcion"
                style={StylesGen.input}
                value={descripcion}
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
                style={styles.button}
                onPress={handleRegister}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Guardar</Text>
                )}
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
