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

export default function BrazaleteConfig({ route }) {
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

  useEffect(() => {
    const fecthBrazalete = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/brazalet/${contact}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNombre(response.data.nombre);
      } catch (error) {
        Alert.alert("Error", "No se pudo cargar el brazalete");
      } finally {
        setLoadingData(false);
      }
    };

    if (contact) {
      fecthBrazalete();
    }
  }, [contact, token]);

  

  const handleUpdate = async () => {
    if (!nombre) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    setLoading(true); // Inicia el estado de carga
    if (desactivar === true) {
      const response = await axios.get(
        `${API_BASE_URL}/api/brazalet/desativate/${contact}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/brazalet/update/${contact}`,
        {
          nombre: nombre,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert("Éxito", "Brazalete actualizado", [
        {
          text: "OK",
          onPress: () => navigation.goBack(), // Opción recomendada para flujo simple
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Algo fallo en el registro del brazalete");
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  // Obtenemos el parámetro desde la navegación

  const title =
    mode === "edit" ? "Actualizar brazalete" : "Registrar brazalete";
  const desc =
    mode === "edit"
      ? "Aqui podrás actualizar la información del brazalete."
      : "Aqui podrás vinculater a un nuevo brazalete.";

  return (
    <>
      <Background />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={StylesGen.container}
      >
        <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
            {mode === "edit" ? (
              <View>
                <View>
                  <Text style={StylesGen.title}>{title}</Text>
                  <Text style={StylesGen.descrip}>{desc}</Text>
                </View>

                <View style={styles.formu}>
                  <View style={StylesGen.inputContainer}>
                    <TextInput
                      value={nombre}
                      onChangeText={setNombre}
                      style={StylesGen.input}
                    />
                    <MaterialCommunityIcons
                      name="pill"
                      size={30}
                      color="gray"
                      style={StylesGen.icon}
                    />
                  </View>
                  {/* Selector de Desactivar */}
                  <View style={styles.selectorContainer}>
                    <Text style={styles.selectorLabel}>
                      ¿Desactivar brazalete?
                    </Text>
                    <View style={styles.selectorOptions}>
                      <TouchableOpacity
                        style={[
                          styles.selectorButton,
                          desactivar === true && styles.selectorButtonSelected,
                        ]}
                        onPress={() => setDesactivar(true)}
                      >
                        <Text
                          style={
                            desactivar === true
                              ? styles.selectorTextSelected
                              : styles.selectorText
                          }
                        >
                          Sí
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.selectorButton,
                          desactivar === false && styles.selectorButtonSelected,
                        ]}
                        onPress={() => setDesactivar(false)}
                      >
                        <Text
                          style={
                            desactivar === false
                              ? styles.selectorTextSelected
                              : styles.selectorText
                          }
                        >
                          No
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleUpdate}
                    >
                      <Text style={styles.buttonText}>Guardar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <View>
                  <Text style={StylesGen.title}>{title}</Text>
                  <Text style={StylesGen.descrip}>{desc}</Text>
                </View>

                <View>
                  <View style={styles.card}>
                    <Image source={brazalete} style={styles.image} />
                    <View style={styles.textContainer}>
                      <Text style={styles.cardTitle}>Brazalete</Text>
                      <TouchableOpacity
                        style={styles.connectButton}
                        onPress={() => navigation.navigate("Scanner")}
                      >
                        <Text style={styles.connectText}>Escanear</Text>
                        <Ionicons name="qr-code" size={20} color="#000" />
                      </TouchableOpacity>
                    </View>
                  </View>
              
                </View>
              </View>
            )}
          </ScrollView>
          
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
