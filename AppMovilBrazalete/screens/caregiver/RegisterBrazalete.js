import React, { useState, useContext, useEffect } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Alert,
  Switch,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import brazalete from "../../assets/Images/brazalete.png";
import Background from "../../components/Background";
import theme from "../../themes/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import StylesGen from "../../themes/stylesGen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { API_BASE_URL } from "@env";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import BackgroundDos from "../../components/BackgroundDos";
export default function RegisterBrazalete({ route }) {
  const [isEnabled, setEnable] = useState(false);
  const conectado = isEnabled;
  const [cont, setCont] = useState({});
  const toggleSwitch = () => setEnable((previousState) => !previousState);
  const { token, user } = useContext(AuthContext); //Obtenemos el token
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true); // Nuevo estado para carga inicial
  const { mode, contact } = route.params || {}; // 'mode' puede ser 'edit' o 'register'
  const [desactivar, setDesactivar] = useState(false); // null, true o false
  const navigation = useNavigation();

  const { scannedData } = route.params || {};

  console.log("ESCANEADO: ", scannedData);

  const handleRegister = async () => {
    if (!nombre) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    setLoading(true); // Inicia el estado de carga
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/brazalet`,
        {
          nombre: nombre,
          id_user: user.payload.id,
          edo: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNombre("");

      Alert.alert("Éxito", "Brazalete registrado", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Brazalete Registro"), // Opción recomendada para flujo simple
        },
      ]);
    } catch (error) {
      console.error("Error en el registro:", error);
      Alert.alert("Error", "Algo fallo en el registro del brazalete");
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };
  return (
    <>
      <BackgroundDos />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={StylesGen.container}
      >
        <SafeAreaView>
          <View>
            <View>
              <Text style={StylesGen.title}>Termina tu registro</Text>
              <Text style={StylesGen.descrip}>
                Aquí podrás terminar de completar tu registro del brazalete.
              </Text>
            </View>
          </View>
          <View style={styles.formu}>
            <View style={StylesGen.inputContainer}>
              <TextInput
                placeholder="Nombre del brazalete"
                style={StylesGen.input}
                value={nombre}
                onChangeText={setNombre}
              />
              <MaterialCommunityIcons
                name="watch"
                size={30}
                color="gray"
                style={StylesGen.icon}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  formu: {
    marginTop: 15,
    marginBottom: 15,
  },
  connectButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 10,
  },
  connectText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
    marginRight: 5,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 20,
    width: 190,
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  warningText: {
    fontSize: 24,
    color: "#377F5B",
    fontWeight: "bold",
    marginTop: "30%",
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#66CC99", // Color de la sombra
    shadowOffset: { width: 2, height: 2 }, // Dirección de la sombra
    shadowOpacity: 0.8, // Opacidad de la sombra
    shadowRadius: 10, // Radio de difuminado
    elevation: 5, // Sombra en Android
    marginTop: "25",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    marginTop: 40,
    height: 200,
    resizeMode: "contain",
  },
  textContainer: {
    padding: 15,
    marginTop: 20,
  },
  cardTitle: {
    fontSize: 21,
    fontWeight: "700",
    textAlign: "center",
    color: "#66CC99",
    marginBottom: 10,
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
  selectorLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  selectorOptions: {
    flexDirection: "row",
    marginVertical: 10,
  },
  selectorButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#4CAF89",
    borderRadius: 5,
  },
  selectorButtonSelected: {
    backgroundColor: "#4CAF89",
  },
  selectorText: {
    color: "#4CAF89",
  },
  selectorTextSelected: {
    color: "white",
  },
});
